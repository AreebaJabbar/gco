export const dynamic = 'force-dynamic';

import PageHero from '@/components/PageHero';
import GalleryView from '@/components/GalleryView';
import { supabaseAdmin, isSupabaseConfigured } from '@/lib/supabase';

export const metadata = {
  title: 'Gallery | GCO Foundation Pakistan',
  description:
    'Explore our photo gallery documenting our Church ministry, Fullness Reformed Institute, Orphanage care, and Education initiatives across Pakistan.',
};

async function getGalleryImages() {
  if (isSupabaseConfigured() && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('gallery')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn('Could not load gallery images server-side:', err.message);
    }
  }
  return [];
}

export default async function GalleryPage() {
  const images = await getGalleryImages();

  return (
    <>
      <PageHero
        title="Our Gallery"
        subtitle="Moments of love, hope, and transformation across our communities in Pakistan."
        crumb="Gallery"
        bgImage="/assets/hero-home-bg.jpg"
        bgAlt="Global Connection Welfare Organization - Gallery and Activities"
        bgPosition="center 30%"
      />

      <GalleryView initialImages={images} />
    </>
  );
}
