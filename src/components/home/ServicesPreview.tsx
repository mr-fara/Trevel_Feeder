import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { SERVICES } from '../../data/travelData';
import { useEnquiry } from '../../context/EnquiryContext';

export const ServicesPreview: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative py-14 sm:py-24 lg:py-36 bg-gradient-to-b from-[#FAFBFD] via-white to-[#F5F7FA] overflow-hidden">
      
      {/* ────────── AMBIENT BACKGROUND GLOWS ────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 sm:-left-40 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full bg-gradient-to-br from-blue-100/30 via-cyan-50/20 to-transparent blur-3xl" />
        <div className="absolute bottom-10 -right-20 sm:-right-40 w-[280px] sm:w-[450px] lg:w-[550px] h-[280px] sm:h-[450px] lg:h-[550px] rounded-full bg-gradient-to-tl from-red-100/25 via-orange-50/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* ────────── 1. SECTION HEADER ────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-3 sm:space-y-4"
          >
            

            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#0A0A0A] tracking-[-0.035em] leading-[1.1] sm:leading-[1.05] text-balance">
              Services Tailored <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#E53935] via-[#EF4444] to-[#F97316] font-bold bg-clip-text text-transparent">
                To Your Journey.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed tracking-[-0.01em] px-1 sm:px-0">
              From accredited airline ticketing and luxury airport reception to private safari jeeps and multilingual guide services.
            </p>
          </motion.div>

          {/* Header Link */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="self-start lg:self-end shrink-0 w-full lg:w-auto"
          >
            <Link
              to="/services"
              className="group flex sm:inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-3.5 bg-white/90 backdrop-blur-xl hover:bg-white active:scale-[0.98] text-[#0A0A0A] rounded-full text-[12px] sm:text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] transition-all duration-200"
            >
              <span>Explore All {SERVICES.length} Services</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-black group-hover:translate-x-0.5 transition-all duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* ────────── 2. SERVICES BENTO GRID ────────── */}
        {/* Responsive constraints: 2 cols on mobile, 3 cols on medium, 4 cols on large */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {SERVICES.map((srv, idx) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                delay: idx * 0.06,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="group relative bg-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-[28px] overflow-hidden shadow-[0_10px_35px_-15px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] ring-1 ring-black/[0.05] hover:ring-black/[0.09] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Full-bleed Edge-to-Edge Image Header */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={srv.image}
                  alt={srv.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-50 transition-opacity" />

                {/* Frosted Number Badge */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/20 backdrop-blur-md border border-white/30 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full text-[9px] sm:text-[11px] font-mono font-semibold text-white shadow-xs">
                  {srv.num}
                </div>

                {/* Quick-action overlay button */}
                <Link
                  to={srv.link}
                  aria-label={`Learn more about ${srv.title}`}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/25 hover:bg-white text-white hover:text-black backdrop-blur-md border border-white/30 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <ArrowUpRight className="w-3 sm:w-3.5 sm:h-3.5" />
                </Link>
              </div>

              {/* Card Body & Content Container */}
              <div className="p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between flex-1">
                <div>
                  {/* Title */}
                  <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-[#0A0A0A] tracking-[-0.015em] leading-snug group-hover:text-[#E53935] transition-colors duration-200 line-clamp-1 sm:line-clamp-none">
                    {srv.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-[11px] sm:text-[12px] lg:text-[13px] text-slate-500 font-normal leading-relaxed mt-1 sm:mt-2 line-clamp-2 tracking-[-0.01em]">
                    {srv.shortDesc}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 mt-3 border-t border-slate-100/80 flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <Link
                    to={srv.link}
                    className="text-[11px] sm:text-[12px] font-semibold text-slate-700 hover:text-black inline-flex items-center gap-0.5 transition-colors"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => openEnquiry({ service: srv.title })}
                    className="w-full xs:w-auto text-center px-2.5 py-1.5 rounded-full bg-[#F5F6F8] hover:bg-[#0A0A0A] text-slate-700 hover:text-white text-[10px] sm:text-[11px] font-medium tracking-[-0.01em] transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ────────── 3. BOTTOM INTEGRATED CONCIERGE STRIP ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-10 sm:mt-16 lg:mt-20 bg-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-[28px] lg:rounded-[36px] p-5 sm:p-7 lg:p-10 ring-1 ring-black/[0.05] shadow-[0_16px_50px_-20px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-[#0A0A0A] tracking-tight">
                Need multiple travel services bundled?
              </h4>
              <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-normal mt-0.5 sm:mt-1 max-w-xl leading-relaxed">
                Combine international flights, island chauffeur transfers, and boutique hotel bookings into a single unified itinerary with dedicated concierge support.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
              className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[12px] sm:text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Build Custom Package</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>

            <Link
              to="/contact"
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#F5F6F8] hover:bg-[#EEF0F4] active:scale-[0.98] text-[#0A0A0A] rounded-full text-[12px] sm:text-[13px] font-medium tracking-[-0.01em] flex items-center justify-center transition-all text-center"
            >
              Speak to Consultant
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
};