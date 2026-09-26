import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Hotel, Sparkles, Check } from 'lucide-react';
import { ACCOMMODATION_CATEGORIES } from '../../data/travelData';
import { useEnquiry } from '../../context/EnquiryContext';

export const AccommodationPreview: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#2563EB]">
              Handpicked Island Stays
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1 text-balance">
              Where Elegance Meets Comfort
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              From colonial tea bungalows and 5-star beachfront resorts to private safari lodges and authentic homestays.
            </p>
          </div>

          <Link
            to="/accommodation"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#2563EB] hover:text-[#0F3B82] transition-colors self-start md:self-end"
          >
            <span>View All Accommodation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ACCOMMODATION_CATEGORIES.slice(0, 3).map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0B0F19]">
                    {cat.tier}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B0F19] tracking-tight group-hover:text-[#2563EB] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {cat.typicalAmenities.map((amenity, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-slate-500 after:content-['·'] last:after:content-[''] after:ml-1.5"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">
                  Best Rates Guaranteed
                </span>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Accommodation',
                      destination: cat.name,
                      notes: `Looking for accommodation in the ${cat.tier} category.`
                    })
                  }
                  className="px-4 py-2 bg-[#2563EB] hover:bg-[#0F3B82] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Request Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
