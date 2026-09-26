import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Plane, ShieldCheck, Clock, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS } from '../../data/travelData';
import { useEnquiry } from '../../context/EnquiryContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openEnquiry } = useEnquiry();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position on load
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Flights', path: '/flights' },
    { label: 'Packages', path: '/packages' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Services', path: '/services' },
    { label: 'Safari', path: '/safari' },
    { label: 'Gallery', path: '/gallery' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  /* ─── Adaptive Theme Logic ─── */
  // Only apply the transparent/white text theme IF we are on the home page AND haven't scrolled
  const isHomePage = location.pathname === '/';
  const isTransparentTheme = isHomePage && !isScrolled;

  const theme = {
    logoBox: isTransparentTheme ? 'bg-white text-[#060608]' : 'bg-[#E53935] text-white',
    logoText: isTransparentTheme ? 'text-white' : 'text-slate-900',
    logoSub: isTransparentTheme ? 'text-white/60' : 'text-slate-500',
    navLink: isTransparentTheme ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-slate-900',
    navLinkActive: isTransparentTheme ? 'text-white' : 'text-[#E53935]',
    navPill: isTransparentTheme ? 'bg-white/15' : 'bg-red-50',
    btnBg: isTransparentTheme ? 'bg-white text-[#060608] hover:bg-white/90' : 'bg-[#060608] text-white hover:bg-[#060608]/90',
    menuBtn: isTransparentTheme ? 'bg-white/10 text-white border-white/10' : 'bg-slate-100 text-slate-900 border-transparent hover:bg-slate-200',
  };

  /* ─── Mobile Menu Animation Variants ─── */
  const menuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20, filter: 'blur(8px)' },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: { delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col">
        {/* ══════════ TOP UTILITY BAR (Collapses on Scroll) ══════════ */}
        <motion.div
          initial={false}
          animate={{
            height: isScrolled ? 0 : 'auto',
            opacity: isScrolled ? 0 : 1,
            overflow: 'hidden',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`border-b transition-colors duration-500 ${
            isTransparentTheme 
              ? 'bg-black/30 backdrop-blur-md border-white/10' 
              : 'bg-[#060608] border-[#060608]' // Solid dark bg on inner pages so white text is readable
          }`}
        >
          <div className="max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-2 flex items-center justify-between text-[10.5px] font-medium tracking-wide text-white/70">
            <div className="flex items-center gap-2.5">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>{COMPANY_DETAILS.tagline}</span>
            </div>

            <div className="hidden sm:flex items-center gap-6">
              <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <Plane className="w-3 h-3 text-sky-400" /> Air Tickets
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Visa Assistance
              </span>
              <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-default">
                <Clock className="w-3 h-3 text-amber-400" /> 24/7 Support
              </span>
              <a
                href={`tel:${COMPANY_DETAILS.phones[0].raw}`}
                className="flex items-center gap-1.5 text-white hover:text-sky-400 transition-colors font-semibold"
              >
                <Phone className="w-3 h-3 text-sky-400" />
                {COMPANY_DETAILS.phones[0].display}
              </a>
            </div>
          </div>
        </motion.div>

        {/* ══════════ MAIN NAVBAR (Adaptive Glassmorphism) ══════════ */}
        <motion.div
          animate={{
            backgroundColor: isTransparentTheme ? 'rgba(0, 0, 0, 0)' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: isTransparentTheme ? 'blur(0px)' : 'blur(20px)',
            borderBottom: isTransparentTheme ? '1px solid rgba(255, 255, 255, 0)' : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: isTransparentTheme ? '0 0 0 rgba(0,0,0,0)' : '0 4px 30px rgba(0, 0, 0, 0.03)',
          }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="w-full relative z-50 transition-colors"
        >
          <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 h-16 sm:h-20 flex items-center justify-between">
            
            {/* Brand Logo */}
<Link to="/" className="flex items-center group outline-none" aria-label="Home">
  <img
    src="/image/logo.png"
    alt="Travels Feeder"
    className="h-12 w-auto object-contain transition-all duration-300 group-hover:scale-105 group-active:scale-95"
    draggable={false}
    loading="eager"
    decoding="async"
  />
</Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 relative">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-300 outline-none z-10 ${
                      active ? theme.navLinkActive : theme.navLink
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="navPill"
                        className={`absolute inset-0 rounded-full -z-10 transition-colors duration-300 ${theme.navPill}`}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Zone */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className={`hidden md:block text-[13px] font-semibold transition-colors duration-300 mr-2 ${
                  isTransparentTheme ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-[#E53935]'
                }`}
              >
                Contact
              </Link>
              
              {/* Premium Button */}
              <button
                onClick={() => openEnquiry({ service: 'Sri Lanka Tour' })}
                className={`hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-tight active:scale-95 transition-all duration-300 shadow-sm ${theme.btnBg}`}
              >
                Book Now
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden relative z-50 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border active:scale-95 transition-all duration-300 ${theme.menuBtn}`}
                aria-label="Toggle Menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* ══════════ FULLSCREEN MOBILE MENU (iOS Light Frosted Glass) ══════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl overflow-y-auto lg:hidden pt-28 pb-10 px-6 flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full gap-6">
              
              {/* Main Links */}
              <nav className="flex flex-col gap-4">
                {navLinks.map((link, i) => {
                  const active = isActive(link.path);
                  return (
                    <motion.div custom={i} variants={linkVariants} key={link.path}>
                      <Link
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-3xl font-bold tracking-tight transition-colors ${
                          active ? 'text-[#E53935]' : 'text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                className="w-full h-px bg-slate-200 my-4"
              />

              {/* Utility Links */}
              <div className="flex flex-col gap-4">
                {[
                  { l: 'Airport Transfers', p: '/transfers' },
                  { l: 'Accommodation', p: '/accommodation' },
                  { l: 'Car Rental', p: '/car-rental' },
                  { l: 'Visa & Travel', p: '/visa' }
                ].map((item, i) => (
                  <motion.div custom={navLinks.length + i + 1} variants={linkVariants} key={item.p}>
                    <Link onClick={() => setMobileMenuOpen(false)} to={item.p} className="flex items-center justify-between text-slate-500 hover:text-slate-900 font-medium transition-colors group">
                      <span className="text-lg">{item.l}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#E53935]" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <motion.div
              custom={navLinks.length + 5}
              variants={linkVariants}
              className="mt-12 max-w-sm mx-auto w-full space-y-3"
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openEnquiry({ service: 'Sri Lanka Tour' });
                }}
                className="w-full py-4 bg-[#060608] text-white rounded-full text-[15px] font-semibold tracking-tight active:scale-[0.98] transition-transform shadow-lg"
              >
                Plan Your Journey
              </button>

              <a
                href={`https://wa.me/94774638544?text=${encodeURIComponent("Hello Travels Feeder! I would like to inquire about your travel services.")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 bg-white text-slate-800 rounded-full text-[15px] font-semibold tracking-tight border border-slate-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                WhatsApp Us
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};