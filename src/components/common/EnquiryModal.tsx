import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  Compass,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';
import { COMPANY_DETAILS } from '../../data/travelData';
import {apiPost} from '../../lib/api';

export const EnquiryModal: React.FC = () => {
  const { isOpen, enquiryData, closeEnquiry } = useEnquiry();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(enquiryData.service || 'Sri Lanka Tour');
  const [destination, setDestination] = useState(enquiryData.destination || '');
  const [travelDate, setTravelDate] = useState(enquiryData.travelDate || '');
  const [travellers, setTravellers] = useState(enquiryData.passengers || '2 Travellers');
  const [message, setMessage] = useState(enquiryData.notes || '');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setService(enquiryData.service || 'Sri Lanka Tour');
      setDestination(enquiryData.destination || '');
      setTravelDate(enquiryData.travelDate || '');
      setTravellers(enquiryData.passengers || '2 Travellers');
      setMessage(enquiryData.notes || '');
      setSubmitted(false);
      setSubmitError('');
    }
  }, [isOpen, enquiryData]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeEnquiry();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeEnquiry]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await apiPost('/api/enquiries', {
        fullName,
        email,
        phone,
        service,
        destination,
        travelDate,
        returnDate: enquiryData.returnDate,
        passengers: travellers,
        tripType: enquiryData.tripType,
        message,
        source: 'enquiry-modal',
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not submit your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    "Air Ticket / Flights",
    "Sri Lanka Tour",
    "International Tour",
    "Accommodation",
    "Airport Transfer",
    "Safari Journey",
    "Car Rental",
    "Visa Assistance",
    "Other Request"
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 overflow-x-hidden">
        {/* Apple-style Ultra-soft Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={closeEnquiry}
          className="fixed inset-0 bg-black/40 backdrop-blur-xl transition-all"
        />

        {/* Modal Surface — Responsive iOS Sheet on Mobile, Centered Glass Card on Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{
            type: 'spring',
            damping: 28,
            stiffness: 320,
            mass: 0.8
          }}
          className="relative w-full max-w-2xl bg-white/95 backdrop-blur-2xl rounded-t-[32px] sm:rounded-[36px] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.3)] ring-1 ring-black/[0.06] overflow-hidden z-10 max-h-[92vh] sm:max-h-[88vh] flex flex-col my-0 sm:my-8"
        >
          {/* iOS-style Sheet Grab Handle (Mobile only) */}
          <div className="sm:hidden w-full flex items-center justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-slate-300" />
          </div>

          {/* Modal Header */}
          <div className="relative px-6 sm:px-8 pt-5 sm:pt-7 pb-5 border-b border-slate-100 bg-white/40">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50/80 border border-red-100/60 text-[#E53935] text-[10px] font-bold tracking-[0.14em] uppercase">
                  <Sparkles className="w-3 h-3" />
                  Bespoke Planning
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] tracking-tight">
                  Request Travel Itinerary & Quote
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-normal tracking-[-0.01em]">
                  Tell us your dreams. Our travel specialists will curate a tailored itinerary within hours.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={closeEnquiry}
                className="shrink-0 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto overscroll-contain">
            {submitted ? (
              /* ────────── SUCCESS STATE (Apple Pay Style Confirmation) ────────── */
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="text-center py-6 px-2"
              >
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50/50">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.8]" />
                </div>

                <h4 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight mb-2">
                  Request Received
                </h4>
                <p className="text-slate-500 text-sm max-w-sm mx-auto mb-8 font-normal leading-relaxed">
                  We’ve assigned a dedicated travel designer to prepare your flight schedule and itinerary.
                </p>

                {/* Receipt Card */}
                <div className="bg-[#F8FAFC] rounded-2xl sm:rounded-3xl p-5 sm:p-6 max-w-md mx-auto mb-8 ring-1 ring-slate-200/60 text-left text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/60">
                    <span className="font-semibold text-slate-800 text-xs tracking-[-0.01em]">Itinerary Details</span>
                    <span className="text-[10px] font-medium text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                      Priority Queue
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-600 pt-1">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Traveler</span>
                      <span className="font-medium text-slate-800">{fullName || 'Traveler'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Service</span>
                      <span className="font-medium text-slate-800">{service}</span>
                    </div>
                    {destination && (
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Destination</span>
                        <span className="font-medium text-slate-800">{destination}</span>
                      </div>
                    )}
                    {travelDate && (
                      <div>
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block">Date</span>
                        <span className="font-medium text-slate-800">{travelDate}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Party</span>
                      <span className="font-medium text-slate-800">{travellers}</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/94774638544?text=${encodeURIComponent(
                      `Hello Travels Feeder! I just submitted an enquiry for ${service} (${destination || 'Sri Lanka'}). My name is ${fullName}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-full text-[13px] font-semibold tracking-[-0.01em] shadow-sm transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Instant WhatsApp Concierge
                  </a>
                  <button
                    onClick={closeEnquiry}
                    className="w-full sm:w-auto px-7 py-3.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-800 rounded-full text-[13px] font-semibold tracking-[-0.01em] transition-all cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              /* ────────── FORM STATE ────────── */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Section 1: Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Full Name <span className="text-[#E53935]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Sarah Jenkins"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-[#E53935]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact & Service */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp <span className="text-[#E53935]">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Service Required
                    </label>
                    <div className="relative">
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full pl-9 pr-9 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <Compass className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Destination, Dates, Travellers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Destination / Route
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Sri Lanka"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Target Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all"
                      />
                      <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Travellers
                    </label>
                    <div className="relative">
                      <select
                        value={travellers}
                        onChange={(e) => setTravellers(e.target.value)}
                        className="w-full pl-9 pr-9 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="1 Solo Traveller">1 Solo</option>
                        <option value="2 Travellers">2 Travellers</option>
                        <option value="3-4 Travellers">3-4 Travellers</option>
                        <option value="5-8 Travellers">5-8 Travellers</option>
                        <option value="9+ Travellers">9+ Group</option>
                      </select>
                      <Users className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Section 4: Notes */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Preferences & Requirements
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Preferred flight class, hotel style (3/4/5-star), safari preferences, special celebrations..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white text-sm text-[#0A0A0A] placeholder:text-slate-400 rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] focus:outline-none transition-all resize-none"
                  />
                </div>

                {/* Footer & Action Button */}
                {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
                <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs text-slate-500 order-2 sm:order-1">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                      <span className="font-medium text-slate-700">{COMPANY_DETAILS.accreditation}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] transition-all order-1 sm:order-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Curating...
                      </span>
                    ) : (
                      <>
                        Request Custom Plan
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};