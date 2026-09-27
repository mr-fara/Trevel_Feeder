import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const ServicesPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <main className="mt-10 py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            Full Travel Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Our Services
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Travels Feeder offers end-to-end travel capabilities, from
            international air ticketing and visa approvals to private luxury
            transfers, wildlife naturalists, and bespoke island itineraries.
          </p>
        </div>

        {/* Numbered Detailed Service List */}
        <div className="space-y-14 sm:space-y-20">
          {SERVICES.map((srv, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={srv.id}
                className={`relative bg-white rounded-3xl sm:rounded-[36px] overflow-hidden border border-slate-100 shadow-sm flex flex-col lg:items-stretch ${
                  isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                }`}
              >
                {/* ── Media: Full-bleed edge-to-edge, no inner frame ── */}
                <div className="relative w-full lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:min-h-[440px] overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Subtle gradient for badge legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/5 pointer-events-none" />

                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/55 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white tracking-wider">
                    Service {srv.num}
                  </div>
                </div>

                {/* ── Text & Actions ── */}
                <div className="w-full lg:w-1/2 flex items-center">
                  <div className="p-6 sm:p-10 lg:p-12 xl:p-14 space-y-4 w-full">
                    <span className="text-xs font-mono font-bold text-[#E53935] tracking-wider">
                      {srv.num}. CAPABILITY
                    </span>

                    <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0B0F19] tracking-tight leading-tight">
                      {srv.title}
                    </h2>

                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {srv.fullDesc}
                    </p>

                    <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-4">
                      <button
                        onClick={() => openEnquiry({ service: srv.title })}
                        className="px-6 py-3 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide shadow-sm transition-all cursor-pointer"
                      >
                        Inquire About {srv.title}
                      </button>

                      <Link
                        to={srv.link}
                        className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-full text-xs font-bold tracking-wide border border-slate-200 transition-colors inline-flex items-center gap-1.5"
                      >
                        <span>View Dedicated Page</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};