import React from 'react';
import { motion } from 'motion/react';
import {
  HeartHandshake,
  Clock,
  Compass,
  SlidersHorizontal,
  ShieldCheck,
  Car,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Globe2,
  Award
} from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

interface FeaturePoint {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  desc: string;
  metric: string;
  icon: React.ElementType;
  iconGradient: string;
  iconColor: string;
  iconRing: string;
}

const ADVANTAGES: FeaturePoint[] = [
  {
    id: 'bespoke-planning',
    badge: '100% Bespoke',
    badgeColor: 'bg-red-50 text-[#E53935] border-red-100/80',
    title: 'Personalized Itinerary Design',
    desc: 'We never do cookie-cutter tours. Every single schedule is crafted around your travel pace, personal interests, family needs, and boutique accommodation preferences.',
    metric: 'Zero generic templates',
    icon: HeartHandshake,
    iconGradient: 'from-red-50 to-rose-100/60',
    iconColor: 'text-[#E53935]',
    iconRing: 'ring-red-100/80',
  },
  {
    id: 'airport-support',
    badge: 'On-Ground Team',
    badgeColor: 'bg-blue-50 text-[#2563EB] border-blue-100/80',
    title: '24/7 Airport & Island Operations',
    desc: 'Our dedicated airport desk at Bandaranaike International (CMB) and dispatch logistics team ensure immediate greeting, flight tracking, and constant on-road reassurance.',
    metric: 'Live CMB greeting desk',
    icon: Clock,
    iconGradient: 'from-blue-50 to-indigo-100/60',
    iconColor: 'text-[#2563EB]',
    iconRing: 'ring-blue-100/80',
  },
  {
    id: 'island-specialists',
    badge: 'Native Insight',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100/80',
    title: 'Deep Local Curation',
    desc: 'Unlock private scenic routes, seasonal wildlife migration windows, authentic village dining, and heritage sanctuaries rarely discovered by commercial tourists.',
    metric: 'Hand-picked experiences',
    icon: Compass,
    iconGradient: 'from-emerald-50 to-teal-100/60',
    iconColor: 'text-emerald-600',
    iconRing: 'ring-emerald-100/80',
  },
  {
    id: 'flexible-freedom',
    badge: 'Agile Itineraries',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-100/80',
    title: 'Total Flexibility & Transparency',
    desc: 'Freedom to refine daily stops on the fly, adjust hotel tiers, or add spontaneous excursions without bureaucratic booking friction or hidden surcharges.',
    metric: 'Adaptive daily schedules',
    icon: SlidersHorizontal,
    iconGradient: 'from-amber-50 to-orange-100/60',
    iconColor: 'text-amber-600',
    iconRing: 'ring-amber-100/80',
  },
  {
    id: 'certified-guides',
    badge: 'SLTDA Licensed',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100/80',
    title: 'Certified Chauffeur Naturalists',
    desc: 'Travel with government-accredited, multi-lingual chauffeur guides and specialized wildlife naturalists known for impeccable safety, courtesy, and story-telling.',
    metric: 'Licensed professionals only',
    icon: ShieldCheck,
    iconGradient: 'from-indigo-50 to-violet-100/60',
    iconColor: 'text-indigo-600',
    iconRing: 'ring-indigo-100/80',
  },
  {
    id: 'modern-fleet',
    badge: 'Premium Fleet',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-200/80',
    title: 'Climate-Controlled Luxury Vehicles',
    desc: 'Ride in pristine, fully insured hybrid sedans, high-roof executive vans, luxury SUVs, and customized 4x4 safari jeeps with onboard high-speed Wi-Fi and chilled amenities.',
    metric: 'Executive clean fleet',
    icon: Car,
    iconGradient: 'from-slate-100 to-slate-200/70',
    iconColor: 'text-slate-800',
    iconRing: 'ring-slate-200/80',
  },
];

export const WhyUsSection: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-[#FAFBFD] to-[#F5F7FA] overflow-hidden">
      
      {/* ────────── AMBIENT BACKGROUND GLOWS ────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-red-100/30 via-orange-50/20 to-transparent blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-blue-100/35 via-cyan-50/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* ────────── 1. EDITORIAL HEADER ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-xs">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-50 text-[#E53935]">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-700">
              The Travels Feeder Standard
            </span>
          </div>

          <h2 className="text-[2.25rem] sm:text-5xl lg:text-6xl font-bold text-[#0A0A0A] tracking-[-0.035em] leading-[1.05] text-balance">
            Crafted With Care. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#E53935] via-[#EF4444] to-[#F97316] font-bold bg-clip-text text-transparent">
              Engineered For Reassurance.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto tracking-[-0.01em]">
            We bridge authentic island discovery with rigorous international hospitality standards — providing peace of mind from your first flight inquiry to your journey home.
          </p>
        </motion.div>

        {/* ────────── 2. BENTO ADVANTAGE GRID ────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {ADVANTAGES.map((adv, idx) => {
            const Icon = adv.icon;
            return (
              <motion.div
                key={adv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: idx * 0.08,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative bg-white/85 backdrop-blur-2xl rounded-[28px] sm:rounded-[34px] p-7 sm:p-8 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] ring-1 ring-black/[0.05] hover:ring-black/[0.09] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase border ${adv.badgeColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {adv.badge}
                    </span>

                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                      {adv.metric}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl sm:rounded-[20px] bg-gradient-to-br ${adv.iconGradient} flex items-center justify-center ring-1 ${adv.iconRing} mb-6 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${adv.iconColor}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-[22px] font-semibold text-[#0A0A0A] tracking-[-0.02em] leading-snug group-hover:text-black">
                    {adv.title}
                  </h3>

                  <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal leading-relaxed mt-2.5 tracking-[-0.01em]">
                    {adv.desc}
                  </p>
                </div>

                {/* Subtle bottom check highlight */}
                <div className="mt-6 pt-5 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Standard
                  </span>
                  <span className="text-slate-300 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ────────── 3. APPLE-STYLE TRUST & ASSURANCE BANNER ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-14 sm:mt-18 bg-white/90 backdrop-blur-2xl rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 ring-1 ring-black/[0.05] shadow-[0_16px_50px_-20px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-[#0A0A0A] tracking-tight">
                Ready to experience the island difference?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5 max-w-xl">
                Connect directly with our senior destination specialists for instant quote comparisons, custom route drafting, and guaranteed IATA airfares.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
            <button
              onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Design Your Trip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => openEnquiry({ service: 'Air Ticket / Flights' })}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#F5F6F8] hover:bg-[#EEF0F4] active:scale-[0.98] text-[#0A0A0A] rounded-full text-[13px] font-medium tracking-[-0.01em] transition-all cursor-pointer"
            >
              Flight Desk
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};