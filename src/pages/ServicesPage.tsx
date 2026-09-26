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
            Travels Feeder offers end-to-end travel capabilities, from international air ticketing and visa approvals to private luxury transfers, wildlife naturalists, and bespoke island itineraries.
          </p>
        </div>

        {/* Numbered Detailed Service List */}
        <div className="space-y-12">
          {SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className={`bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 border border-slate-100 shadow-sm flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-8 lg:gap-12 items-center`}
            >
              {/* Media */}
              <div className="w-full lg:w-1/2 aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-md">
                <img
                  src={srv.image}
                  alt={srv.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white">
                  Service {srv.num}
                </div>
              </div>

              {/* Text & Actions */}
              <div className="w-full lg:w-1/2 space-y-4">
                <span className="text-xs font-mono font-bold text-[#E53935]">
                  {srv.num}. CAPABILITY
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B0F19] tracking-tight">
                  {srv.title}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {srv.fullDesc}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
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
          ))}
        </div>
      </div>
    </main>
  );
};
