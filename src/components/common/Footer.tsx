import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/travelData';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Holiday Packages', path: '/packages' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
  ];

  const services = [
    { name: 'Air Ticketing', path: '/flights' },
    { name: 'Sri Lanka Tours', path: '/packages' },
    { name: 'Wildlife Safaris', path: '/safari' },
    { name: 'Airport Transfers', path: '/transfers' },
    { name: 'Car Rental', path: '/car-rental' },
    { name: 'Visa & Travel Support', path: '/visa' },
  ];

  return (
    <footer className="bg-[#0B0F19] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 py-12 sm:py-16">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[#E53935] flex items-center justify-center text-white text-sm font-bold">
                TF
              </div>
              <span className="text-lg sm:text-xl font-semibold tracking-tight">
                Travels <span className="text-[#E53935]">Feeder</span>
              </span>
            </Link>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
              A trusted Sri Lankan travel agency offering international air
              ticketing, tailor-made tours, wildlife safaris and worldwide
              holiday experiences.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-2.5">
              <a
                href={`tel:${COMPANY_DETAILS.phones[0]?.raw}`}
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-slate-500" />
                {COMPANY_DETAILS.phones[0]?.display}
              </a>

              <a
                href={`mailto:${COMPANY_DETAILS.emails[0]}`}
                className="flex items-center gap-2.5 text-sm text-slate-300 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                {COMPANY_DETAILS.emails[0]}
              </a>

              <div className="flex items-start gap-2.5 text-sm text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {COMPANY_DETAILS.address}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-medium text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-medium text-white mb-4">
              Our Services
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-300"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 border-t border-white/5">
          <p className="text-sm text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {COMPANY_DETAILS.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-5 text-sm">
            <Link
              to="/privacy-policy"
              className="text-slate-500 hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-and-conditions"
              className="text-slate-500 hover:text-white transition-colors duration-300"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/contact"
              className="text-slate-500 hover:text-white transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};