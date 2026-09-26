import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, ArrowRight, Check, Compass } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../../data/travelData';
import { useEnquiry } from '../../context/EnquiryContext';

export const HolidayPackagesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { openEnquiry } = useEnquiry();

  const categories = [
    'All',
    'Sri Lanka',
    'Cultural',
    'Wildlife',
    'Adventure',
    'Beach',
    'Luxury'
  ];

  const filteredPackages = activeCategory === 'All'
    ? TOUR_PACKAGES
    : TOUR_PACKAGES.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
              Curated Itineraries
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1 text-balance">
              Journeys Worth Remembering
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Carefully designed experiences across Sri Lanka and destinations around the world.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#2563EB] hover:text-[#0F3B82] transition-colors self-start md:self-end"
          >
            <span>All Holiday Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Segmented Controls (with mobile horizontal scroll) */}
        <div className="flex items-center gap-2 pb-6 overflow-x-auto scrollbar-none mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B0F19] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-[#F7F9FC] rounded-3xl overflow-hidden border border-slate-100/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0B0F19]">
                    {pkg.duration}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#0B0F19]/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white">
                    {pkg.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#E53935] transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.summary}
                  </p>

                  {/* Destinations Route */}
                  <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-start gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#E53935] shrink-0 mt-0.5" />
                    <span className="truncate">{pkg.destinations.join(' · ')}</span>
                  </div>

                  {/* Highlights Bullet */}
                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    {pkg.highlights.slice(0, 2).map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-200/50 mt-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Pricing
                  </span>
                  <span className="text-sm font-bold text-[#2563EB]">
                    {pkg.priceStarting}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-[#0B0F19] bg-white rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() =>
                      openEnquiry({
                        service: 'Sri Lanka Tour',
                        destination: pkg.name,
                        notes: `Enquiry for ${pkg.name} (${pkg.duration}). Route: ${pkg.destinations.join(', ')}`
                      })
                    }
                    className="px-4 py-2 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
