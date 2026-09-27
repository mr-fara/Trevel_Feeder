import React, { useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from 'motion/react';
import {
  ArrowRight,
  Plane,
  ShieldCheck,
  Globe,
  Compass,
  Star,
  MapPin,
  Clock,
} from 'lucide-react';
import heroFlightImg from '../../assets/images/hero_flight_travel_1790443248215.jpg';
import sigiriyaImg from '../../assets/images/sigiriya_rock_sunrise_1790443260997.jpg';
import { useEnquiry } from '../../context/EnquiryContext';

/* ─── Constants ── */

const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const LINE_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const SPRING_CONFIG = { stiffness: 60, damping: 20 };

const STATS = [
  { value: '50K+', label: 'Travelers' },
  { value: '120+', label: 'Destinations' },
  { value: '16yr', label: 'Experience' },
];

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    label: 'IATA Accredited',
    containerClass: 'bg-sky-500/15 border-sky-400/20',
    iconClass: 'text-sky-400',
  },
  {
    icon: Globe,
    label: '24/7 Support',
    containerClass: 'bg-emerald-500/15 border-emerald-400/20',
    iconClass: 'text-emerald-400',
  },
];

/* ─── Reusable Helpers ── */

const Divider = memo(() => (
  <span className="hidden sm:block w-px h-3.5 bg-white/20 rounded-full" />
));
Divider.displayName = 'Divider';

const AnimatedStat = memo(({ value, label }: { value: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col"
  >
    <span className="text-xl lg:text-2xl font-semibold text-white tracking-tight leading-none">
      {value}
    </span>
    <span className="text-[9px] lg:text-[10px] font-medium text-white/40 uppercase tracking-widest mt-1">
      {label}
    </span>
  </motion.div>
));
AnimatedStat.displayName = 'AnimatedStat';

/* ─── Floating Cards (Perfectly Aligned) ── */

const DestinationCard = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(12px)' }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
    transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.4, ease: 'easeOut' } }}
    // Anchored center-right
    className="absolute top-1/2 -translate-y-1/2 right-0 xl:right-4 w-[290px] z-20 will-change-transform"
  >
    <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] bg-black/40 backdrop-blur-3xl">
      <div className="relative h-40 overflow-hidden group">
        <img
          src={sigiriyaImg}
          alt="Sigiriya Rock — Sri Lanka"
          className="w-full h-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
          draggable={false}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[9px] font-bold text-white tracking-widest uppercase">
            Trending
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">
              Island Escape
            </p>
            <h3 className="text-base font-semibold text-white tracking-tight leading-none">
              Sri Lanka
            </h3>
          </div>
          <div className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/15">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-semibold text-white">4.9</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          <MapPin className="w-3 h-3 text-white/30 shrink-0" />
          <span className="text-[11px] text-white/45 font-medium truncate">
            Sigiriya · Galle · Ella · Kandy
          </span>
        </div>

        <div className="pt-3 mt-1 flex items-center justify-between border-t border-white/10">
          <div>
            <p className="text-[9px] text-white/40 font-medium uppercase tracking-widest">
              From
            </p>
            <p className="text-sm font-semibold text-white tracking-tight">
              $1,290
              <span className="text-[10px] text-white/40 font-normal ml-1">/ person</span>
            </p>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[11px] font-semibold text-white transition-all duration-300"
          >
            View
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
));
DestinationCard.displayName = 'DestinationCard';

const ConciergeCard = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    transition={{ delay: 0.75, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    // Floating top right
    className="absolute top-4 right-[15%] xl:right-[20%] z-10 will-change-transform bg-black/45 backdrop-blur-3xl px-4 py-3.5 rounded-2xl border border-white/10 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.5)] flex items-center gap-3.5"
  >
    <div className="w-10 h-10 rounded-[12px] bg-sky-500/15 border border-sky-400/20 flex items-center justify-center shrink-0">
      <Compass className="w-4 h-4 text-sky-400" />
    </div>
    <div>
      <p className="text-xs font-semibold text-white tracking-tight">
        Airport Concierge
      </p>
      <p className="text-[10px] text-white/45 font-medium mt-0.5">CMB · 24/7 Team</p>
    </div>
  </motion.div>
));
ConciergeCard.displayName = 'ConciergeCard';

const FlightTickerCard = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    // Floating top left (cascades over the top left of destination card)
    className="absolute top-[18%] left-[-2%] xl:left-[-6%] z-30 will-change-transform bg-black/45 backdrop-blur-3xl px-4 py-3.5 rounded-2xl border border-white/10 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.5)]"
  >
    <p className="text-[9px] font-bold tracking-widest uppercase text-white/40 mb-2">
      Live Route
    </p>
    <div className="flex items-center gap-4">
      <div className="text-center">
        <p className="text-base font-semibold text-white tracking-tight leading-none">CMB</p>
        <p className="text-[9px] text-white/40 font-medium mt-1">Colombo</p>
      </div>
      <div className="flex flex-col items-center gap-1 px-1">
        <div className="h-px w-12 bg-gradient-to-r from-white/10 via-white/40 to-white/10" />
        <Plane className="w-3 h-3 text-sky-400 -mt-2.5" />
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-white tracking-tight leading-none">DXB</p>
        <p className="text-[9px] text-white/40 font-medium mt-1">Dubai</p>
      </div>
    </div>
    <div className="flex items-center gap-1.5 mt-3 pt-2.5 border-t border-white/10">
      <Clock className="w-2.5 h-2.5 text-white/30" />
      <span className="text-[9px] text-white/45 font-medium">4h 15m · Daily departures</span>
    </div>
  </motion.div>
));
FlightTickerCard.displayName = 'FlightTickerCard';

