import React from 'react';
import { motion } from 'motion/react';
import {
  MessageSquareText,
  Compass,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import sigiriyaImg from '../../assets/images/sigiriya_rock_sunrise_1790443260997.jpg';
import ellaHillsImg from '../../assets/images/ella_tea_hills_1790443301054.jpg';
import luxuryResortImg from '../../assets/images/luxury_resort_ocean_1790443287801.jpg';

const STEPS = [
  {
    num: "01",
    title: "Tell Us Your Plans",
    subtitle: "Consultation & Intake",
    desc: "Share your target travel dates, party size, dream destinations, or flight preferences with our Colombo concierge team.",
    icon: MessageSquareText,
    image: ellaHillsImg,
    accentColor: "from-red-500 to-rose-600",
    ctaLabel: "Share Travel Plans"
  },
  {
    num: "02",
    title: "We Design Your Journey",
    subtitle: "Bespoke Curation",
    desc: "We engineer a tailored itinerary pairing private air-conditioned transport, handpicked boutique stays, and wildlife permits.",
    icon: Compass,
    image: sigiriyaImg,
    accentColor: "from-blue-500 to-indigo-600",
    ctaLabel: "Request Proposal"
  },
  {
    num: "03",
    title: "Travel & Make Memories",
    subtitle: "On-Ground Reception",
    desc: "Touch down to 24/7 airport greeting, dedicated chauffeur guides, and real-time operational support throughout your trip.",
    icon: HeartHandshake,
    image: luxuryResortImg,
    accentColor: "from-emerald-500 to-teal-600",
    ctaLabel: "Start Memory Making"
  }
];

export const PlanningSteps: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#FAFBFD] via-white to-[#F5F7FA] overflow-hidden">
      
      {/* ────────── AMBIENT BACKGROUND GLOWS ────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/30 via-cyan-50/20 to-transparent blur-3xl" />
        <div className="absolute bottom-10 -left-40 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-red-100/25 via-orange-50/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        
        {/* ────────── 1. SECTION HEADER ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4"
        >
          

          <h2 className="text-[2.25rem] sm:text-5xl lg:text-6xl font-bold text-[#0A0A0A] tracking-[-0.035em] leading-[1.05] text-balance">
            Plan Your Journey <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#E53935] via-[#EF4444] to-[#F97316] font-bold bg-clip-text text-transparent">
              With Absolute Confidence.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto tracking-[-0.01em]">
            From your initial inquiry to your arrival back home, Travels Feeder crafts every detail with precision, safety, and local warmth.
          </p>
        </motion.div>

        {/* ────────── 2. STEP CARDS GRID (3-COLUMNS) ────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  delay: idx * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="group relative bg-white/90 backdrop-blur-2xl rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_10px_35px_-15px_rgba(0,0,0,0.05),0_2px_6px_rgba(0,0,0,0.02)] ring-1 ring-black/[0.05] hover:ring-black/[0.09] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Full-bleed edge-to-edge image header (No inner frame padding) */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/11] w-full overflow-hidden bg-slate-100">
                    <img
                      src={step.image}
                      alt={step.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/10 opacity-80 group-hover:opacity-70 transition-opacity" />

                    {/* Floating Frosted Step Number Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white shadow-xs">
                      STAGE {step.num}
                    </div>

                    {/* Floating Glass Icon Badge */}
                    <div className="absolute top-3.5 right-3.5 w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 shadow-sm flex items-center justify-center text-[#0A0A0A]">
                      <Icon className="w-5 h-5 text-[#0A0A0A]" />
                    </div>

                    {/* In-image caption title */}
                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl sm:text-[22px] font-semibold text-[#0A0A0A] tracking-[-0.02em] leading-snug group-hover:text-[#E53935] transition-colors duration-200">
                      {step.title}
                    </h3>

                    <p className="text-[13px] sm:text-[14px] text-slate-600 font-normal leading-relaxed mt-2.5 tracking-[-0.01em]">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 pb-6 sm:px-7 sm:pb-7">
                  <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
                      className="group/btn inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-800 hover:text-black transition-colors cursor-pointer"
                    >
                      <span>{step.ctaLabel}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all" />
                    </button>

                    <span className="text-[11px] font-medium text-slate-400">
                      Step {step.num} of 03
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ────────── 3. BOTTOM CONVERSATION STRIP ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-14 sm:mt-18 bg-white/90 backdrop-blur-2xl rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 ring-1 ring-black/[0.05] shadow-[0_16px_50px_-20px_rgba(0,0,0,0.08)] flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 ring-1 ring-emerald-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-semibold text-[#0A0A0A] tracking-[-0.01em]">
                Ready to initiate Stage 01?
              </div>
              <div className="text-xs text-slate-500 font-normal">
                Our specialists respond with customized itineraries and flight choices within 2 hours.
              </div>
            </div>
          </div>

          <button
            onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <span>Start Free Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};