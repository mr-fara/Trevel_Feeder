import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  FileCheck2,
  Globe2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Plane,
  Sparkles,
  MessageCircle,
  FileText,
  CalendarCheck,
  Award,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useEnquiry } from '../context/EnquiryContext';
import { COMPANY_DETAILS } from '../data/travelData';

interface VisaService {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
  recommendedFor: string;
  processingTime: string;
  primaryActionLabel: string;
}

const VISA_SERVICES: VisaService[] = [
  {
    id: 'inbound-eta',
    tag: 'Sri Lanka Inbound',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    title: 'Tourist & Business ETA',
    subtitle: 'Electronic Travel Authorization (ETA)',
    desc: 'Frictionless entry documentation for international visitors, diaspora returnees, and wellness travelers visiting Sri Lanka.',
    points: [
      'Official ETA processing & government portal submission',
      'Standard 30-day double-entry holiday permits',
      'Fast-track business visa recommendation letters',
      'Visa extension assistance for long-stay travelers (up to 180 days)',
      'Arrival clearance advisory and customs guidance'
    ],
    recommendedFor: 'Foreign Passport Holders, Tourists & Expats',
    processingTime: '24 – 48 Hours',
    primaryActionLabel: 'Apply for Sri Lanka ETA'
  },
  {
    id: 'outbound-consult',
    tag: 'Global Outbound',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
    title: 'Outbound Visa Consultation',
    subtitle: 'Consulate & Embassy Document Concierge',
    desc: 'Full-spectrum document audit, appointment scheduling, and flight itinerary verification for Sri Lankan citizens traveling abroad.',
    points: [
      'Personalized embassy document verification checklist',
      'Professional covering letter & tailored day-by-day travel itinerary drafting',
      'VFS Global / TLScontact / Embassy biometric appointment scheduling',
      'Confirmed flight & luxury hotel vouchers compliant for visa applications',
      'Mock visa interview briefing and financial proof advisory'
    ],
    recommendedFor: 'Sri Lankan Citizens & Resident Expats',
    processingTime: '5 – 15 Business Days',
    primaryActionLabel: 'Book Visa Consultation'
  }
];

const POPULAR_DESTINATIONS = [
  { country: 'Schengen Europe', flag: '🇪🇺', processing: '15 Days', popular: true },
  { country: 'United Kingdom', flag: '🇬🇧', processing: '3–6 Weeks', popular: true },
  { country: 'United Arab Emirates', flag: '🇦🇪', processing: '24–48 Hours', popular: true },
  { country: 'Singapore', flag: '🇸🇬', processing: '3–5 Days', popular: false },
  { country: 'Australia', flag: '🇦🇺', processing: '4–8 Weeks', popular: true },
  { country: 'Malaysia', flag: '🇲🇾', processing: '2–4 Days', popular: false },
  { country: 'Thailand', flag: '🇹🇭', processing: '3–5 Days', popular: false },
  { country: 'United States', flag: '🇺🇸', processing: 'Appointment Based', popular: true },
  { country: 'Japan', flag: '🇯🇵', processing: '7–10 Days', popular: false },
  { country: 'Canada', flag: '🇨🇦', processing: '4–12 Weeks', popular: false }
];

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Profile Audit',
    desc: 'We review your travel purpose, passport eligibility, and financial background to choose the optimal visa route.'
  },
  {
    step: '02',
    title: 'Dossier Curation',
    desc: 'Our specialists draft cover letters, verify bank declarations, and arrange confirmed flight & hotel vouchers.'
  },
  {
    step: '03',
    title: 'Embassy Submission',
    desc: 'We secure priority biometrics slots and submit electronic files directly to consular portals.'
  },
  {
    step: '04',
    title: 'Visa Issuance',
    desc: 'Your approved e-visa or stamped passport is handed over with departure checklist and travel insurance.'
  }
];

