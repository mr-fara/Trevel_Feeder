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
    <section className="relative py-14 sm:py-24 lg:py-36 bg-gradient-to-b from-white via-[#FAFBFD] to-[#F5F7FA] overflow-hidden">
      
      {/* ────────── AMBIENT BACKGROUND GLOWS ────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 sm:-right-40 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] rounded-full bg-gradient-to-br from-red-100/30 via-orange-50/20 to-transparent blur-3xl" />
        <div className="absolute bottom-10 -left-20 sm:-left-40 w-[280px] sm:w-[450px] lg:w-[550px] h-[280px] sm:h-[450px] lg:h-[550px] rounded-full bg-gradient-to-tr from-blue-100/35 via-cyan-50/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        
        {/* ────────── 1. EDITORIAL HEADER ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 lg:mb-20 space-y-3 sm:space-y-4"
        >
          

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-[#0A0A0A] tracking-[-0.035em] leading-[1.1] sm:leading-[1.05] text-balance">
            Crafted With Care. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#E53935] via-[#EF4444] to-[#F97316] font-bold bg-clip-text text-transparent">
              Engineered For Reassurance.
            </span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto tracking-[-0.01em] px-2 sm:px-0">
            We bridge authentic island discovery with rigorous international hospitality standards — providing peace of mind from your first flight inquiry to your journey home.
          </p>
        </motion.div>

        {/* ────────── 2. BENTO ADVANTAGE GRID ────────── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-7">
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
                className="group relative bg-white/85 backdrop-blur-2xl rounded-2xl sm:rounded-[28px] lg:rounded-[34px] p-4 sm:p-6 lg:p-8 shadow-[0_12px_40px_-15px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] ring-1 ring-black/[0.05] hover:ring-black/[0.09] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge & Metric */}
                  <div className="flex items-center justify-between gap-1.5 sm:gap-2 mb-4 sm:mb-5 lg:mb-6">
                    <span
                      className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 lg:px-3 rounded-full text-[8px] sm:text-[10px] lg:text-[11px] font-bold tracking-wider uppercase border ${adv.badgeColor} truncate`}
                    >
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current shrink-0" />
                      <span className="truncate">{adv.badge}</span>
                    </span>

                    <span className="hidden sm:block text-[10px] lg:text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors truncate">
                      {adv.metric}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl lg:rounded-[20px] bg-gradient-to-br ${adv.iconGradient} flex items-center justify-center ring-1 ${adv.iconRing} mb-4 sm:mb-5 lg:mb-6 transition-transform duration-300 group-hover:scale-105`}
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${adv.iconColor}`} />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm sm:text-lg lg:text-[22px] font-semibold text-[#0A0A0A] tracking-[-0.02em] leading-snug group-hover:text-black">
                    {adv.title}
                  </h3>

                  <p className="text-[11px] sm:text-[13px] lg:text-[14px] text-slate-600 font-normal leading-relaxed mt-1.5 sm:mt-2 lg:mt-2.5 tracking-[-0.01em] line-clamp-4 sm:line-clamp-none">
                    {adv.desc}
                  </p>
                </div>

                {/* Subtle bottom check highlight */}
                <div className="mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 lg:pt-5 border-t border-slate-100/80 flex items-center justify-between text-[10px] sm:text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 sm:gap-1.5 text-slate-700 truncate">
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Verified Standard</span>
                  </span>
                  <span className="text-slate-300 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all shrink-0 ml-1">
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
          className="mt-10 sm:mt-14 lg:mt-18 bg-white/90 backdrop-blur-2xl rounded-2xl sm:rounded-[28px] lg:rounded-[36px] p-5 sm:p-7 lg:p-10 ring-1 ring-black/[0.05] shadow-[0_16px_50px_-20px_rgba(0,0,0,0.08)] flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0A0A0A] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-[#0A0A0A] tracking-tight">
                Ready to experience the island difference?
              </h4>
              <p className="text-[11px] sm:text-xs lg:text-sm text-slate-500 font-normal mt-0.5 sm:mt-1 max-w-xl leading-relaxed">
                Connect directly with our senior destination specialists for instant quote comparisons, custom route drafting, and guaranteed IATA airfares.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full lg:w-auto">
            <button
              onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
              className="w-full sm:w-auto px-5 sm:px-7 py-3 sm:py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[12px] sm:text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Design Your Trip</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
            <button
              onClick={() => openEnquiry({ service: 'Air Ticket / Flights' })}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 bg-[#F5F6F8] hover:bg-[#EEF0F4] active:scale-[0.98] text-[#0A0A0A] rounded-full text-[12px] sm:text-[13px] font-medium tracking-[-0.01em] transition-all cursor-pointer"
            >
              Flight Desk
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};