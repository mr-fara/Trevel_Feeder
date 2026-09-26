import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock, ShieldCheck, Globe } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelType, setTravelType] = useState('Sri Lanka Tour');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState('2');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const travelTypes = [
    "Air Ticket",
    "Sri Lanka Tour",
    "International Tour",
    "Accommodation",
    "Airport Transfer",
    "Safari",
    "Car Rental",
    "Visa Assistance",
    "Other"
  ];

  return (
    <main className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            Contact Travels Feeder
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Let's Plan Your Next Journey.
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Reach our Colombo travel advisory desk directly by phone, WhatsApp, or email. We are available 24/7 to assist with flight reservations, bespoke holiday plans, and emergency traveler support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#0B0F19]">
                  {COMPANY_DETAILS.name}
                </h3>
                <p className="text-xs text-[#E53935] font-semibold italic mt-0.5">
                  "{COMPANY_DETAILS.tagline}"
                </p>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-blue-50 text-[#2563EB] text-xs font-bold">
                  {COMPANY_DETAILS.accreditation}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E53935] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B0F19] text-xs uppercase tracking-wider">
                      Physical Address
                    </div>
                    <div className="text-slate-600 mt-1 leading-relaxed">
                      {COMPANY_DETAILS.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B0F19] text-xs uppercase tracking-wider">
                      Phone Contacts
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      {COMPANY_DETAILS.phones.map((p) => (
                        <a
                          key={p.raw}
                          href={`tel:${p.raw}`}
                          className="text-slate-700 hover:text-[#E53935] font-semibold tabular-nums"
                        >
                          {p.display}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B0F19] text-xs uppercase tracking-wider">
                      Email Addresses
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                      {COMPANY_DETAILS.emails.map((m) => (
                        <a
                          key={m}
                          href={`mailto:${m}`}
                          className="text-slate-600 hover:text-[#2563EB]"
                        >
                          {m}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#0B0F19] text-xs uppercase tracking-wider">
                      Website
                    </div>
                    <div className="text-slate-600 mt-1">
                      {COMPANY_DETAILS.website}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/94774638544?text=${encodeURIComponent("Hello Travels Feeder! I would like to make an inquiry.")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold tracking-wide transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>

                <a
                  href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0B0F19] hover:bg-slate-800 text-white rounded-full text-xs font-bold tracking-wide transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Call Now
                </a>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-xs flex items-center gap-3.5">
              <Clock className="w-6 h-6 text-[#2563EB]" />
              <div className="text-xs text-slate-600">
                <strong className="text-[#0B0F19] block">24/7 Travel Operation</strong>
                Stationed at Bandaranaike International Airport (CMB)
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-10 border border-slate-100 shadow-xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4 border border-emerald-100">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0B0F19]">
                    Thank You, {fullName}!
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                    Your inquiry has been logged. Our travel consultants will reach out to you directly via email or WhatsApp within a few hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#0B0F19] mb-4">
                    Send Travel Enquiry
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. David Miller"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="david@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp <span className="text-[#E53935]">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+94 77 000 0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travel Type
                      </label>
                      <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] cursor-pointer"
                      >
                        {travelTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Target Destination
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sri Lanka"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travel Date
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Number of Travelers
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message / Special Requests
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Please share flight preferences, desired hotel category, safari wishes, or any dietary and physical requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide shadow-sm hover:shadow transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Send Enquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
