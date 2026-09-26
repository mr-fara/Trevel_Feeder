import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plane,
  Hotel,
  Compass,
  Car,
  Calendar,
  Users,
  ArrowRightLeft,
  Search,
  ChevronDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useEnquiry } from '../../context/EnquiryContext';

type TabType = 'flights' | 'hotels' | 'tours' | 'transfers';
type TripType = 'round' | 'oneway' | 'multi';

interface TabItem {
  id: TabType;
  label: string;
  mobileLabel: string;
  icon: React.ElementType;
}

const TABS: TabItem[] = [
  { id: 'flights', label: 'Flights & Air Tickets', mobileLabel: 'Flights', icon: Plane },
  { id: 'hotels', label: 'Hotels & Resorts', mobileLabel: 'Stays', icon: Hotel },
  { id: 'tours', label: 'Sri Lanka & World Tours', mobileLabel: 'Tours', icon: Compass },
  { id: 'transfers', label: 'Airport Transfers', mobileLabel: 'Transfers', icon: Car },
];

export const FlightSearchCard: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  const [activeTab, setActiveTab] = useState<TabType>('flights');
  const [tripType, setTripType] = useState<TripType>('round');
  const [origin, setOrigin] = useState('Colombo (CMB)');
  const [destination, setDestination] = useState('London Heathrow (LHR)');
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('2026-10-25');
  const [travellers, setTravellers] = useState('2 Travellers');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [isSwapping, setIsSwapping] = useState(false);

  // Smooth origin/destination swap
  const handleSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setOrigin(destination);
      setDestination(origin);
      setIsSwapping(false);
    }, 150);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'flights') {
      openEnquiry({
        service: 'Air Ticket / Flights',
        destination: `${origin} → ${destination} (${tripType === 'round' ? 'Round Trip' : tripType === 'oneway' ? 'One Way' : 'Multi-City'})`,
        travelDate: departureDate,
        returnDate: tripType === 'round' ? returnDate : undefined,
        passengers: travellers,
        tripType: cabinClass,
        notes: `Cabin: ${cabinClass}. Routing: ${origin} to ${destination}. Passengers: ${travellers}.`
      });
    } else if (activeTab === 'hotels') {
      openEnquiry({
        service: 'Accommodation',
        destination: destination || 'Sri Lanka Luxury Resort',
        travelDate: departureDate,
        returnDate: returnDate,
        passengers: travellers,
        notes: `Check-in: ${departureDate}, Check-out: ${returnDate}. Guests: ${travellers}.`
      });
    } else if (activeTab === 'tours') {
      openEnquiry({
        service: 'Sri Lanka Tour',
        destination: destination || 'Sri Lanka Inbound Explorer',
        travelDate: departureDate,
        passengers: travellers,
        notes: `Tour start: ${departureDate}. Travellers: ${travellers}.`
      });
    } else {
      openEnquiry({
        service: 'Airport Transfer',
        destination: `${origin} to ${destination || 'Hotel / Destination'}`,
        travelDate: departureDate,
        passengers: travellers,
        notes: `Transfer Date: ${departureDate}. Pick-up: ${origin}. Drop-off: ${destination}. Passengers: ${travellers}.`
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative -mt-10 z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Outer Card with Frosted Glass Layering */}
      <div className="relative bg-white/95 backdrop-blur-2xl rounded-[28px] sm:rounded-[36px] p-4 sm:p-7 lg:p-8 shadow-[0_24px_70px_-15px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.05]">
        
        {/* ────────── 1. SEGMENTED TABS ────────── */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F5F6F8] rounded-2xl overflow-x-auto scrollbar-none">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl text-[13px] font-medium tracking-[-0.01em] transition-all whitespace-nowrap cursor-pointer flex-1 sm:flex-initial ${
                  isActive ? 'text-[#0A0A0A]' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{ type: 'spring', damping: 26, stiffness: 350 }}
                    className="absolute inset-0 bg-white rounded-xl sm:rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.04]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.mobileLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* ────────── 2. SUB-CONTROLS BAR ────────── */}
        <div className="pt-5 pb-4 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-100/80">
          {activeTab === 'flights' ? (
            /* Apple-Style Segmented Pill for Trip Type */
            <div className="inline-flex items-center p-0.5 bg-[#F5F6F8] rounded-xl ring-1 ring-black/[0.02]">
              {(['round', 'oneway', 'multi'] as const).map((type) => {
                const isSelected = tripType === type;
                const label = type === 'round' ? 'Round Trip' : type === 'oneway' ? 'One Way' : 'Multi-City';

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTripType(type)}
                    className={`relative px-3 sm:px-4 py-1.5 rounded-[10px] text-[12px] font-medium tracking-[-0.01em] transition-all cursor-pointer ${
                      isSelected ? 'text-[#0A0A0A]' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeTripType"
                        transition={{ type: 'spring', damping: 25, stiffness: 380 }}
                        className="absolute inset-0 bg-white rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]"
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500 font-medium text-[12px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Tailored rates & personalized concierge included</span>
            </div>
          )}

          {/* Right Selectors: Cabin & Passengers */}
          <div className="flex items-center gap-4 sm:gap-6 text-slate-600 ml-auto">
            {/* Passengers Selector */}
            <div className="relative flex items-center gap-1.5 cursor-pointer group">
              <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              <select
                value={travellers}
                onChange={(e) => setTravellers(e.target.value)}
                className="bg-transparent text-[12px] font-medium text-[#0A0A0A] hover:text-blue-600 focus:outline-none cursor-pointer pr-4 appearance-none tracking-[-0.01em]"
              >
                <option value="1 Solo Traveller">1 Traveller</option>
                <option value="2 Travellers">2 Travellers</option>
                <option value="3-4 Travellers">3-4 Travellers</option>
                <option value="5-8 Travellers">5-8 Travellers</option>
                <option value="9+ Travellers">9+ Group</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-0 pointer-events-none group-hover:text-slate-600 transition-colors" />
            </div>

            {/* Cabin Class (Flights Only) */}
            {activeTab === 'flights' && (
              <div className="relative flex items-center gap-1.5 cursor-pointer group">
                <span className="text-[12px] text-slate-400 font-normal">Class:</span>
                <select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  className="bg-transparent text-[12px] font-medium text-[#0A0A0A] hover:text-blue-600 focus:outline-none cursor-pointer pr-4 appearance-none tracking-[-0.01em]"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business Class</option>
                  <option value="First Class">First Class</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-0 pointer-events-none group-hover:text-slate-600 transition-colors" />
              </div>
            )}
          </div>
        </div>

        {/* ────────── 3. SEARCH FORM INPUTS ────────── */}
        <form onSubmit={handleSearch} className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">
            
            {/* Origin & Destination Container */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-0 bg-[#F5F6F8] rounded-2xl sm:rounded-3xl p-1.5 ring-1 ring-black/[0.02]">
              {/* Origin */}
              <div className="flex-1 bg-white sm:bg-transparent hover:bg-white focus-within:bg-white rounded-xl sm:rounded-2xl p-3 sm:py-3 sm:px-4 transition-all duration-200 focus-within:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                  {activeTab === 'transfers' ? 'Pick-up Point' : 'From / Origin'}
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="City or Airport"
                  className="w-full bg-transparent text-[14px] sm:text-[15px] font-semibold text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none tracking-[-0.01em] pt-0.5 truncate"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2 sm:my-0 sm:-mx-2 z-10">
                <motion.button
                  type="button"
                  onClick={handleSwap}
                  animate={{ rotate: isSwapping ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-50 text-slate-500 hover:text-[#0A0A0A] shadow-[0_2px_6px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] flex items-center justify-center cursor-pointer transition-colors active:scale-95"
                  title="Swap Origin and Destination"
                  aria-label="Swap origin and destination"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                </motion.button>
              </div>

              {/* Destination */}
              <div className="flex-1 bg-white sm:bg-transparent hover:bg-white focus-within:bg-white rounded-xl sm:rounded-2xl p-3 sm:py-3 sm:px-4 transition-all duration-200 focus-within:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                  {activeTab === 'hotels' ? 'Destination / Hotel' : activeTab === 'tours' ? 'Tour Route' : 'To / Destination'}
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder={activeTab === 'hotels' ? 'e.g. Bentota Beach' : activeTab === 'tours' ? 'e.g. Cultural Triangle' : 'City or Airport'}
                  className="w-full bg-transparent text-[14px] sm:text-[15px] font-semibold text-[#0A0A0A] placeholder:text-slate-400 focus:outline-none tracking-[-0.01em] pt-0.5 truncate"
                />
              </div>
            </div>

            {/* Dates Container */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-2 bg-[#F5F6F8] rounded-2xl sm:rounded-3xl p-1.5 ring-1 ring-black/[0.02]">
              {/* Departure Date */}
              <div className="bg-white sm:bg-transparent hover:bg-white focus-within:bg-white rounded-xl sm:rounded-2xl p-3 sm:py-3 sm:px-4 transition-all duration-200 focus-within:shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                  {activeTab === 'hotels' ? 'Check-in' : 'Departure'}
                </label>
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full bg-transparent text-[13px] sm:text-[14px] font-semibold text-[#0A0A0A] focus:outline-none tracking-[-0.01em] cursor-pointer"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div
                className={`bg-white sm:bg-transparent hover:bg-white focus-within:bg-white rounded-xl sm:rounded-2xl p-3 sm:py-3 sm:px-4 transition-all duration-200 focus-within:shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${
                  tripType === 'oneway' && activeTab === 'flights' ? 'opacity-30 pointer-events-none' : ''
                }`}
              >
                <label className="block text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-400">
                  {activeTab === 'hotels' ? 'Check-out' : 'Return'}
                </label>
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="date"
                    value={returnDate}
                    disabled={tripType === 'oneway' && activeTab === 'flights'}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent text-[13px] sm:text-[14px] font-semibold text-[#0A0A0A] focus:outline-none tracking-[-0.01em] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Apple Obsidian CTA Search Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="group w-full h-full min-h-[54px] sm:min-h-[58px] bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-[0.98] text-white rounded-2xl sm:rounded-3xl font-medium text-[14px] tracking-[-0.01em] flex items-center justify-center gap-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_24px_-6px_rgba(0,0,0,0.25)] hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_14px_30px_-6px_rgba(0,0,0,0.32)] transition-all duration-200 cursor-pointer"
              >
                <Search className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </form>

        {/* ────────── 4. FOOTER TRUST STRIP ────────── */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[12px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-medium text-slate-700 tracking-[-0.01em]">
              Live IATA GDS Connected Rates
            </span>
            <span className="text-slate-300 hidden sm:inline">·</span>
            <span className="text-slate-500 hidden sm:inline">Zero hidden ticketing surcharges</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Dedicated 1-on-1 agent assistance</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};