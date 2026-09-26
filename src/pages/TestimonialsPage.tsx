import React from 'react';
import { Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const TestimonialsPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <main className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            Client Experiences
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Travelers Who Felt The Difference
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Read firsthand accounts from couples, families, and solo explorers who journeyed across Sri Lanka and worldwide destinations with Travels Feeder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-red-100 mb-4" />
                <p className="text-base text-slate-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <div className="font-bold text-[#0B0F19] text-base">
                  {t.author}
                </div>
                <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <span>{t.country}</span>
                  <span>·</span>
                  <span className="text-[#2563EB] font-medium">{t.tripType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-[#0B0F19]">
            Ready to experience the difference yourself?
          </h3>
          <p className="text-slate-600 text-sm mt-2 max-w-lg mx-auto">
            Get in touch with our travel team today for an obligation-free itinerary and personalized quote.
          </p>
          <button
            onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
            className="mt-6 px-8 py-3.5 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            Start Planning Your Journey
          </button>
        </div>
      </div>
    </main>
  );
};
