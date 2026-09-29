import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle2,
  Clock,
  Globe,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Navigation,
  User,
  Calendar,
  Users
} from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/travelData';
import {apiPost} from '../../lib/api';

export const ContactPreview: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelType, setTravelType] = useState('Sri Lanka Tour');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await apiPost('/api/enquiries', {
        fullName, email, phone, service: travelType, destination, travelDate,
        passengers: travelers, message, source: 'home-contact',
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const travelTypes = [
    "Air Ticket",
    "Sri Lanka Tour",
    "International Tour",
    "Accommodation",
    "Airport Transfer",
    "Safari Journey",
    "Car Rental",
    "Visa Assistance",
    "Other Request"
  ];

  const contactChannels = [
    {
      icon: MapPin,
      iconBg: 'from-red-50 to-rose-50',
      iconColor: 'text-red-500',
      iconRing: 'ring-red-100',
      title: 'Our Location',
      content: COMPANY_DETAILS.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(COMPANY_DETAILS.address)}`,
      linkLabel: 'View on Map',
    },
    {
      icon: Phone,
      iconBg: 'from-blue-50 to-indigo-50',
      iconColor: 'text-blue-500',
      iconRing: 'ring-blue-100',
      title: 'Call Us Directly',
      content: COMPANY_DETAILS.phones.map((p) => ({
        display: p.display,
        href: `tel:${p.raw}`,
      })),
      href: `tel:${COMPANY_DETAILS.phones[0].raw}`,
      linkLabel: 'Tap to Call',
    },
    {
      icon: Mail,
      iconBg: 'from-emerald-50 to-teal-50',
      iconColor: 'text-emerald-600',
      iconRing: 'ring-emerald-100',
      title: 'Email Support',
      content: COMPANY_DETAILS.emails.map((m) => ({
        display: m,
        href: `mailto:${m}`,
      })),
      href: `mailto:${COMPANY_DETAILS.emails[0]}`,
      linkLabel: 'Send Email',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-[#FAFBFD] via-[#F8FAFC] to-[#F3F5F8] overflow-hidden">
      {/* Ambient Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/40 via-purple-50/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-emerald-100/40 via-teal-50/20 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ────────── LEFT COLUMN: Company Info ────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 space-y-8 lg:sticky lg:top-24"
          >
            {/* Section Header */}
            <div className="space-y-3">
              

              <h2 className="text-[2rem] sm:text-4xl lg:text-[2.5rem] font-semibold text-[#0A0A0A] tracking-[-0.03em] leading-[1.05] text-balance">
                Let's Craft Your
                <br />
                <span className="bg-gradient-to-r from-[#E53935] via-[#EF4444] to-[#F97316] bg-clip-text text-transparent">
                  Perfect Journey.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-md tracking-[-0.01em]">
                Our Colombo-based travel specialists are ready to curate seamless flight bookings, bespoke holiday itineraries, and private travel experiences.
              </p>
            </div>

            {/* Contact Channel Cards */}
            <div className="space-y-3">
              {contactChannels.map((channel, i) => {
                const Icon = channel.icon;
                const contents = Array.isArray(channel.content) ? channel.content : [{ display: channel.content, href: channel.href }];

                return (
                  <motion.a
                    key={i}
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="group block bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-[0_8px_30px_-8px_rgba(0,0,0,0.1)] ring-1 ring-black/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon Container */}
                      <div className={`shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${channel.iconBg} flex items-center justify-center ring-1 ${channel.iconRing} transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${channel.iconColor}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] sm:text-[14px] font-semibold text-[#0A0A0A] tracking-[-0.01em]">
                          {channel.title}
                        </div>
                        <div className="mt-1 space-y-0.5">
                          {contents.map((item, j) => (
                            <div key={j} className="text-[12px] sm:text-[13px] text-slate-500 font-normal truncate">
                              {item.display}
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#2563EB] group-hover:opacity-100 transition-opacity duration-200">
                          {channel.linkLabel}
                          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/94774638544?text=${encodeURIComponent("Hello Travels Feeder! I'd like to plan a trip to Sri Lanka.")}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Concierge
              </a>

              <a
                href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-white/90 backdrop-blur-xl hover:bg-white active:scale-[0.98] text-[#0A0A0A] rounded-full text-[13px] font-medium tracking-[-0.01em] shadow-sm hover:shadow-md ring-1 ring-black/[0.05] transition-all duration-200 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#2563EB]" />
                Call Now
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-[12px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-medium text-slate-600">{COMPANY_DETAILS.accreditation}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium text-slate-600">Response within 2 hrs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-purple-500" />
                <span className="font-medium text-slate-600">12+ Years Experience</span>
              </div>
            </div>
          </motion.div>

          {/* ────────── RIGHT COLUMN: Contact Form ────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[28px] sm:rounded-[40px] overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.05]">
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E53935] via-orange-400 to-[#F97316]" />

              <div className="p-7 sm:p-10 lg:p-12">
                {submitted ? (
                  /* ─── SUCCESS STATE ─── */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center py-8"
                  >
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8">
                      <div className="absolute inset-0 rounded-full bg-emerald-50" />
                      <div className="absolute inset-3 rounded-full bg-emerald-100" />
                      <div className="relative w-full h-full rounded-full bg-emerald-50 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 stroke-[1.5]" />
                      </div>
                      {/* Animated rings */}
                      <div className="absolute inset-0 rounded-full border-2 border-emerald-200 animate-ping opacity-40" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A0A0A] tracking-tight">
                      Thank You, {fullName || 'Traveler'}!
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mt-3 leading-relaxed tracking-[-0.01em]">
                      Your enquiry has been received. Our senior travel designer will review your preferences and craft a personalized itinerary within 2 hours.
                    </p>

                    {/* Summary Card */}
                    <div className="mt-8 p-5 bg-[#F8FAFC] rounded-2xl ring-1 ring-slate-200/60 text-left text-xs space-y-2 max-w-sm mx-auto">
                      <div className="font-semibold text-slate-800 text-[13px] pb-2 border-b border-slate-200/60">
                        Enquiry Summary
                      </div>
                      {travelType && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Service</span>
                          <span className="font-medium text-slate-800">{travelType}</span>
                        </div>
                      )}
                      {destination && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Destination</span>
                          <span className="font-medium text-slate-800">{destination}</span>
                        </div>
                      )}
                      {travelDate && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Travel Date</span>
                          <span className="font-medium text-slate-800">{travelDate}</span>
                        </div>
                      )}
                      {travelers && (
                        <div className="flex justify-between">
                          <span className="text-slate-500">Party Size</span>
                          <span className="font-medium text-slate-800">{travelers} Travelers</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={`https://wa.me/94774638544?text=${encodeURIComponent(`Hi! I just submitted an enquiry for ${travelType} (${destination || 'Sri Lanka'}). Name: ${fullName}.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-full text-[13px] font-medium tracking-[-0.01em] transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Chat on WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 rounded-full text-[13px] font-medium tracking-[-0.01em] transition-all cursor-pointer"
                      >
                        Send Another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ─── FORM STATE ─── */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Header */}
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#0A0A0A] tracking-tight">
                        Send an Enquiry
                      </h3>
                      <p className="text-sm text-slate-500 font-normal tracking-[-0.01em]">
                        Fill in your details and we'll curate the perfect itinerary for you.
                      </p>
                    </div>

                    {/* Section 1: Contact Details */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Contact Information
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Full Name */}
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="Full Name *"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[14px] text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none transition-all"
                          />
                          <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        </div>

                        {/* Email */}
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="Email Address *"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-9 pr-4 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[14px] text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none transition-all"
                          />
                          <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          placeholder="Phone / WhatsApp Number *"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[14px] text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none transition-all"
                        />
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                      </div>
                    </div>

                    {/* Section 2: Travel Details */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Travel Preferences
                      </div>

                      {/* Travel Type */}
                      <div className="relative">
                        <select
                          value={travelType}
                          onChange={(e) => setTravelType(e.target.value)}
                          className="w-full pl-9 pr-9 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[14px] text-[#0A0A0A] focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          {travelTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <Navigation className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        <div className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none">
                          <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      {/* Destination, Date, Travelers */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Destination"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[13px] text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none transition-all"
                          />
                          <Navigation className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        </div>

                        <div className="relative">
                          <input
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[13px] text-[#0A0A0A] focus:outline-none transition-all cursor-pointer"
                          />
                          <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        </div>

                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            max="50"
                            placeholder="Travelers"
                            value={travelers}
                            onChange={(e) => setTravelers(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[13px] text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none transition-all cursor-pointer"
                          />
                          <Users className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Message */}
                    <div className="space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                        Your Message
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Share your flight schedules, preferred hotel styles, places you'd love to visit, or any special requirements..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-[#F5F6F8] hover:bg-[#EEF0F4] focus:bg-white rounded-2xl border border-transparent focus:border-slate-300 focus:shadow-[0_0_0_4px_rgba(0,0,0,0.03)] text-[14px] text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none transition-all resize-none leading-relaxed"
                      />
                    </div>

                    {/* Submit Button */}
                    {submitError && <p role="alert" className="text-sm text-red-700">{submitError}</p>}
                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <p className="text-[12px] text-slate-400 font-normal tracking-[-0.01em]">
                        We respond within 2 business hours.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-2xl text-[14px] font-medium tracking-[-0.01em] shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_20px_-6px_rgba(0,0,0,0.25)] transition-all duration-200 cursor-pointer"
                      >
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                        {isSubmitting ? 'Sending...' : 'Submit Enquiry'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};