import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Compass, HeartHandshake, Award, Users, Check, ArrowRight, Plane, MapPin } from 'lucide-react';
import sigiriyaImg from '../assets/images/sigiriya_rock_sunrise_1790443260997.jpg';
import ellaHillsImg from '../assets/images/ella_tea_hills_1790443301054.jpg';
import luxuryResortImg from '../assets/images/luxury_resort_ocean_1790443287801.jpg';
import { COMPANY_DETAILS } from '../data/travelData';
import { useEnquiry } from '../context/EnquiryContext';

export const AboutPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  const trustPillars = [
    { title: "Sri Lanka Travel Specialists", desc: "Native island knowledge encompassing historical routes, seasonal migrations, and hidden landscapes." },
    { title: "24/7 Airport Operations", desc: "Stationed right at Bandaranaike International Airport for fast-track reception and continuous coordination." },
    { title: "Personalized Travel Planning", desc: "No cookie-cutter packages; each schedule is tailored to your unique travel rhythm and preferences." },
    { title: "Professional Travel Team", desc: "Government-licensed tourist chauffeur guides, seasoned naturalists, and certified air ticketing specialists." }
  ];

  return (
    <main className="bg-[#F7F9FC]">
      {/* Editorial Hero */}
      <section className="mt-10 py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
              About Travels Feeder
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B0F19] tracking-tight mt-2 leading-[1.1] text-balance">
              Travel With People <br />
              <span className="text-[#E53935]">Who Care.</span>
            </h1>
            <p className="text-slate-600 text-base sm:text-lg mt-4 leading-relaxed">
              Travels Feeder is a Sri Lankan registered travel company providing island-wide tours and personalized travel experiences for travelers visiting Sri Lanka and exploring the world.
            </p>
          </div>

          {/* 4 Pillars Grid (No invented numerical stats) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-10 border-t border-slate-100">
            {trustPillars.map((pillar) => (
              <div key={pillar.title} className="bg-[#F7F9FC] rounded-2xl p-6 border border-slate-100">
                <div className="w-1.5 h-6 bg-[#E53935] rounded-full mb-3" />
                <h3 className="text-base font-bold text-[#0B0F19]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Collage */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-md">
                  <img
                    src={sigiriyaImg}
                    alt="Cultural Sri Lanka"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-md translate-y-6">
                  <img
                    src={ellaHillsImg}
                    alt="Hill Country Ella"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-wider uppercase text-[#2563EB]">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B0F19] tracking-tight">
                Crafting Meaningful Journeys, Not Just Itineraries.
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Travels Feeder was founded on a simple conviction: travel should be effortless, deeply personal, and authentic. Our experienced team is dedicated to creating memorable travel experiences and providing thoughtful service to tourists from across the globe.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                We focus on understanding each traveler's individual expectations. Whether you are traveling as a solo adventurer, a couple seeking tranquil coastal luxury, or a multi-generational family discovering ancient kingdoms, we tailor every mile to your wishes.
              </p>

              <div className="pt-2 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">
                    <strong>IATA Accredited Air Ticketing:</strong> Authorized booking agent with access to global airline reservation networks.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">
                    <strong>24/7 Airport Support:</strong> Ground assistance team on call at Bandaranaike International Airport (CMB).
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700">
                    <strong>Licensed Chauffeur Guides:</strong> Certified guides fluent in English, German, French, Arabic, and Russian.
                  </span>
                </div>
              </div>

              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
                  className="px-7 py-3.5 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide shadow-sm transition-all cursor-pointer"
                >
                  Plan With Our Team
                </button>

                <Link
                  to="/contact"
                  className="px-7 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-[#0B0F19] rounded-full text-xs font-bold tracking-wide transition-all"
                >
                  Contact Head Office
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
