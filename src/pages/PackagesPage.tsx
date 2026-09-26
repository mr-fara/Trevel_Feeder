import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Check, ArrowRight, Search } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const PackagesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { openEnquiry } = useEnquiry();

  const categories = ['All', 'Sri Lanka', 'Cultural', 'Wildlife', 'Adventure', 'Beach', 'Luxury'];

  const filtered = TOUR_PACKAGES.filter((pkg) => {
    const matchesCat = activeCategory === 'All' || pkg.category === activeCategory;
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destinations.some(d => d.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pkg.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <main className="mt-10 py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            Holiday Packages
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Journeys Worth Remembering
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Carefully designed experiences across Sri Lanka and destinations around the world. Every itinerary is fully customizable to your preferred duration, hotel tier, and group size.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
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

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-full text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((pkg) => (
            <div
              key={pkg.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
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

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#E53935] transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {pkg.summary}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-[#E53935] shrink-0 mt-0.5" />
                    <span className="truncate">{pkg.destinations.join(' · ')}</span>
                  </div>

                  <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                    {pkg.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-100 mt-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                    Starting
                  </span>
                  <span className="text-sm font-bold text-[#2563EB]">
                    {pkg.priceStarting}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() =>
                      openEnquiry({
                        service: 'Sri Lanka Tour',
                        destination: pkg.name,
                        notes: `Inquiry for ${pkg.name} (${pkg.duration})`
                      })
                    }
                    className="px-4 py-2 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                  >
                    Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
