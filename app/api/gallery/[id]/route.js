import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { supabaseAdmin, isSupabaseConfigured, deleteGalleryImage } from '@/lib/supabase';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function DELETE(request, { params }) {
  try {
    const admin = await getAuthenticatedAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized: Admin authentication required.' },
        { status: 401 }
      );
    }

    if (!isSupabaseConfigured() || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database is not configured.' },
        { status: 503 }
      );
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: 'Image ID is required.' }, { status: 400 });
    }

    // 1. Fetch record to get image storage path
    const { data: record, error: fetchErr } = await supabaseAdmin
      .from('gallery')
      .select('id, image')
      .eq('id', id)
      .single();

    if (fetchErr || !record) {
      return NextResponse.json(
        { error: 'Gallery item not found in database.' },
        { status: 404 }
      );
    }

    // 2. Delete file from storage
    if (record.image) {
      await deleteGalleryImage(record.image);
    }

    // 3. Delete row from table
    const { error: deleteErr } = await supabaseAdmin
      .from('gallery')
      .delete()
      .eq('id', id);

    if (deleteErr) {
      console.error('[API /api/gallery/[id] DELETE error]:', deleteErr);
      return NextResponse.json(
        { error: `Database deletion failed: ${deleteErr.message}` },
        { status: 500 }
      );
    }

    // 4. Revalidate
    try {
      revalidatePath('/gallery');
      revalidatePath('/admin/gallery');
      revalidatePath('/admin/dashboard');
    } catch {}

    return NextResponse.json({
      success: true,
      message: 'Gallery image deleted successfully.',
    });
  } catch (err) {
    console.error('[API /api/gallery/[id] DELETE error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to delete gallery image.' },
      { status: 500 }
    );
  }
}
