'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { GALLERY_CATEGORIES } from '@/lib/gallery';

const CATEGORY_COLORS = {
  Church: 'bg-navy text-white',
  'Fullness Reformed Institute': 'bg-brand text-white',
  Orphanage: 'bg-leaf text-white',
  Education: 'bg-[#b45309] text-white',
};

const CATEGORY_ICONS = {
  All: 'fa-border-all',
  Church: 'fa-church',
  'Fullness Reformed Institute': 'fa-chalkboard-user',
  Orphanage: 'fa-child',
  Education: 'fa-graduation-cap',
};

const SQL_CREATE_TABLE = `-- Run this in your Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  caption TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Church', 'Fullness Reformed Institute', 'Orphanage', 'Education')),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public gallery images are viewable by everyone" ON gallery;
CREATE POLICY "Public gallery images are viewable by everyone" ON gallery FOR SELECT USING (true);`;

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [tableConfigured, setTableConfigured] = useState(true);
  const [copiedSql, setCopiedSql] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fast inline Add Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [newCategory, setNewCategory] = useState(GALLERY_CATEGORIES[0]);
  const [newCaption, setNewCaption] = useState('');
  const [newFile, setNewFile] = useState(null);
  const [newPreview, setNewPreview] = useState('');

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (res.ok && Array.isArray(data.data)) {
        setImages(data.data);
        if (data.table_configured === false) {
          setTableConfigured(false);
        } else {
          setTableConfigured(true);
        }
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Failed to load gallery images.',
        });
      }
    } catch (err) {
      console.error('Failed to load gallery:', err);
      setFeedback({ type: 'error', message: 'Could not connect to gallery service.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_CREATE_TABLE);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB limit.');
      return;
    }

    setNewFile(file);
    const reader = new FileReader();
    reader.onload = () => setNewPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!newFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    setFeedback({ type: '', message: '' });

    try {
      const fd = new FormData();
      fd.append('image', newFile);
      fd.append('category', newCategory);
      fd.append('caption', newCaption);
      fd.append('title', newCaption || newCategory);

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Upload failed.');
      }

      setFeedback({ type: 'success', message: 'Image uploaded successfully to Gallery!' });
      setModalOpen(false);
      setNewFile(null);
      setNewPreview('');
      setNewCaption('');
      fetchGallery();
    } catch (err) {
      console.error('Upload error:', err);
      setFeedback({ type: 'error', message: err.message || 'Error uploading image.' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete image.');
      }
      setFeedback({ type: 'success', message: 'Image deleted successfully.' });
      setDeleteConfirmId(null);
      fetchGallery();
    } catch (err) {
      console.error('Delete error:', err);
      alert(err.message || 'Error deleting image.');
    } finally {
      setDeleting(false);
    }
  };

  const filteredImages = useMemo(() => {
    if (filter === 'All') return images;
    return images.filter((img) => img.category === filter);
  }, [images, filter]);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-navy">
              Gallery Management
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand/10 text-brand border border-brand/20">
              {images.length} images
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Manage the photos and categories displayed on the public Gallery page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-primary px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg inline-flex items-center justify-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-cloud-arrow-up text-xs"></i>
            <span>+ Add New Image</span>
          </button>
          <Link
            href="/admin/gallery/add"
            className="hidden sm:inline-flex px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold items-center gap-1.5 transition-colors shadow-sm"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400"></i>
            <span>Add via Page</span>
          </Link>
        </div>
      </div>

      {/* Supabase Table Missing Alert Banner */}
      {!tableConfigured && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs sm:text-sm text-amber-900 shadow-sm">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-circle-info text-amber-600 text-base mt-0.5 shrink-0"></i>
            <div className="flex-1 space-y-2">
              <div className="font-bold text-amber-950">
                Notice: Supabase &apos;gallery&apos; table is not created yet
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Currently showing curated fallback images. To enable full dynamic database storage and upload support, run the SQL script in your Supabase SQL Editor.
              </p>
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs inline-flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <i className={`fa-solid ${copiedSql ? 'fa-check text-emerald-300' : 'fa-copy'}`}></i>
                  <span>{copiedSql ? 'SQL Copied to Clipboard!' : 'Copy SQL for Supabase'}</span>
                </button>
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-amber-400 bg-white hover:bg-amber-100 text-amber-900 font-semibold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Supabase Dashboard</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Feedback Banner */}
      {feedback.message && (
        <div
          className={`rounded-xl p-4 text-xs sm:text-sm font-medium flex items-center justify-between shadow-sm transition-all ${
            feedback.type === 'error'
              ? 'bg-rose-50 border border-rose-200 text-rose-700'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <i
              className={`fa-solid ${
                feedback.type === 'error' ? 'fa-triangle-exclamation text-rose-500' : 'fa-circle-check text-emerald-600'
              }`}
            ></i>
            <span>{feedback.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback({ type: '', message: '' })}
            className="text-slate-400 hover:text-slate-600"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Category Filter Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 card-shadow p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...GALLERY_CATEGORIES].map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1.5 ${
                  active
                    ? 'bg-navy text-white shadow-sm'
                    : 'text-slate-600 hover:text-navy hover:bg-slate-100'
                }`}
              >
                <i className={`fa-solid ${CATEGORY_ICONS[cat] || 'fa-tag'} text-[10px]`}></i>
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={fetchGallery}
          disabled={loading}
          className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <i className={`fa-solid fa-arrows-rotate ${loading ? 'fa-spin' : ''}`}></i>
          <span>Refresh</span>
        </button>
      </div>

      {/* Images Card Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          <i className="fa-solid fa-spinner fa-spin text-2xl text-brand mb-3"></i>
          <div>Loading gallery photos...</div>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 card-shadow p-12 text-center max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-2xl mx-auto mb-3">
            <i className="fa-solid fa-images"></i>
          </div>
          <h3 className="font-display font-bold text-base text-navy">No Images Found</h3>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            Click &quot;Add New Image&quot; to upload your first photo to the gallery.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-primary px-4 py-2 text-xs font-semibold rounded-lg inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Add New Image</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl border border-slate-200 card-shadow overflow-hidden flex flex-col justify-between hover:border-brand/40 transition-all hover:shadow-md"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.title || img.caption || img.category}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow ${
                      CATEGORY_COLORS[img.category] || 'bg-navy text-white'
                    }`}
                  >
                    {img.category}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="font-display font-bold text-sm text-navy line-clamp-1">
                    {img.title || img.caption || img.category}
                  </div>
                  {img.caption && img.caption !== img.title && (
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {img.caption}
                    </p>
                  )}
                  {img.created_at && (
                    <div className="text-[10px] text-slate-400 mt-2">
                      Added on {new Date(img.created_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={img.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-navy text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  <span>Preview</span>
                </a>

                {/* Only database items can be deleted; fallback default placeholders show notice */}
                {img.id && !String(img.id).startsWith('default-') ? (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(img.id)}
                    className="text-rose-600 hover:text-rose-800 text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                  >
                    <i className="fa-solid fa-trash text-[10px]"></i>
                    <span>Delete</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-400 italic">Default</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Image Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => !uploading && setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-silver/50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-navy text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <i className="fa-solid fa-cloud-arrow-up text-lg text-silver-light"></i>
                <h3 className="font-display font-bold text-base sm:text-lg">Add Gallery Image</h3>
              </div>
              <button
                type="button"
                disabled={uploading}
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-5">
              {/* Image Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select Photo *
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  required
                  className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-dark cursor-pointer border border-slate-200 rounded-lg p-2"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  JPG, PNG or WEBP (Max 5MB)
                </span>

                {newPreview && (
                  <div className="mt-3 relative h-40 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <img src={newPreview} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption (optional) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Caption (Optional)
                </label>
                <input
                  type="text"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Sunday school activity with children"
                  className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary px-5 py-2.5 text-xs font-semibold rounded-lg inline-flex items-center gap-2 shadow-sm disabled:opacity-60"
                >
                  {uploading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                      <span>Uploading Photo...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-arrow-up-from-bracket text-xs"></i>
                      <span>Upload to Gallery</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xl mx-auto">
              <i className="fa-solid fa-trash-can"></i>
            </div>
            <h4 className="font-display font-bold text-base text-navy">
              Delete Gallery Image?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Are you sure you want to delete this photo? This will permanently remove the image from the website and storage.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Photo</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
