import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, ArrowRight, Check, Sparkles } from 'lucide-react';
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
    <section className="relative py-14 sm:py-24 lg:py-32 bg-white border-b border-slate-100 overflow-hidden">
      
      {/* ────────── AMBIENT BACKGROUND GLOWS ────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-20 sm:-right-40 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full bg-gradient-to-br from-[#E53935]/5 via-orange-50/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 sm:-left-40 w-[280px] sm:w-[450px] lg:w-[550px] h-[280px] sm:h-[450px] lg:h-[550px] rounded-full bg-gradient-to-tr from-blue-50/10 via-[#2563EB]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* ────────── SECTION HEADER ────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-2 sm:space-y-3"
          >
            

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] tracking-[-0.03em] leading-[1.1] text-balance">
              Journeys Worth Remembering
            </h2>
            
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl">
              Carefully designed experiences across Sri Lanka and premium boutique destinations around the world.
            </p>
          </motion.div>

          {/* Header Link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="self-start md:self-end shrink-0 w-full md:w-auto"
          >
            <Link
              to="/packages"
              className="group flex sm:inline-flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#2563EB] hover:text-[#0F3B82] transition-colors"
            >
              <span>All Holiday Packages</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ────────── SEGMENTED FILTER CONTROLS ────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2 pb-3 mb-8 sm:mb-10 overflow-x-auto scrollbar-none border-b border-slate-100 -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#0B0F19] text-white shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ────────── PACKAGES GRID ────────── */}
        {/* Responsive Grid: 2 cols on mobile, 3 cols on medium/large */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg, idx) => (
              <motion.div
                layout
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group bg-slate-50/50 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.08)] hover:bg-white transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Floating Duration Badge (Top Left) */}
                    <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold text-[#0B0F19] shadow-xs">
                      {pkg.duration}
                    </div>
                    
                    {/* Floating Category Badge (Top Right) */}
                    <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#0B0F19]/80 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-semibold text-white tracking-wide">
                      {pkg.category}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-3.5 sm:p-5 lg:p-6">
                    {/* Package Name */}
                    <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#E53935] transition-colors duration-200 line-clamp-1">
                      {pkg.name}
                    </h3>

                    {/* Short Summary */}
                    <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 mt-1 sm:mt-2 line-clamp-2 leading-relaxed">
                      {pkg.summary}
                    </p>

                    {/* Route Destinations */}
                    <div className="mt-3 pt-3 border-t border-slate-200/50 flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-500">
                      <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E53935] shrink-0 mt-0.5" />
                      <span className="truncate tracking-tight font-medium">
                        {pkg.destinations.join(' · ')}
                      </span>
                    </div>

                    {/* Highlights Bullet Lines (Hidden on small mobile to keep list balanced) */}
                    <ul className="hidden sm:block mt-3 space-y-1.5 text-xs text-slate-600">
                      {pkg.highlights.slice(0, 2).map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-3.5 pb-3.5 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6 pt-2.5 flex items-center justify-between border-t border-slate-200/40 gap-2 shrink-0">
                  

                  {/* Actions Group */}
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <Link
                      to={`/packages/${pkg.id}`}
                      className="px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-[10px] sm:text-xs font-semibold text-slate-700 hover:text-[#0B0F19] bg-white rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
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
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-colors cursor-pointer active:scale-95 shadow-xs"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};