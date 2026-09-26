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

/* ─── Constants (defined outside component to avoid re-creation) ── */

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
    color: 'sky',
    label: 'IATA Accredited',
  },
  {
    icon: Globe,
    color: 'emerald',
    label: '24/7 Support',
  },
] as const;

/* ─── Tiny reusable helpers ─────────────────────────────────────── */

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
    <span className="text-2xl font-semibold text-white tracking-[-0.04em] leading-none">
      {value}
    </span>
    <span className="text-[10px] font-medium text-white/40 uppercase tracking-[0.16em] mt-1">
      {label}
    </span>
  </motion.div>
));
AnimatedStat.displayName = 'AnimatedStat';

/* ─── Sub-components (memoized) ─────────────────────────────────── */

const BackgroundLayers = memo(
  ({ overlayOpacity }: { overlayOpacity: ReturnType<typeof useTransform> }) => (
    <>
      {/* Layered overlay */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/95 via-[#060608]/70 to-[#060608]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608]/90 via-transparent to-[#060608]/40" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#060608]/60 to-transparent" />
        <div className="absolute inset-0 bg-blue-950/15 mix-blend-multiply" />
      </motion.div>

      {/* Ambient glow orbs — no JS, pure CSS */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute -left-32 top-1/3 w-[600px] h-[600px] rounded-full bg-blue-700/8 blur-[140px] will-change-auto" />
        <div className="absolute left-1/4 bottom-0 w-[400px] h-[300px] rounded-full bg-red-700/10 blur-[120px] will-change-auto" />
      </div>
    </>
  )
);
BackgroundLayers.displayName = 'BackgroundLayers';

const DestinationCard = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(12px)' }}
    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
    transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6, transition: { duration: 0.4, ease: 'easeOut' } }}
    className="absolute bottom-0 right-0 w-[290px] z-20 will-change-transform"
  >
    <div className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] bg-black/30 backdrop-blur-3xl">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={sigiriyaImg}
          alt="Sigiriya Rock — Sri Lanka"
          className="w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
          draggable={false}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {/* Trending badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[9.5px] font-semibold text-white tracking-[0.12em] uppercase">
            Trending
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-white/40 mb-0.5">
              Island Escape
            </p>
            <h3 className="text-[16px] font-semibold text-white tracking-[-0.02em] leading-tight">
              Sri Lanka
            </h3>
          </div>
          <div className="shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/15">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
            <span className="text-[11px] font-semibold text-white">4.9</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-white/30 shrink-0" />
          <span className="text-[11px] text-white/40 font-medium">
            Sigiriya · Galle · Ella · Kandy
          </span>
        </div>

        <div className="pt-1 flex items-center justify-between border-t border-white/8">
          <div>
            <p className="text-[9px] text-white/30 font-medium uppercase tracking-[0.12em]">
              From
            </p>
            <p className="text-[15px] font-semibold text-white tracking-[-0.02em]">
              $1,290
              <span className="text-[11px] text-white/40 font-normal ml-1">/ person</span>
            </p>
          </div>
          <Link
            to="/packages"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-[11.5px] font-semibold text-white transition-colors duration-200"
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
    initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    transition={{ delay: 0.75, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -4, transition: { duration: 0.3 } }}
    className="absolute top-6 right-10 z-20 will-change-transform bg-black/35 backdrop-blur-3xl px-5 py-4 rounded-2xl border border-white/10 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] flex items-center gap-3.5"
  >
    <div className="w-11 h-11 rounded-[14px] bg-sky-500/15 border border-sky-400/20 flex items-center justify-center shrink-0">
      <Compass className="w-5 h-5 text-sky-400" />
    </div>
    <div>
      <p className="text-[13px] font-semibold text-white tracking-[-0.02em]">
        Airport Concierge
      </p>
      <p className="text-[11px] text-white/45 font-medium mt-0.5">CMB · 24 / 7 Team</p>
    </div>
  </motion.div>
));
ConciergeCard.displayName = 'ConciergeCard';

const FlightTickerCard = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -24, filter: 'blur(8px)' }}
    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
    transition={{ delay: 0.9, duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="absolute top-[38%] -left-6 z-20 will-change-transform bg-black/40 backdrop-blur-3xl px-4 py-3.5 rounded-2xl border border-white/10 shadow-[0_20px_48px_-8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
  >
    <p className="text-[9px] font-semibold tracking-[0.18em] uppercase text-white/35 mb-2">
      Live Route
    </p>
    <div className="flex items-center gap-3">
      <div className="text-center">
        <p className="text-[17px] font-semibold text-white tracking-[-0.03em] leading-none">CMB</p>
        <p className="text-[9px] text-white/35 font-medium mt-0.5">Colombo</p>
      </div>
      <div className="flex flex-col items-center gap-1 px-1">
        <div className="h-px w-14 bg-gradient-to-r from-white/20 via-white/50 to-white/20" />
        <Plane className="w-3 h-3 text-sky-400 -mt-2.5" />
      </div>
      <div className="text-center">
        <p className="text-[17px] font-semibold text-white tracking-[-0.03em] leading-none">DXB</p>
        <p className="text-[9px] text-white/35 font-medium mt-0.5">Dubai</p>
      </div>
    </div>
    <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-white/8">
      <Clock className="w-2.5 h-2.5 text-white/30" />
      <span className="text-[10px] text-white/40 font-medium">4h 15m · Daily departures</span>
    </div>
  </motion.div>
));
FlightTickerCard.displayName = 'FlightTickerCard';

const StatsRow = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ delay: 1.05, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    className="absolute bottom-8 left-0 z-20 flex items-center gap-6 bg-black/30 backdrop-blur-3xl px-5 py-3.5 rounded-2xl border border-white/8 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.06)]"
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

const BottomBar = memo(() => (
  <div className="absolute bottom-0 inset-x-0 z-10 border-t border-white/[0.04]">
    <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex items-center justify-between">
      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden sm:flex items-center gap-3"
      >
        <div className="w-[1.5px] h-7 rounded-full bg-white/15 overflow-hidden relative">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 0.4,
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white/60 to-transparent rounded-full"
          />
        </div>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/25">
          Scroll
        </span>
      </motion.div>

      {/* Page indicator dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5"
      >
        {[true, false, false].map((active, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-300 ${
              active ? 'w-5 h-[3px] bg-white/60' : 'w-[3px] h-[3px] bg-white/20'
            }`}
          />
        ))}
      </motion.div>

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden sm:block text-[10px] font-medium tracking-[0.2em] uppercase text-white/20"
      >
        01 — Home
      </motion.p>
    </div>
  </div>
));
BottomBar.displayName = 'BottomBar';

/* ─── Main component ────────────────────────────────────────────── */
export const Hero: React.FC = () => {
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const springImgY = useSpring(imgY, SPRING_CONFIG);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[680px] max-h-[1100px] flex items-center overflow-hidden bg-[#060608]"
    >
      {/* ── Parallax hero image ── */}
      <motion.div
        style={{ y: springImgY }}
        className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform"
      >
        <motion.img
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          src={heroFlightImg}
          alt="Travels Feeder — luxury flight above clouds"
          className="w-full h-full object-cover object-center"
          draggable={false}
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* ── Background overlays & orbs ── */}
      <BackgroundLayers overlayOpacity={overlayOpacity} />

      {/* ── Main content grid ── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-16 will-change-transform"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">

          {/* ── Left column ── */}
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate="show"
            className="lg:col-span-7 xl:col-span-6 space-y-7 sm:space-y-9 mt-10"
          >
            {/* Headline */}
            <div className="space-y-1 sm:space-y-2">
              <motion.h1
                variants={LINE_VARIANTS}
                className="text-[3.2rem] leading-[0.98] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem] font-bold text-white tracking-[-0.045em]"
              >
                Fly Further.
              </motion.h1>

              <motion.h1
                variants={LINE_VARIANTS}
                className="text-[3.2rem] leading-[0.98] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem] font-bold tracking-[-0.045em]"
              >
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(110deg, #f87171 0%, #ef4444 30%, #dc2626 55%, #f97316 100%)',
                  }}
                >
                  Travel Deeper.
                </span>
              </motion.h1>

              <motion.h1
                variants={LINE_VARIANTS}
                className="text-[3.2rem] leading-[0.98] sm:text-[4.5rem] lg:text-[5rem] xl:text-[6rem] font-semibold text-white/20 tracking-[-0.045em]"
              >
                Live Fully.
              </motion.h1>
            </div>

            {/* Descriptor */}
            <motion.p
              variants={LINE_VARIANTS}
              className="text-[15px] sm:text-[17px] text-white/55 leading-[1.75] max-w-[480px] font-normal tracking-[-0.01em]"
            >
              From seamless worldwide air travel to unforgettable Sri Lankan
              adventures — flights, bespoke tours, and curated experiences{' '}
              <em className="text-white/75 not-italic font-medium">seamlessly unified.</em>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={LINE_VARIANTS}
              className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1"
            >
              <Link
                to="/packages"
                className="group relative inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-[#060608] text-[13.5px] font-semibold tracking-[-0.01em] transition-all duration-300 hover:bg-white/90 active:scale-[0.97] shadow-[0_8px_32px_rgba(255,255,255,0.18)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.28)] overflow-hidden"
              >
                <motion.span
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '200%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                />
                Explore Packages
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => openEnquiry({ service: 'Air Ticket / Flights' })}
                className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.07] hover:bg-white/[0.12] active:scale-[0.97] text-white border border-white/[0.15] hover:border-white/25 text-[13.5px] font-semibold tracking-[-0.01em] transition-all duration-300 backdrop-blur-xl cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <Plane className="w-4 h-4 text-sky-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                Book a Flight
              </button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={LINE_VARIANTS}
              className="pt-4 sm:pt-6 flex flex-wrap items-center gap-x-5 gap-y-3"
            >
              {TRUST_ITEMS.map(({ icon: Icon, color, label }, i) => (
                <React.Fragment key={label}>
                  {i > 0 && <Divider />}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-6 h-6 rounded-full bg-${color}-500/15 border border-${color}-400/20`}
                    >
                      <Icon className={`w-3 h-3 text-${color}-400`} />
                    </div>
                    <span className="text-[12px] font-medium text-white/50 tracking-[-0.01em]">
                      {label}
                    </span>
                  </div>
                </React.Fragment>
              ))}

              <Divider />

              {/* Stars rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center -space-x-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[12px] font-medium text-white/50 tracking-[-0.01em]">
                  4.9 · 2,400+ reviews
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: cards ── */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 items-center justify-end relative h-[520px]">
            <DestinationCard />
            <ConciergeCard />
            <FlightTickerCard />
            <StatsRow />
          </div>
        </div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <BottomBar />
    </section>
  );
};