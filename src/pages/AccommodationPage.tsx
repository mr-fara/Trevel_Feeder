import React, { useState } from 'react';
import { Hotel, Check, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { ACCOMMODATION_CATEGORIES } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const AccommodationPage: React.FC = () => {
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const { openEnquiry } = useEnquiry();

  const filtered = selectedTier === 'All'
    ? ACCOMMODATION_CATEGORIES
    : ACCOMMODATION_CATEGORIES.filter(c => c.tier.includes(selectedTier));

  return (
    <main className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-[#2563EB]">
            Island Hospitality
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Accommodation & Resorts
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Choose from homestays, backpacker accommodation, 3–5 star hotels, boutique properties, luxury resorts and unique campsite experiences across Sri Lanka.
          </p>
        </div>

        {/* Accommodation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0B0F19]">
                    {item.tier}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Included Amenities
                    </span>
                    {item.typicalAmenities.map((am, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{am}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Best Island Rates
                </span>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Accommodation',
                      destination: item.name,
                      notes: `Requesting booking options for: ${item.name} (${item.tier})`
                    })
                  }
                  className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#0F3B82] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Request Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
