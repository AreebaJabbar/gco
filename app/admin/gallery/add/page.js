'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GALLERY_CATEGORIES } from '@/lib/gallery';

export default function AdminAddGalleryPage() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0]);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (selected.size > 5 * 1024 * 1024) {
      alert('File size exceeds the 5MB limit.');
      return;
    }

    setFile(selected);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setFeedback({ type: 'error', message: 'Please select an image file to upload.' });
      return;
    }

    setUploading(true);
    setFeedback({ type: '', message: '' });

    try {
      const fd = new FormData();
      fd.append('image', file);
      fd.append('category', category);
      fd.append('caption', caption);
      fd.append('title', caption || category);

      const res = await fetch('/api/gallery', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image.');
      }

      setFeedback({ type: 'success', message: 'Gallery image uploaded successfully!' });
      setTimeout(() => {
        router.push('/admin/gallery');
        router.refresh();
      }, 1000);
    } catch (err) {
      console.error('Upload error:', err);
      setFeedback({ type: 'error', message: err.message || 'Error uploading photo.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-4xl w-full mx-auto">
      {/* Top Breadcrumb / Back Link */}
      <div>
        <Link
          href="/admin/gallery"
          className="text-xs sm:text-sm font-semibold text-brand hover:text-navy inline-flex items-center gap-1.5 transition-colors mb-2"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          <span>Back to Gallery</span>
        </Link>
        <h1 className="font-display font-bold text-2xl md:text-3xl text-navy">
          Add Gallery Image
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Upload a new photo and assign it to a category for the public gallery.
        </p>
      </div>

      {/* Feedback Banner */}
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

      {/* Main Upload Card (Matching Reference Image 3 in GCO Styling) */}
      <div className="bg-white rounded-2xl border border-slate-200 card-shadow p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Image Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
              Image *
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              required
              className="w-full text-xs text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-navy file:text-white hover:file:bg-navy-dark cursor-pointer border border-slate-200 rounded-lg p-2.5 bg-slate-50/50"
            />
            <span className="text-[11px] text-slate-400 mt-1.5 block">
              JPG, PNG or WEBP. Max 5MB.
            </span>

            {/* Preview Box */}
            {preview && (
              <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative h-64 sm:h-80 w-full max-w-md">
                <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* 2. Category Dropdown */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Caption (optional) */}
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
              Caption (optional)
            </label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Enter optional caption or title"
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-colors"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              disabled={uploading}
              className="btn-primary py-3 px-7 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                  <span>Uploading Image...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-up text-sm"></i>
                  <span>Upload Image</span>
                </>
              )}
            </button>
            <Link
              href="/admin/gallery"
              className="px-5 py-3 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
