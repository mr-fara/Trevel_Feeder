import React, { useState } from 'react';
import { Plane, CheckCircle2, ShieldCheck, Clock, MapPin, Users, Car, Send } from 'lucide-react';
import { COMPANY_DETAILS } from '../data/travelData';
import {apiPost} from '../lib/api';

export const TransfersPage: React.FC = () => {
  const [arrivalAirport, setArrivalAirport] = useState('Colombo Bandaranaike Intl (CMB)');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan (1-3 passengers)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await apiPost('/api/transfers', {
        airport: arrivalAirport,
        destination,
        arrivalDate,
        arrivalTime,
        flightNumber,
        passengers: Number(passengers),
        vehicleType,
        fullName: name,
        email,
        phone,
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not submit your transfer request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const transferOptions = [
    { title: "Airport Pickup & Meet-and-Greet", desc: "Paging board greeting inside the arrival hall, baggage handling, and seamless direct escort to your vehicle." },
    { title: "Inter-City Hotel Transfers", desc: "Door-to-door private transfers linking Colombo, Negombo, Kandy, Galle, Bentota, Nuwara Eliya, and Ella." },
    { title: "VIP Executive Transfers", desc: "Luxury Mercedes-Benz and SUV options for business executives, delegates, and honeymoon arrivals." },
    { title: "Group & Event Coaches", desc: "Air-conditioned 14–45 seat luxury tourist coaches for tour groups, wedding parties, and delegations." }
  ];

  return (
    <main className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            24/7 Ground Transportation
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Arrive. Relax. We'll Handle the Rest.
          </h1>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Avoid airport stress and taxi queues. Our dedicated airport team greets you on arrival with comfortable, air-conditioned transport straight to your hotel or villa anywhere across Sri Lanka.
          </p>
        </div>

        {/* 4 Transfer Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {transferOptions.map((opt) => (
            <div key={opt.title} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#2563EB] flex items-center justify-center mb-4">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#0B0F19]">
                {opt.title}
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {opt.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Dedicated Transfer Request Form */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl sm:rounded-[36px] p-6 sm:p-12 border border-slate-100 shadow-xl">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B0F19]">
                Transfer Request Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mt-2">
                Our airport dispatch manager will confirm your chauffeur assignment and dispatch instructions shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold"
              >
                Book Another Transfer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-[#0B0F19]">
                  Book Airport Transfer
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Fixed pricing, toll inclusive, complimentary waiting time for flight delays.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pickup Airport
                  </label>
                  <input
                    type="text"
                    value={arrivalAirport}
                    onChange={(e) => setArrivalAirport(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination (Hotel or City) <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Heritance Kandalama / Galle Fort"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Arrival Date <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Flight Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UL 504 / EK 648"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer"
                  >
                    <option value="Sedan (1-3 passengers)">Sedan (1-3 passengers)</option>
                    <option value="SUV (1-4 passengers)">SUV (1-4 passengers)</option>
                    <option value="High-Roof Van (4-8 passengers)">High-Roof Van (4-8 passengers)</option>
                    <option value="Minibus (9-14 passengers)">Minibus (9-14 passengers)</option>
                    <option value="Luxury VIP Mercedes">Luxury VIP Mercedes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Sarah Miller"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Phone <span className="text-[#E53935]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 555 019 2831"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="pt-3">
                {submitError && <p role="alert" className="mb-3 text-sm text-red-700">{submitError}</p>}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#2563EB] hover:bg-[#0F3B82] text-white rounded-full font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  {isSubmitting ? 'Sending...' : 'Request Transfer'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};
