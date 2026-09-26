import React from 'react';
import { ArrowRight, Globe, Plane } from 'lucide-react';
import { INTERNATIONAL_DESTINATIONS } from '../../data/travelData';
import { useEnquiry } from '../../context/EnquiryContext';

export const InternationalDestinations: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#2563EB]">
              Worldwide Holidays & Outbound
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1 text-balance">
              Go Beyond Sri Lanka
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Travels Feeder connects you to world capitals, private island retreats, and cultural odysseys with full air ticketing, visa support, and curated hotels.
            </p>
          </div>

          <button
            onClick={() =>
              openEnquiry({
                service: 'International Tour',
                destination: 'Custom Worldwide Holiday'
              })
            }
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#E53935] hover:text-[#B91C1C] transition-colors self-start md:self-end cursor-pointer"
          >
            <span>Plan Worldwide Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* International Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {INTERNATIONAL_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white">
                    {dest.region}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {dest.tagline}
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

              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500">
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
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#0F3B82] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
