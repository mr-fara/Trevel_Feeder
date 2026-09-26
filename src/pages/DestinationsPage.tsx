import React, { useState } from 'react';
import { MapPin, Clock, Calendar, ArrowRight, Compass } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const DestinationsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { openEnquiry } = useEnquiry();

  const categories = [
    'All',
    'Culture',
    'Hill Country',
    'Beaches',
    'Wildlife',
    'Southern Coast'
  ];

  const filtered = activeCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === activeCategory);

  return (
    <main className="mt-10 py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            Island Explorer
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Explore Sri Lanka
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            From golden ocean shores to mist-shrouded mountain peaks and UNESCO ancient kingdoms, discover the unique character of Sri Lanka's finest destinations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-10 border-b border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B0F19] text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0B0F19]">
                    {dest.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-[#E53935] uppercase tracking-wider">
                    {dest.tagline}
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0F19] tracking-tight mt-1">
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-slate-500 after:content-['·'] last:after:content-[''] after:ml-1.5"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div className="text-[11px] text-slate-500">
                  Ideal: <strong className="text-slate-700">{dest.idealDuration}</strong>
                </div>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Sri Lanka Tour',
                      destination: dest.name,
                      notes: `Interested in visiting ${dest.name} (${dest.category}). Ideal stay: ${dest.idealDuration}.`
                    })
                  }
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#0F3B82] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Plan Trip Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