const StatsRow = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    // Floating bottom left (sits neatly below everything else)
    className="absolute bottom-6 left-[-2%] xl:left-[-6%] z-30 flex items-center gap-5 bg-black/45 backdrop-blur-3xl px-5 py-3.5 rounded-2xl border border-white/10 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.5)]"
  >
    {STATS.map((stat, i) => (
      <React.Fragment key={stat.label}>
        {i > 0 && <div className="w-px h-8 bg-white/10 rounded-full" />}
        <AnimatedStat value={stat.value} label={stat.label} />
      </React.Fragment>
    ))}
  </motion.div>
));
StatsRow.displayName = 'StatsRow';


/* ─── Main Component ── */

export const Hero: React.FC = () => {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const springImgY = useSpring(imgY, SPRING_CONFIG);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[700px] max-h-[1100px] flex items-center overflow-hidden bg-[#060608]"
    >
      {/* ── Parallax Background ── */}
      <motion.div
        style={{ y: springImgY }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
      >
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          src={heroFlightImg}
          alt="Travels Feeder — luxury flight above clouds"
          className="w-full h-full object-cover object-center"
          draggable={false}
          loading="eager"
        />
      </motion.div>

      {/* ── Overlays ── */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/95 via-[#060608]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-transparent to-[#060608]/40" />
      </motion.div>

      {/* ── Main Content Grid ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* ── Left Column: Typography & Actions ── */}
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 xl:col-span-6 space-y-8"
          >
            <div className="space-y-1">
              <motion.h1
                variants={LINE_VARIANTS}
                className="text-[3rem] leading-[1] sm:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-bold text-white tracking-tight"
              >
                Fly Further.
              </motion.h1>
              <motion.h1
                variants={LINE_VARIANTS}
                className="text-[3rem] leading-[1] sm:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-amber-500"
              >
                Travel Deeper.
              </motion.h1>
              <motion.h1
                variants={LINE_VARIANTS}
                className="text-[3rem] leading-[1] sm:text-[4.5rem] lg:text-[5rem] xl:text-[5.5rem] font-semibold text-white/20 tracking-tight"
              >
                Live Fully.
              </motion.h1>
            </div>

            <motion.p
              variants={LINE_VARIANTS}
              className="text-sm sm:text-base text-white/60 leading-relaxed max-w-[460px] font-normal"
            >
              From seamless worldwide air travel to unforgettable Sri Lankan
              adventures — flights, bespoke tours, and curated experiences{' '}
              <em className="text-white/80 not-italic font-medium">seamlessly unified.</em>
            </motion.p>

            <motion.div
              variants={LINE_VARIANTS}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to="/packages"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-[13px] font-bold tracking-wide transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.15)] overflow-hidden"
              >
                Explore Packages
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => openEnquiry({ service: 'Air Ticket / Flights' })}
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-[13px] font-bold tracking-wide transition-all duration-300 backdrop-blur-md"
              >
                <Plane className="w-4 h-4 text-sky-400" />
                Book a Flight
              </button>
            </motion.div>

            {/* Trust Strip */}
            <motion.div
              variants={LINE_VARIANTS}
              className="pt-6 flex flex-wrap items-center gap-5"
            >
              {TRUST_ITEMS.map((item, i) => (
                <React.Fragment key={item.label}>
                  {i > 0 && <Divider />}
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${item.containerClass}`}>
                      <item.icon className={`w-3 h-3 ${item.iconClass}`} />
                    </div>
                    <span className="text-[11px] font-medium text-white/50 tracking-wide uppercase">
                      {item.label}
                    </span>
                  </div>
                </React.Fragment>
              ))}
              <Divider />
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-medium text-white/50 tracking-wide uppercase">
                  4.9 · 2,400+ reviews
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Fixed Cascading Cards ── */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 relative w-full h-[600px] max-w-[500px] ml-auto">
            <DestinationCard />
            <ConciergeCard />
            <FlightTickerCard />
            <StatsRow />
          </div>

        </div>
      </motion.div>

      {/* ── Bottom Bar ── */}
      <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-[1.5px] h-6 rounded-full bg-white/20 overflow-hidden relative">
              <motion.div
                animate={{ y: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Scroll
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30"
          >
            01 — Home
          </motion.p>
        </div>
      </div>
    </section>
  );
};