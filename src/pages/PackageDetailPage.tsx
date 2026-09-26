import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Check, ShieldCheck, Phone, Calendar, Users, Send } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const PackageDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openEnquiry } = useEnquiry();

  const pkg = TOUR_PACKAGES.find((p) => p.id === id) || TOUR_PACKAGES[0];

  return (
    <main className="bg-[#F7F9FC] pb-24">
      {/* Top Banner Navigation */}
      <div className="bg-white border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B0F19]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packages</span>
          </Link>

          <span className="text-xs font-semibold text-slate-400">
            {pkg.category} · {pkg.duration}
          </span>
        </div>
      </div>

      {/* Hero Media & Title Section */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left 8 Cols: Images & Itinerary */}
            <div className="lg:col-span-8 space-y-8">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[16/9] bg-slate-900">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-block px-3 py-1 bg-[#E53935] text-white text-xs font-bold rounded-full mb-2">
                    {pkg.duration}
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                    {pkg.name}
                  </h1>
                  <p className="text-white/80 text-sm mt-1">
                    Route: {pkg.destinations.join(' → ')}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                <h2 className="text-xl font-bold text-[#0B0F19] mb-3">
                  Trip Overview
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {pkg.summary}
                </p>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {pkg.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Day by Day Itinerary */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                    Day By Day
                  </span>
                  <h2 className="text-2xl font-bold text-[#0B0F19] mt-0.5">
                    Detailed Itinerary
                  </h2>
                </div>

                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
                  {pkg.itinerary.map((day, idx) => (
                    <div key={idx} className="relative pl-10">
                      <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#2563EB] ring-4 ring-blue-50" />
                      <div className="text-xs font-bold text-[#2563EB] font-mono">
                        {day.day}
                      </div>
                      <h4 className="text-base font-bold text-[#0B0F19] mt-0.5">
                        {day.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {day.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                <h3 className="text-lg font-bold text-[#0B0F19] mb-4">
                  What's Included in This Journey
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {pkg.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Quick Booking / Quote Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Pricing Guidance
                  </span>
                  <div className="text-3xl font-extrabold text-[#2563EB] mt-0.5">
                    {pkg.priceStarting}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Customized based on party size, hotel tier, and seasonality.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <strong className="text-slate-800">{pkg.duration}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <strong className="text-slate-800">{pkg.category} Private Tour</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport:</span>
                    <strong className="text-slate-800">Private Air-Conditioned</strong>
                  </div>
                </div>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Sri Lanka Tour',
                      destination: pkg.name,
                      notes: `Custom Quote Request for ${pkg.name} (${pkg.duration}). Route: ${pkg.destinations.join(' - ')}`
                    })
                  }
                  className="w-full py-4 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full font-bold text-xs tracking-wider uppercase shadow-sm transition-all cursor-pointer text-center block"
                >
                  Request Customized Itinerary
                </button>

                <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>No obligation free quotation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                    <span>Fast response within 2 hours</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
