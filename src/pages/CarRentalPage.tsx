import React from 'react';
import { Users, Briefcase, Cog, Wind, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { VEHICLE_OPTIONS } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const CarRentalPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <main className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            Island-Wide Fleet
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Car Rental & Chauffeur Drive
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Choose the right vehicle for your journey with flexible rental options, comprehensive insurance, and comfortable transportation for destinations across Sri Lanka.
          </p>
        </div>

        {/* Chauffeur vs Self-Drive Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
              Most Popular
            </span>
            <h3 className="text-xl font-bold text-[#0B0F19] mt-1">
              Chauffeur-Driven Island Tour
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Sit back and take in scenic mountain roads, wildlife passes, and coastal vistas while your certified English-speaking tourist chauffeur handles navigation, fuel, and parking.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Independent Exploration
            </span>
            <h3 className="text-xl font-bold text-[#0B0F19] mt-1">
              Self-Drive Rental & Permit Assistance
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Rent verified sedans or 4WD SUVs with full insurance. We provide assistance in obtaining your mandatory Sri Lankan driving endorsement based on your International Driving Permit (IDP).
            </p>
          </div>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VEHICLE_OPTIONS.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-[#0B0F19]">
                    {car.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B0F19]">
                    {car.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {car.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{car.passengers}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span>{car.luggage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Cog className="w-4 h-4 text-slate-400" />
                      <span>{car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wind className="w-4 h-4 text-slate-400" />
                      <span>Dual A/C Included</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Daily / Weekly Hires
                </span>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Car Rental',
                      destination: car.name,
                      notes: `Requesting rental quote for: ${car.name} (${car.category}).`
                    })
                  }
                  className="px-5 py-2.5 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
