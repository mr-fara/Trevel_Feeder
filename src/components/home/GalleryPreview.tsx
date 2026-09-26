import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2, MapPin } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/travelData';
import { Lightbox } from '../common/Lightbox';

export const GalleryPreview: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Destinations', 'Wildlife', 'Beaches', 'Culture', 'Hotels'];

  const filtered = activeCategory === 'All'
    ? GALLERY_ITEMS.slice(0, 8)
    : GALLERY_ITEMS.filter(g => g.category === activeCategory).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
              Visual Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1 text-balance">
              See Sri Lanka Through Our Eyes
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Moments captured across emerald tea valleys, wildlife sanctuaries, and turquoise waters.
            </p>
          </div>

          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#2563EB] hover:text-[#0F3B82] transition-colors self-start md:self-end"
          >
            <span>Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter categories */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto scrollbar-none mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B0F19] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-square bg-slate-100 cursor-pointer shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white" />

              <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="text-xs font-bold truncate">{item.title}</div>
                <div className="text-[10px] text-white/70 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#E53935]" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        items={filtered}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : 0))}
        onPrev={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filtered.length - 1))}
      />
    </section>
  );
};
