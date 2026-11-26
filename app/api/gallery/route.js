import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin, isSupabaseConfigured, uploadGalleryImage } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { DEFAULT_GALLERY_IMAGES, GALLERY_CATEGORIES } from '@/lib/gallery';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      const data = category && category !== 'All'
        ? DEFAULT_GALLERY_IMAGES.filter((item) => item.category === category)
        : DEFAULT_GALLERY_IMAGES;
      return NextResponse.json({
        success: true,
        data,
        source: 'fallback',
        table_configured: false,
      });
    }

    let query = supabaseAdmin
      .from('gallery')
      .select('*')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (category && category !== 'All') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.warn('[API /api/gallery GET DB warning]:', error.message);
      // If table doesn't exist yet (PGRST205), seamlessly serve fallback images
      const fallbackData = category && category !== 'All'
        ? DEFAULT_GALLERY_IMAGES.filter((item) => item.category === category)
        : DEFAULT_GALLERY_IMAGES;

      return NextResponse.json({
        success: true,
        data: fallbackData,
        source: 'fallback',
        table_configured: false,
        error_hint: error.message,
      });
    }

    // If table exists but is empty, return default images or empty array
    if (!data || data.length === 0) {
      const fallbackData = category && category !== 'All'
        ? DEFAULT_GALLERY_IMAGES.filter((item) => item.category === category)
        : DEFAULT_GALLERY_IMAGES;
      return NextResponse.json({
        success: true,
        data: fallbackData,
        source: 'fallback_empty_table',
        table_configured: true,
      });
    }

    return NextResponse.json({
      success: true,
      data,
      source: 'database',
      table_configured: true,
    });
  } catch (err) {
    console.error('[API /api/gallery GET error]:', err);
    return NextResponse.json(
      { error: 'Failed to retrieve gallery images.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // 1. Verify admin authentication
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database is not configured. Please set Supabase keys in .env.local' },
        { status: 503 }
      );
    }

    // 2. Parse multipart form data
    const formData = await request.formData();
    const category = (formData.get('category') || '').toString().trim();
    const caption = (formData.get('caption') || '').toString().trim();
    const title = (formData.get('title') || '').toString().trim() || caption || category;
    const sortOrder = parseInt(formData.get('sort_order'), 10) || 0;
    const imageFile = formData.get('image');

    // 3. Validation
    if (!category) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });
    }
    if (!GALLERY_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: `Invalid category. Must be one of: ${GALLERY_CATEGORIES.join(', ')}` },
        { status: 400 }
      );
    }
    if (!imageFile || typeof imageFile === 'string' || !imageFile.size) {
      return NextResponse.json(
        { error: 'A valid gallery image file is required (max 5MB, JPG/PNG/WEBP).' },
        { status: 400 }
      );
    }

    // 4. Upload image to Supabase Storage bucket 'uploads' under folder 'gallery/'
    let uploadResult;
    try {
      uploadResult = await uploadGalleryImage(imageFile);
    } catch (uploadErr) {
      return NextResponse.json({ error: uploadErr.message }, { status: 400 });
    }

    // 5. Insert into gallery table
    const { data: newRecord, error: dbError } = await supabaseAdmin
      .from('gallery')
      .insert([
        {
          title,
          caption,
          image: uploadResult.url,
          category,
          sort_order: sortOrder,
        },
      ])
      .select()
      .single();

    if (dbError) {
      console.error('[API /api/gallery POST DB error]:', dbError);
      return NextResponse.json(
        {
          error: `Database insert failed: ${dbError.message}. Make sure the 'gallery' table is created in Supabase SQL editor.`,
          hint: 'Run the SQL schema in supabase_schema.sql',
        },
        { status: 500 }
      );
    }

    // 6. Revalidate cache
    try {
      revalidatePath('/gallery');
      revalidatePath('/admin/gallery');
      revalidatePath('/admin/dashboard');
    } catch {}

    return NextResponse.json(
      {
        success: true,
        message: 'Gallery image uploaded successfully.',
        data: newRecord,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[API /api/gallery POST error]:', err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred while uploading gallery image.' },
      { status: 500 }
    );
  }
}
