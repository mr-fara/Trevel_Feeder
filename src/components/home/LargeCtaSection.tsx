import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare } from 'lucide-react';
import ellaHillsImg from '../../assets/images/ella_tea_hills_1790443301054.jpg';
import { useEnquiry } from '../../context/EnquiryContext';
import { COMPANY_DETAILS } from '../../data/travelData';

export const LargeCtaSection: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-slate-900 text-white">
      {/* Background Image with Cinematic Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ellaHillsImg}
          alt="Sri Lanka scenic mountains"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19]/90 via-[#0B0F19]/70 to-[#0B0F19]/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-bold tracking-wider uppercase mb-6 border border-white/10">
          Feel the difference with us
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto leading-tight text-balance">
          Where will your next journey take you?
        </h2>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed">
          Tell us what you are dreaming of. We'll help turn it into a journey worth remembering.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
            className="w-full sm:w-auto px-8 py-4 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Plan My Trip
          </button>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full text-xs font-bold tracking-wide backdrop-blur-md transition-all inline-flex items-center justify-center gap-2"
          >
            <span>Contact Travels Feeder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Contact Micro-bar */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
          <a
            href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
            className="flex items-center gap-2 hover:text-white transition-colors tabular-nums"
          >
            <Phone className="w-3.5 h-3.5 text-[#E53935]" />
            <span>Call {COMPANY_DETAILS.phones[0].display}</span>
          </a>
          <span>·</span>
          <a
            href={`https://wa.me/94774638544?text=${encodeURIComponent("Hello Travels Feeder! I would like to plan a trip.")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct WhatsApp Support</span>
          </a>
        </div>
      </div>
    </section>
  );
};
