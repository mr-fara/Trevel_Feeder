import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Compass, Camera } from 'lucide-react';
import yalaLeopardImg from '../../assets/images/yala_leopard_safari_1790443274802.jpg';
import { useEnquiry } from '../../context/EnquiryContext';

export const SafariSection: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  const parks = [
    { name: "Yala National Park", focus: "Highest Leopard Density & Coastlines", animals: "Leopard · Elephant · Sloth Bear" },
    { name: "Wilpattu National Park", focus: "Ancient Natural Lakes & Dense Forests", animals: "Leopard · Barking Deer · Crocodile" },
    { name: "Minneriya National Park", focus: "The Great Asian Elephant Gathering", animals: "300+ Wild Elephants · Pelicans" },
    { name: "Udawalawe National Park", focus: "Year-Round Elephant Sanctuary", animals: "Elephant Herds · Water Buffalo · Hawk Eagle" }
  ];

  const keySpecies = ["Sri Lankan Leopard", "Asian Elephant", "Sloth Bear", "Mugger Crocodile", "Indian Peafowl"];

  return (
    <section className="py-20 sm:py-28 bg-[#0B0F19] text-white overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E53935]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Container */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] bg-black">
              <img
                src={yalaLeopardImg}
                alt="Wild Sri Lankan leopard on safari in Yala"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-amber-400 font-bold">
                    Yala National Park · Block 1
                  </div>
                  <div className="text-lg font-bold">
                    Panthera pardus kotiya
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  Certified Naturalist Led
                </div>
              </div>
            </div>

            {/* Floating Safari Spec card */}
            <div className="hidden sm:flex absolute -bottom-5 -right-4 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl items-center gap-3">
              <Camera className="w-8 h-8 text-amber-400" />
              <div>
                <div className="text-xs font-bold text-white">Dedicated 4x4 Jeeps</div>
                <div className="text-[11px] text-white/70">Custom raised tiered seating</div>
              </div>
            </div>
          </div>

          {/* Right Editorial Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
              Wildlife Expeditions
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
              Into the Wild.
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience the extraordinary wildlife of Sri Lanka through carefully arranged safari journeys. We organize customized 4x4 open-top safari jeeps, park entry clearances, and certified naturalists with deep tracking experience.
            </p>

            {/* Animal highlight badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              {keySpecies.map((animal) => (
                <span
                  key={animal}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/90"
                >
                  {animal}
                </span>
              ))}
            </div>

            {/* Parks Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {parks.map((park) => (
                <div key={park.name} className="bg-white/5 border border-white/10 p-3.5 rounded-2xl">
                  <div className="font-bold text-white">{park.name}</div>
                  <div className="text-slate-400 mt-0.5">{park.focus}</div>
                  <div className="text-[11px] text-amber-400/90 mt-1 font-medium">{park.animals}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() =>
                  openEnquiry({
                    service: 'Safari Journey',
                    destination: 'Yala / Wilpattu Wildlife Safari'
                  })
                }
                className="px-7 py-3.5 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide transition-all shadow-sm cursor-pointer"
              >
                Plan a Safari
              </button>

              <Link
                to="/safari"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-semibold tracking-wide transition-colors"
              >
                <span>Full Safari Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
