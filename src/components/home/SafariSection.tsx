import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, MapPin, Award, Binoculars } from 'lucide-react';
import yalaLeopardImg from '../../assets/images/yala_leopard_safari_1790443274802.jpg';
import { useEnquiry } from '../../context/EnquiryContext';

export const SafariSection: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  const parks = [
    {
      name: 'Yala National Park',
      focus: "World's highest leopard density",
      animals: 'Leopard · Elephant · Sloth Bear',
      block: 'Block 1',
    },
    {
      name: 'Wilpattu National Park',
      focus: 'Ancient lakes & dense forests',
      animals: 'Leopard · Barking Deer · Crocodile',
      block: 'Northwest',
    },
    {
      name: 'Minneriya National Park',
      focus: 'The Great Elephant Gathering',
      animals: '300+ Wild Elephants · Pelicans',
      block: 'Central',
    },
    {
      name: 'Udawalawe National Park',
      focus: 'Year-round elephant sanctuary',
      animals: 'Elephant Herds · Water Buffalo',
      block: 'Southern',
    },
  ];

  const keySpecies = [
    'Sri Lankan Leopard',
    'Asian Elephant',
    'Sloth Bear',
    'Mugger Crocodile',
    'Indian Peafowl',
  ];

  const stats = [
    { value: '26', label: 'National Parks' },
    { value: '4x4', label: 'Private Jeeps' },
    { value: '15+', label: 'Yrs Trackers' },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-32 bg-[#0A0E17] text-white overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E53935]/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/[0.05] rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section header (mobile visible) */}
        <div className="lg:hidden mb-10 text-center">
          
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Into the
            <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
              Untamed Wild.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ---------- LEFT — VISUAL ---------- */}
          <div className="lg:col-span-6 relative">
            {/* Decorative frame */}
            <div className="relative">
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-14 h-14 border-t-2 border-l-2 border-amber-400/40 rounded-tl-3xl hidden sm:block" />
              <div className="absolute -bottom-3 -right-3 w-14 h-14 border-b-2 border-r-2 border-amber-400/40 rounded-br-3xl hidden sm:block" />

              {/* Main image */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8)] aspect-[4/5] sm:aspect-[4/4.2] lg:aspect-[4/4.6] bg-black group">
                <img
                  src={yalaLeopardImg}
                  alt="Wild Sri Lankan leopard on safari in Yala"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />

                {/* Cinematic gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50" />

                {/* Top badge */}
                <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                      Yala · Block 1
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E53935]/90 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span className="text-[10px] font-bold tracking-wider uppercase text-white">
                      Live Tracking
                    </span>
                  </div>
                </div>

                {/* Bottom caption */}
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-bold mb-2">
                    Featured Species
                  </div>
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold leading-tight">
                        Sri Lankan Leopard
                      </div>
                      <div className="text-xs sm:text-sm italic text-white/60 font-serif mt-0.5">
                        Panthera pardus kotiya
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                      <div className="text-[10px] uppercase tracking-wider text-white/50">
                        Endemic
                      </div>
                      <div className="text-sm font-bold text-amber-400">
                        Endangered
                      </div>
                    </div>
                  </div>

                  {/* Divider line */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-4 text-[11px] text-white/70">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Certified Naturalist Led
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating spec card — desktop */}
              <div className="hidden md:flex absolute -bottom-6 -right-6 bg-gradient-to-br from-white/[0.12] to-white/[0.06] backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-2xl items-center gap-3 max-w-[220px]">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400/20 to-amber-600/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    Private 4x4 Jeeps
                  </div>
                  <div className="text-[10px] text-white/60 mt-0.5 leading-snug">
                    Tiered photo seating
                  </div>
                </div>
              </div>

              {/* Floating stats — desktop */}
              <div className="hidden lg:block absolute -top-6 -left-6 bg-gradient-to-br from-white/[0.12] to-white/[0.06] backdrop-blur-2xl border border-white/20 p-4 rounded-2xl shadow-2xl">
                <div className="text-[9px] uppercase tracking-widest text-amber-400 font-bold mb-2">
                  Est. Since 2010
                </div>
                <div className="flex items-center gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-lg font-extrabold text-white leading-none">
                        {s.value}
                      </div>
                      <div className="text-[9px] text-white/60 mt-1 uppercase tracking-wider">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---------- RIGHT — EDITORIAL ---------- */}
          <div className="lg:col-span-6 space-y-7">
            {/* Header (desktop) */}
            <div className="hidden lg:block">
              
              <h2 className="text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.02]">
                Into the
                <span className="block italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
                  Untamed Wild.
                </span>
              </h2>
            </div>

            <p className="text-slate-300/90 text-sm sm:text-base lg:text-[15px] leading-relaxed max-w-xl">
              Experience the extraordinary wildlife of Sri Lanka through
              meticulously curated safari journeys. Private open-top 4x4 jeeps,
              priority park clearances, and certified naturalists with decades
              of tracking expertise — every detail refined for the discerning
              traveler.
            </p>

            {/* Key species */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Binoculars className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                  Key Species
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {keySpecies.map((animal) => (
                  <span
                    key={animal}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-br from-white/[0.08] to-white/[0.04] border border-white/10 text-[11px] sm:text-xs text-white/90 hover:border-amber-400/40 hover:text-amber-100 transition-all cursor-default"
                  >
                    {animal}
                  </span>
                ))}
              </div>
            </div>

            {/* Parks Grid */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/60">
                  Featured Parks
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {parks.map((park) => (
                  <div
                    key={park.name}
                    className="group relative bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/10 p-4 rounded-2xl hover:border-amber-400/30 hover:from-white/[0.09] transition-all duration-300 overflow-hidden"
                  >
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/[0.06] group-hover:to-transparent transition-all duration-500" />

                    <div className="relative">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="font-bold text-white text-sm leading-tight">
                          {park.name}
                        </div>
                        <span className="text-[9px] text-white/40 uppercase tracking-wider whitespace-nowrap mt-0.5">
                          {park.block}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug">
                        {park.focus}
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/[0.06] text-[10px] text-amber-400/90 font-medium">
                        {park.animals}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile stats bar */}
            <div className="lg:hidden grid grid-cols-3 gap-3 py-4 border-y border-white/10">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-extrabold text-white leading-none">
                    {s.value}
                  </div>
                  <div className="text-[10px] text-white/50 mt-1.5 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() =>
                  openEnquiry({
                    service: 'Safari Journey',
                    destination: 'Yala / Wilpattu Wildlife Safari',
                  })
                }
                className="group relative overflow-hidden px-7 py-4 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all shadow-[0_10px_30px_-5px_rgba(229,57,53,0.5)] hover:shadow-[0_15px_40px_-5px_rgba(229,57,53,0.7)] hover:-translate-y-0.5"
              >
                <span className="relative z-10 inline-flex items-center justify-center gap-2">
                  Plan a Safari
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

              <Link
                to="/safari"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 text-white rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all"
              >
                <span>Explore Safaris</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};