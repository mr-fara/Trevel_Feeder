import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Globe, Plane, Award } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/travelData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0F19] text-white pt-16 sm:pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Brand & Accreditation Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="max-w-xl">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-lg bg-[#E53935] flex items-center justify-center text-white font-black text-lg">
                TF
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  TRAVELS <span className="text-[#E53935]">FEEDER</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
                  Air Tickets, Inbound & Worldwide Tours
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm mt-3 leading-relaxed">
              "{COMPANY_DETAILS.tagline}" — A premier Sri Lankan travel agency delivering seamless international air ticketing, island tour programmes, wildlife safaris, and personalized luxury travel experiences.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
              <Award className="w-6 h-6 text-[#2563EB]" />
              <div>
                <div className="text-xs font-bold text-white tracking-wide">{COMPANY_DETAILS.accreditation}</div>
                <div className="text-[11px] text-slate-400">Global Airline Ticketing</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-xs font-bold text-white tracking-wide">24/7 Operations</div>
                <div className="text-[11px] text-slate-400">Bandaranaike Airport Team</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10">
          {/* Explore */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">Holiday Packages</Link></li>
              <li><Link to="/gallery" className="hover:text-white transition-colors">Photo Gallery</Link></li>
              <li><Link to="/testimonials" className="hover:text-white transition-colors">Client Testimonials</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/flights" className="hover:text-white transition-colors">Air Ticketing</Link></li>
              <li><Link to="/visa" className="hover:text-white transition-colors">Visa & Travel Support</Link></li>
              <li><Link to="/accommodation" className="hover:text-white transition-colors">Accommodation</Link></li>
              <li><Link to="/transfers" className="hover:text-white transition-colors">Airport Transfers</Link></li>
              <li><Link to="/safari" className="hover:text-white transition-colors">Safari Journeys</Link></li>
              <li><Link to="/car-rental" className="hover:text-white transition-colors">Car Rental</Link></li>
            </ul>
          </div>

          {/* Travel Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Travel Programs
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><Link to="/destinations" className="hover:text-white transition-colors">Sri Lanka Inbound</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">Worldwide Holidays</Link></li>
              <li><Link to="/safari" className="hover:text-white transition-colors">Wildlife Expeditions</Link></li>
              <li><Link to="/packages" className="hover:text-white transition-colors">Hill Country Escapes</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Guides & Naturalists</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Bespoke Travel Planning</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Head Office
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed text-slate-400">
                  {COMPANY_DETAILS.address}
                </span>
              </div>

              <div className="flex flex-col gap-1 pt-1">
                {COMPANY_DETAILS.phones.map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="flex items-center gap-2 text-xs font-semibold text-white hover:text-[#E53935] transition-colors tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
                    {phone.display}
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-1 pt-1">
                {COMPANY_DETAILS.emails.map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {email}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 {COMPANY_DETAILS.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Booking</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Support & Inquiries</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