export const VisaPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();
  const [activeTab, setActiveTab] = useState<'all' | 'popular'>('popular');

  const filteredDestinations = activeTab === 'all' 
    ? POPULAR_DESTINATIONS 
    : POPULAR_DESTINATIONS.filter(d => d.popular);

  return (
    <main className="relative bg-gradient-to-b from-[#FAFBFD] via-[#F8FAFC] to-[#F1F4F8] min-h-screen overflow-hidden">
      
      {/* ────────── AMBIENT BACKGROUND GLOWS ────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[650px] h-[550px] rounded-full bg-gradient-to-br from-blue-100/40 via-sky-50/20 to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-red-100/30 via-orange-50/20 to-transparent blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] rounded-full bg-gradient-to-t from-emerald-100/30 to-transparent blur-3xl" />
      </div>

      {/* Grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-10 sm:pt-16 pb-24 sm:pb-32">
        
        {/* ────────── 1. HERO HEADER ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl space-y-4 sm:space-y-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-xs">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#2563EB]">
              <Sparkles className="w-3 h-3" />
            </span>
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-slate-700">
              Travel Documentation & Permits
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#0A0A0A] tracking-[-0.035em] leading-[1.04]">
            Frictionless Visas. <br />
            <span className="bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#0EA5E9] bg-clip-text text-transparent">
              Worldwide Confidence.
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed tracking-[-0.01em]">
            Official government ETA processing for Sri Lanka inbound visitors, alongside complete embassy document concierge services for global outbound travelers.
          </p>
        </motion.div>

        {/* ────────── 2. TRUST STATS STRIP ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {[
            { label: 'Approval Rate', value: '99.4%', icon: Award, color: 'text-emerald-600' },
            { label: 'Countries Covered', value: '45+ Global', icon: Globe2, color: 'text-blue-600' },
            { label: 'Accreditation', value: 'IATA & SLTDA', icon: ShieldCheck, color: 'text-indigo-600' },
            { label: 'Standard ETA Turnaround', value: '24–48 Hours', icon: Clock, color: 'text-amber-600' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 ring-1 ring-black/[0.04] shadow-xs flex items-center gap-3.5"
              >
                <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#F5F6F8] flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {stat.label}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#0A0A0A] tracking-[-0.01em] mt-0.5">
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* ────────── 3. MAIN SERVICE CARDS ────────── */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {VISA_SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="relative bg-white/95 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] p-6 sm:p-9 lg:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.05] flex flex-col justify-between overflow-hidden group"
            >
              {/* Subtle card header accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent group-hover:via-blue-400 transition-all duration-500" />

              <div>
                {/* Tag & Processing Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border ${service.tagColor}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {service.tag}
                  </span>

                  <span className="inline-flex items-center gap-1 text-[12px] font-medium text-slate-500 bg-[#F5F6F8] px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Turnaround: <strong className="text-slate-700">{service.processingTime}</strong>
                  </span>
                </div>

                {/* Title & Description */}
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {service.subtitle}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight">
                    {service.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3 tracking-[-0.01em]">
                  {service.desc}
                </p>

                {/* Scope Points */}
                <div className="mt-6 pt-6 border-t border-slate-100/80 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                    Included Consultation Scope
                  </div>
                  {service.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-[13px] sm:text-[14px] text-slate-700 font-normal leading-snug">
                        {pt}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recommended For */}
                <div className="mt-6 p-3.5 bg-[#F8FAFC] rounded-2xl ring-1 ring-slate-100 text-xs text-slate-600 flex items-center gap-2.5">
                  <Globe2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                  <span>
                    <strong className="text-slate-800">Ideal For:</strong> {service.recommendedFor}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Visa Assistance',
                      notes: `Inquiry regarding ${service.title} (${service.tag}). Please contact me with application checklist and fees.`
                    })
                  }
                  className="w-full sm:flex-1 py-3.5 sm:py-4 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-2xl sm:rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>{service.primaryActionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`https://wa.me/94774638544?text=${encodeURIComponent(`Hello Travels Feeder! I have a question regarding ${service.title}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 sm:py-4 bg-white hover:bg-slate-50 active:scale-[0.98] text-emerald-700 border border-slate-200/80 rounded-2xl sm:rounded-full text-[13px] font-medium flex items-center justify-center gap-2 transition-all"
                  aria-label="Direct WhatsApp Consultation"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span className="sm:hidden">WhatsApp Direct</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ────────── 4. 4-STEP CONCIERGE PROCESS ────────── */}
        <div className="mt-20 sm:mt-28">
          <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              End-To-End Concierge
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-[#0A0A0A] tracking-[-0.03em] mt-3">
              How We File Your Visa
            </h2>
            <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
              A structured, stress-free four-stage workflow designed to maximize approval certainty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {WORKFLOW_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 ring-1 ring-black/[0.04] shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-mono font-bold text-slate-300 tracking-tight mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-base font-semibold text-[#0A0A0A] tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span>Stage {idx + 1} of 4</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ────────── 5. POPULAR OUTBOUND DESTINATIONS ────────── */}
        <div className="mt-20 sm:mt-28 bg-white/70 backdrop-blur-2xl rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-12 ring-1 ring-black/[0.05] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Global Coverage
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] tracking-tight mt-1">
                Frequently Processed Embassies
              </h3>
            </div>

            {/* Pill Filter Toggle */}
            <div className="inline-flex items-center p-1 bg-[#F5F6F8] rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('popular')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'popular'
                    ? 'bg-white text-[#0A0A0A] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Popular Only
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'all'
                    ? 'bg-white text-[#0A0A0A] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                View All ({POPULAR_DESTINATIONS.length})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredDestinations.map((dest, i) => (
              <motion.div
                key={dest.country}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() =>
                  openEnquiry({
                    service: 'Visa Assistance',
                    destination: dest.country,
                    notes: `Outbound visa consultation request for ${dest.country}.`
                  })
                }
                className="group bg-[#F8FAFC] hover:bg-white p-3.5 rounded-2xl ring-1 ring-slate-200/60 hover:ring-black/10 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl mb-1.5">{dest.flag}</div>
                  <div className="text-[13px] font-semibold text-[#0A0A0A] group-hover:text-blue-600 transition-colors truncate">
                    {dest.country}
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-slate-400 group-hover:text-slate-600 flex items-center justify-between">
                  <span>{dest.processing}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ────────── 6. MANDATORY ENTRY ADVISORY CARD ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 sm:mt-16 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/40 rounded-3xl sm:rounded-[36px] p-6 sm:p-8 lg:p-10 ring-1 ring-amber-200/70 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shrink-0 ring-1 ring-amber-300/60">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base sm:text-lg font-semibold text-[#0A0A0A] tracking-tight">
                  Mandatory Passport Validity & Consular Compliance
                </h4>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-md">
                  Universal Requirement
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Most international immigration authorities (including the Department of Immigration & Emigration Sri Lanka, Schengen Area, and the UK Home Office) strictly require your passport to possess <strong>at least 6 months remaining validity</strong> past your intended departure date and a minimum of <strong>two consecutive blank visa pages</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-amber-800">
                  <FileText className="w-3.5 h-3.5" />
                  Compliant Flight & Hotel Vouchers Included
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5 text-amber-800">
                  <CalendarCheck className="w-3.5 h-3.5" />
                  Free Pre-Departure Profile Verification
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ────────── 7. FOOTER HELP STRIP ────────── */}
        <div className="mt-12 sm:mt-16 text-center space-y-4">
          <p className="text-sm text-slate-500 font-normal">
            Need urgent assistance for an upcoming flight or family group booking?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => openEnquiry({ service: 'Visa Assistance' })}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-sm transition-all cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4" />
              Start Free Assessment
            </button>
            <a
              href={`https://wa.me/94774638544?text=${encodeURIComponent("Hello Travels Feeder! I need urgent visa assistance.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Visa Desk
            </a>
          </div>
        </div>

      </div>
    </main>
  );
};