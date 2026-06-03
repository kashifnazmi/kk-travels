import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, MapPin, ZoomIn } from 'lucide-react';
import { GALLERY_IMAGES } from '../data';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Get unique regions
  const filters = ['All', 'India', 'Bali', 'Switzerland', 'Maldives', 'France', 'Japan'];

  const filteredImages = activeFilter === 'All'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.region.toLowerCase() === activeFilter.toLowerCase() || img.title.toLowerCase().includes(activeFilter.toLowerCase()));

  const openLightbox = (url: string) => {
    const idx = GALLERY_IMAGES.findIndex(img => img.url === url);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === 0 ? GALLERY_IMAGES.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex(prev => (prev === GALLERY_IMAGES.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  return (
    <div id="gallery-component" className="space-y-10">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit mx-auto">
          Travel Photography
        </span>
        <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white">
          Moments Rendered In Deep Bliss
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
          Glimpse real moments taken inside our custom international and domestic expeditions. From silent dawn prayers inside Varanasi to sunset water villas in Male.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {filters.map((filt) => (
          <button
            key={filt}
            onClick={() => setActiveFilter(filt)}
            className={`px-4 py-2 text-xs font-sans font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer border ${
              activeFilter === filt
                ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {filt}
          </button>
        ))}
      </div>

      {/* Masonry/Grid list */}
      <div id="gallery-grid" className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(img.url)}
            className="break-inside-avoid relative rounded-3xl overflow-hidden group border border-slate-100 dark:border-white/10 shadow-sm hover:shadow-lg transition-all duration-300 cursor-zoom-in min-h-[140px]"
          >
            <img
              src={img.url}
              alt={img.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Hover details glass indicator */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <div className="space-y-1 text-white">
                <span className="text-[10px] font-mono font-bold uppercase text-amber-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" /> {img.region}
                </span>
                <h4 className="text-base font-sans font-extrabold tracking-tight">
                  {img.title}
                </h4>
              </div>
              <div className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox full overlay */}
      {lightboxIndex !== null && (
        <div
          id="gallery-lightbox-overlay"
          onClick={closeLightbox}
          className="fixed inset-0 z-55 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Close trigger button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Slider body container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full flex flex-col items-center select-none"
          >
            {/* Main Picture */}
            <div className="relative aspect-[3/2] max-h-[70vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-slate-900">
              <img
                src={GALLERY_IMAGES[lightboxIndex].url}
                alt={GALLERY_IMAGES[lightboxIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[70vh]"
              />

              {/* Arrow navigation inside image frame */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-950/70 border border-white/10 text-white hover:bg-slate-900 transition-all cursor-pointer"
                aria-label="Previous gallery image slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-2xl bg-slate-950/70 border border-white/10 text-white hover:bg-slate-900 transition-all cursor-pointer"
                aria-label="Next gallery image slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom details dashboard overlay */}
            <div className="w-full text-center mt-6 space-y-1.5 px-4 text-white">
              <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block">
                IMAGE {lightboxIndex + 1} OF {GALLERY_IMAGES.length} &bull; {GALLERY_IMAGES[lightboxIndex].region}
              </span>
              <h3 className="text-xl font-sans font-extrabold tracking-tight">
                {GALLERY_IMAGES[lightboxIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
