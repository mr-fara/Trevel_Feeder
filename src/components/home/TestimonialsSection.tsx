import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, Quote, BadgeCheck } from 'lucide-react';
import { TESTIMONIALS } from '../../data/travelData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((idx) => (idx === 0 ? TESTIMONIALS.length - 1 : idx - 1));
  }, []);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((idx) => (idx === TESTIMONIALS.length - 1 ? 0 : idx + 1));
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Auto-advance every 6s, pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const current = TESTIMONIALS[currentIndex];

  // Directional slide variants — Apple-style cinematic motion
  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 40, filter: 'blur(4px)' }),
    center: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: (dir: number) => ({ opacity: 0, x: dir * -40, filter: 'blur(4px)' }),
  };

  // Monogram initials from author name
  const initials = current.author
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <section className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-b from-white via-[#FAFBFD] to-[#F5F7FA] overflow-hidden">
      {/* Ambient Background Depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/30 to-transparent blur-3xl" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-red-100/25 to-transparent blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8">
        {/* ────────── Section Header ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xl ring-1 ring-black/[0.05] shadow-[0_1px_2px_rgba(0,0,0,0.04)] mb-5">
            <span className="flex -space-x-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 gap-1 fill-amber-400 text-amber-400" />
              ))}
            </span>
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-600">
              Client Experiences
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-semibold text-[#0A0A0A] tracking-[-0.03em] leading-[1.08] text-balance">
            Travelers who felt
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#E53935] via-[#EF4444] to-[#F97316] bg-clip-text text-transparent">
              {' '}the difference.
            </span>
          </h2>

          <p className="text-slate-500 text-[15px] sm:text-base mt-4 font-normal tracking-[-0.01em] leading-relaxed">
            Reflections from international travelers who explored the world with Travels Feeder.
          </p>
        </motion.div>

        {/* ────────── Carousel Card ────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative"
        >
          {/* Soft glow behind card */}
          <div className="absolute -inset-3 sm:-inset-5 bg-gradient-to-br from-red-100/20 via-transparent to-blue-100/20 rounded-[44px] blur-2xl" />

          <div className="relative bg-white/90 backdrop-blur-2xl rounded-[28px] sm:rounded-[40px] p-7 sm:p-12 lg:p-14 shadow-[0_24px_70px_-20px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.05] overflow-hidden">
            {/* Decorative oversized quote mark */}
            <Quote
              className="absolute -top-4 -right-4 sm:top-2 sm:right-6 w-28 h-28 sm:w-36 sm:h-36 text-slate-50 rotate-180"
              strokeWidth={1}
            />

            {/* Star Rating Row */}
            <div className="relative flex items-center gap-1 mb-6 sm:mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.span
                  key={`${current.id}-star-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * i, duration: 0.3, ease: 'backOut' }}
                >
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                </motion.span>
              ))}
            </div>

            {/* Sliding Quote Content */}
            <div className="relative min-h-[180px] sm:min-h-[160px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[17px] sm:text-[22px] lg:text-2xl font-normal text-[#0A0A0A] leading-[1.55] tracking-[-0.015em] max-w-3xl">
                    “{current.quote}”
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Author + Controls Footer */}
            <div className="relative mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              {/* Author Identity */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`author-${current.id}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3.5"
                >
                  {/* Monogram Avatar */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 text-white flex items-center justify-center text-[13px] font-semibold tracking-wide shrink-0 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.25)] ring-2 ring-white">
                    {initials}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[15px] font-semibold text-[#0A0A0A] tracking-[-0.01em]">
                        {current.author}
                      </span>
                      <BadgeCheck className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <div className="text-[12px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <span className="font-medium">{current.country}</span>
                      <span className="text-slate-300">·</span>
                      <span className="text-[#2563EB] font-medium">{current.tripType}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                {/* Progress Dots */}
                <div className="flex items-center gap-1.5 mr-1">
                  {TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goTo(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                      className="group p-1 cursor-pointer"
                    >
                      <motion.span
                        animate={{
                          width: idx === currentIndex ? 20 : 6,
                          backgroundColor: idx === currentIndex ? '#0A0A0A' : '#CBD5E1',
                        }}
                        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
                        className="block h-1.5 rounded-full group-hover:bg-slate-400"
                      />
                    </button>
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F5F6F8] hover:bg-slate-200/70 active:scale-95 flex items-center justify-center text-slate-600 hover:text-[#0A0A0A] transition-all cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-[18px] h-[18px]" strokeWidth={2.2} />
                  </button>

                  <button
                    onClick={next}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0A0A0A] hover:bg-[#1a1a1a] active:scale-95 flex items-center justify-center text-white transition-all shadow-[0_4px_14px_-4px_rgba(0,0,0,0.3)] cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-[18px] h-[18px]" strokeWidth={2.2} />
                  </button>
                </div>
              </div>
            </div>

            {/* Auto-advance progress bar */}
            {!isPaused && (
              <motion.div
                key={`progress-${current.id}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: 'linear' }}
                className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E53935] to-[#F97316] origin-left opacity-60"
              />
            )}
          </div>
        </motion.div>

        {/* ────────── Trust Footer Strip ────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] sm:text-[13px] text-slate-500"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-[#0A0A0A] tracking-[-0.02em]">4.9</span>
            <div className="flex flex-col leading-tight">
              <span className="flex -space-x-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </span>
              <span className="text-[10px] font-medium text-slate-400">Average rating</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-6 bg-slate-200" />

          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-[#0A0A0A] tracking-[-0.02em]">2,400+</span>
            <span className="text-[11px] font-medium text-slate-400 leading-tight">Verified<br />reviews</span>
          </div>

          <div className="hidden sm:block w-px h-6 bg-slate-200" />

          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold text-[#0A0A0A] tracking-[-0.02em]">40+</span>
            <span className="text-[11px] font-medium text-slate-400 leading-tight">Countries<br />served</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};