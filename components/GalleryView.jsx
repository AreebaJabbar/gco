'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { GALLERY_CATEGORIES } from '@/lib/gallery';

const CATEGORY_ICONS = {
  All: 'fa-border-all',
  Church: 'fa-church',
  'Fullness Reformed Institute': 'fa-chalkboard-user',
  Orphanage: 'fa-child',
  Education: 'fa-graduation-cap',
};

const CATEGORY_COLORS = {
  Church: 'bg-navy text-white',
  'Fullness Reformed Institute': 'bg-brand text-white',
  Orphanage: 'bg-leaf text-white',
  Education: 'bg-[#b45309] text-white', // Warm amber
};

export default function GalleryView({ initialImages = [] }) {
  const [images, setImages] = useState(initialImages);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch updated gallery from API on mount
  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);
        const res = await fetch('/api/gallery');
        const json = await res.json();
        if (json?.data && Array.isArray(json.data) && json.data.length > 0) {
          setImages(json.data);
        }
      } catch (err) {
        console.warn('Could not fetch latest gallery images:', err);
      } finally {
        setLoading(false);
      }
    }
    loadGallery();
  }, []);

  // Filter images by active category
  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter((img) => img.category === activeCategory);
  }, [images, activeCategory]);

  // Counts per category for the filter buttons
  const categoryCounts = useMemo(() => {
    const counts = { All: images.length };
    GALLERY_CATEGORIES.forEach((cat) => {
      counts[cat] = images.filter((img) => img.category === cat).length;
    });
    return counts;
  }, [images]);

  // Lightbox keyboard controls
  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredImages.length]);

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
        {['All', ...GALLERY_CATEGORIES].map((category) => {
          const isActive = activeCategory === category;
          const count = categoryCounts[category] || 0;
          const icon = CATEGORY_ICONS[category] || 'fa-image';

          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 inline-flex items-center gap-2 border shadow-sm ${
                isActive
                  ? 'bg-navy border-navy text-white shadow-md scale-[1.02]'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-brand hover:text-navy hover:bg-slate-50'
              }`}
            >
              <i className={`fa-solid ${icon} text-[11px] sm:text-xs`}></i>
              <span>{category}</span>
              <span
                className={`text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery Grid - Masonry Columns matching reference layout */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16 px-4 bg-bgsoft rounded-2xl border border-silver/40 card-shadow max-w-md mx-auto">
          <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center text-2xl mx-auto mb-4">
            <i className="fa-regular fa-images"></i>
          </div>
          <h3 className="font-display font-bold text-lg text-navy mb-1">No Images Found</h3>
          <p className="text-slate-500 text-xs sm:text-sm mb-5">
            There are no photos under &quot;{activeCategory}&quot; at the moment.
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('All')}
            className="btn-primary px-5 py-2 text-xs font-semibold rounded-lg inline-flex items-center gap-2"
          >
            <i className="fa-solid fa-border-all text-[11px]"></i>
            <span>View All Images</span>
          </button>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 sm:gap-6">
          {filteredImages.map((item, index) => {
            const badgeClass = CATEGORY_COLORS[item.category] || 'bg-navy text-white';

            return (
              <div
                key={item.id || index}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid inline-block w-full mb-5 sm:mb-6 group relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Image with natural aspect ratio */}
                <img
                  src={item.image}
                  alt={item.title || item.caption || item.category}
                  className="w-full h-auto block object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Category Badge on hover */}
                <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-lg tracking-wide ${badgeClass}`}
                  >
                    <i className={`fa-solid ${CATEGORY_ICONS[item.category] || 'fa-tag'} text-[9px]`}></i>
                    <span>{item.category}</span>
                  </span>
                </div>

                {/* Hover Gradient Overlay & Caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 sm:p-5 flex flex-col justify-end text-white pointer-events-none">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title && (
                      <h4 className="font-display font-bold text-sm sm:text-base leading-snug line-clamp-2 text-white mb-1 drop-shadow-md">
                        {item.title}
                      </h4>
                    )}
                    {item.caption && item.caption !== item.title && (
                      <p className="text-slate-200 text-xs line-clamp-2 leading-relaxed drop-shadow">
                        {item.caption}
                      </p>
                    )}
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-[11px] text-slate-200">
                    <span>Click to view full photo</span>
                    <i className="fa-solid fa-magnifying-glass-plus text-xs text-white"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold shadow ${
                  CATEGORY_COLORS[activeImage.category] || 'bg-navy text-white'
                }`}
              >
                {activeImage.category}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {lightboxIndex + 1} of {filteredImages.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white text-lg transition-colors focus:outline-none"
              aria-label="Close image popup"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>

          {/* Navigation Arrows */}
          {filteredImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
                  );
                }}
                className="absolute left-2 sm:left-4 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white text-lg sm:text-xl transition-all focus:outline-none"
                aria-label="Previous image"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
                }}
                className="absolute right-2 sm:right-4 z-20 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white text-lg sm:text-xl transition-all focus:outline-none"
                aria-label="Next image"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}

          {/* Center Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 max-h-[70vh] flex items-center justify-center">
              <img
                src={activeImage.image}
                alt={activeImage.title || activeImage.caption || activeImage.category}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Bottom Caption Box */}
            {(activeImage.title || activeImage.caption) && (
              <div className="mt-3.5 text-center max-w-xl px-4">
                {activeImage.title && (
                  <h4 className="font-display font-bold text-white text-base sm:text-lg">
                    {activeImage.title}
                  </h4>
                )}
                {activeImage.caption && (
                  <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
                    {activeImage.caption}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
