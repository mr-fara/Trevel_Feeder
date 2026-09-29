import React, { useState } from 'react';
import { Plane, ArrowRight, ShieldCheck, Clock, Check, FileText, Globe, ArrowRightLeft, Sparkles } from 'lucide-react';
import heroFlightImg from '../assets/images/hero_flight_travel_1790443248215.jpg';
import { useEnquiry } from '../context/EnquiryContext';
import {COMPANY_DETAILS, FLIGHT_ROUTES} from '../data/travelData';

export const FlightsPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  const [fromCity, setFromCity] = useState('Colombo (CMB)');
  const [toCity, setToCity] = useState('London Heathrow (LHR)');
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [departDate, setDepartDate] = useState('2026-10-20');
  const [returnDate, setReturnDate] = useState('2026-11-05');
  const [cabin, setCabin] = useState('Economy');
  const [passengers, setPassengers] = useState('2 Passengers');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    openEnquiry({
      service: 'Air Ticket / Flights',
      destination: `${fromCity} to ${toCity}`,
      travelDate: departDate,
      returnDate: tripType === 'round' ? returnDate : undefined,
      passengers: passengers,
      tripType: cabin,
      notes: `Flight Quotation Request: ${fromCity} -> ${toCity}. Type: ${tripType.toUpperCase()}. Cabin: ${cabin}.`
    });
  };

  return (
    <main className="bg-[#F7F9FC]">
      {/* Editorial Aviation Hero */}
      <section className="relative mt-10 py-20 sm:py-28 bg-[#0B0F19] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src={heroFlightImg}
            alt="Aircraft flying above clouds"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider uppercase mb-4 border border-blue-400/20">
              <Plane className="w-3.5 h-3.5 text-[#2563EB]" />
              IATA Accredited Air Ticketing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
              Fly Anywhere. <br />
              <span className="text-[#E53935]">Travel With Confidence.</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed">
              Global airline reservations, corporate flight management, urgent ticket re-issuing, and seamless Sri Lankan domestic transfers.
            </p>
          </div>
        </div>
      </section>

      {/* Flight Search Quotation Box */}
      <section className="relative -mt-12 z-20 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-100">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  tripType === 'round' ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneway')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  tripType === 'oneway' ? 'bg-[#2563EB] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                One Way
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Cabin:
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="ml-2 font-bold text-[#0B0F19] bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Economy">Economy</option>
                <option value="Premium Economy">Premium Economy</option>
                <option value="Business">Business Class</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <form onSubmit={handleSearch} className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-3 bg-slate-50 rounded-2xl p-3 border border-slate-200">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Flying From
                </label>
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#0B0F19] focus:outline-none"
                />
              </div>

              <div className="hidden md:flex justify-center md:col-span-1">
                <button
                  type="button"
                  onClick={() => {
                    const temp = fromCity;
                    setFromCity(toCity);
                    setToCity(temp);
                  }}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="md:col-span-3 bg-slate-50 rounded-2xl p-3 border border-slate-200">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Flying To
                </label>
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-[#0B0F19] focus:outline-none"
                />
              </div>

              <div className="md:col-span-3 grid grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Departure
                  </label>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#0B0F19] focus:outline-none"
                  />
                </div>
                <div className={`bg-slate-50 rounded-2xl p-3 border border-slate-200 ${tripType === 'oneway' ? 'opacity-40 pointer-events-none' : ''}`}>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Return
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    disabled={tripType === 'oneway'}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#0B0F19] focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-[58px] bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-2xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plane className="w-4 h-4" />
                  Request Quote
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* Popular Flight Routes Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-wider uppercase text-[#2563EB]">
            Popular Connections
          </span>
          <h2 className="text-3xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
            Top International Routes
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Regular departures between Colombo and key global hubs with competitive IATA fare classes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FLIGHT_ROUTES.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{route.duration}</span>
                  <span className="text-emerald-600 font-semibold">{route.note}</span>
                </div>
                <div className="mt-3 font-bold text-sm text-[#0B0F19]">
                  {route.from}
                </div>
                <div className="text-slate-400 text-xs py-0.5">↓</div>
                <div className="font-bold text-sm text-[#0B0F19]">
                  {route.to}
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">IATA Best Rate</span>
                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Air Ticket / Flights',
                      destination: `${route.from} to ${route.to}`,
                      notes: `Inquiring for flight routing: ${route.from} to ${route.to}.`
                    })
                  }
                  className="text-xs font-bold text-[#E53935] hover:text-[#B91C1C] cursor-pointer"
                >
                  Get Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cabin Classes & Travel Support */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F7F9FC] rounded-3xl p-8 border border-slate-100">
              <Sparkles className="w-7 h-7 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold text-[#0B0F19]">Business & First Class</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Lie-flat beds, lounge access, fast-track security, premium champagne dining, and generous baggage allowances on premier global carriers.
              </p>
            </div>

            <div className="bg-[#F7F9FC] rounded-3xl p-8 border border-slate-100">
              <Globe className="w-7 h-7 text-[#2563EB] mb-4" />
              <h3 className="text-xl font-bold text-[#0B0F19]">Economy & Flexible Fares</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Competitive group and family fares, flexible ticket changes, extra legroom seating, and dedicated customer service when schedules change.
              </p>
            </div>

            <div className="bg-[#F7F9FC] rounded-3xl p-8 border border-slate-100">
              <FileText className="w-7 h-7 text-emerald-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0B0F19]">Visa & Documentation</h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Comprehensive visa checking, transit permit advisories, and electronic travel authorization support for seamless entry to any destination.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
