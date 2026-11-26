import { supabaseAdmin, supabaseClient, isSupabaseConfigured } from './supabase.js';
import { projects as fallbackProjects } from './projects.js';

/**
 * Fetches projects from Supabase database with fallback to static projects
 * @param {{ limit?: number }} options
 * @returns {Promise<Array>}
 */
export async function getProjects({ limit } = {}) {
  if (isSupabaseConfigured()) {
    try {
      const client = supabaseAdmin || supabaseClient;
      if (client) {
        let query = client
          .from('projects')
          .select('*')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (limit && Number.isInteger(limit) && limit > 0) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (!error && Array.isArray(data) && data.length > 0) {
          // Normalize to match component expectations with full fallback enrichment
          return data.map((p, idx) => {
            const fallback =
              fallbackProjects[p.sort_order ?? idx] ||
              fallbackProjects.find(
                (fp) =>
                  fp.slug === p.id ||
                  fp.title.toLowerCase().includes(p.title.toLowerCase()) ||
                  p.title.toLowerCase().includes(fp.title.toLowerCase())
              ) ||
              {};
            return {
              id: p.id,
              slug: fallback.slug || p.id,
              title: p.title,
              description: p.description,
              image: p.image || fallback.image,
              goal_amount: p.goal_amount,
              raised_amount: p.raised_amount,
              status: p.status === 'completed' ? 'Completed' : 'Ongoing',
              sort_order: p.sort_order ?? idx,
              icon: fallback.icon || 'fa-hand-holding-heart',
              subtitle: fallback.subtitle || '',
              activityTitle: fallback.activityTitle || '',
              highlights: fallback.highlights || [],
              goalNote: fallback.goalNote || '',
            };
          });
        }
      }
    } catch (err) {
      console.warn('[getProjects] Could not fetch projects from DB, falling back to static list:', err.message);
    }
  }

  // Fallback to static projects
  if (limit && Number.isInteger(limit) && limit > 0) {
    return fallbackProjects.slice(0, limit);
  }
  return fallbackProjects;
}

