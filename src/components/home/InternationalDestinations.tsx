import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Globe, Plane, Sparkles } from 'lucide-react';
import { INTERNATIONAL_DESTINATIONS } from '../../data/travelData';
import { useEnquiry } from '../../context/EnquiryContext';

export const InternationalDestinations: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative py-14 sm:py-24 lg:py-32 bg-[#F7F9FC] overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[400px] h-[400px] rounded-full bg-blue-100/20 blur-3xl" />
        <div className="absolute -bottom-20 left-10 w-[300px] h-[300px] rounded-full bg-indigo-100/35 blur-3xl" />
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
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100/80 shadow-xs">
              <Globe className="w-3 h-3 text-[#2563EB]" />
              <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-[#2563EB]">
                Worldwide Holidays & Outbound
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#0B0F19] tracking-[-0.03em] leading-[1.1] text-balance">
              Go Beyond Sri Lanka
            </h2>
            
            <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-xl">
              Travels Feeder connects you to world capitals, private island retreats, and cultural odysseys with full air ticketing, visa support, and curated hotels.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="self-start md:self-end shrink-0"
          >
            <button
              onClick={() =>
                openEnquiry({
                  service: 'International Tour',
                  destination: 'Custom Worldwide Holiday'
                })
              }
              className="group inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#E53935] hover:text-[#B91C1C] transition-colors cursor-pointer"
            >
              <span>Plan Worldwide Trip</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* ────────── INTERNATIONAL GRID ────────── */}
        {/* Responsive Grid: 2 cols on mobile, 3 cols on medium/large */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {INTERNATIONAL_DESTINATIONS.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                delay: idx * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-slate-100">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Floating Region Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-black/40 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-semibold text-white tracking-wide">
                    {dest.region}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-3 sm:p-5 lg:p-6">
                  <h3 className="text-sm sm:text-lg lg:text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#2563EB] transition-colors duration-200 line-clamp-1">
                    {dest.name}
                  </h3>
                  
                  <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">
                    {dest.tagline}
                  </p>

                  {/* Highlights Map */}
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-slate-100 flex flex-wrap gap-x-1.5 gap-y-0.5 items-center">
                    {dest.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[9px] sm:text-[10px] lg:text-[11px] text-slate-400 after:content-['·'] last:after:content-[''] after:ml-1.5 after:text-slate-300 shrink-0 font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6 pt-2 flex items-center justify-between border-t border-slate-100 gap-2 shrink-0">
                <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 tracking-wide uppercase">
                  Custom Itinerary
                </span>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'International Tour',
                      destination: dest.name,
                      notes: `Requesting custom quotation for ${dest.name} (${dest.region}) including air ticketing & hotels.`
                    })
                  }
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-full text-[10px] sm:text-[11px] lg:text-xs font-bold tracking-wide transition-all active:scale-[0.97] cursor-pointer shrink-0 shadow-sm"
                >
                  Request Quote
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};