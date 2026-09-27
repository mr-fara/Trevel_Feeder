import React from 'react';
import { Award, Clock, Users2, Globe2 } from 'lucide-react';
import { TRUST_POINTS } from '../../data/travelData';

// Refined high-end configuration with signature light-refraction characteristics
const TRUST_CONFIG = [
  {
    icon: Award,
    metric: '15+',
    metricLabel: 'Years',
    gradient: 'from-[#0071e3] to-[#4096ff]', // Apple Blue
    bgGlow: 'rgba(0,113,227,0.06)',
    iconBg: 'bg-blue-500/[0.06]',
    iconRing: 'ring-blue-500/10 hover:ring-blue-500/30',
    iconColor: 'text-[#0071e3]',
  },
  {
    icon: Clock,
    metric: '24/7',
    metricLabel: 'Support',
    gradient: 'from-[#00a862] to-[#29db80]', // Apple Green
    bgGlow: 'rgba(0,168,98,0.06)',
    iconBg: 'bg-emerald-500/[0.06]',
    iconRing: 'ring-emerald-500/10 hover:ring-emerald-500/30',
    iconColor: 'text-[#00a862]',
  },
  {
    icon: Users2,
    metric: '98%',
    metricLabel: 'Rating',
    gradient: 'from-[#ff9500] to-[#ffb340]', // Apple Gold
    bgGlow: 'rgba(255,149,0,0.06)',
    iconBg: 'bg-amber-500/[0.06]',
    iconRing: 'ring-amber-500/10 hover:ring-amber-500/30',
    iconColor: 'text-[#ff9500]',
  },
  {
    icon: Globe2,
    metric: '120+',
    metricLabel: 'Countries',
    gradient: 'from-[#ff375f] to-[#ff6482]', // Apple Pink
    bgGlow: 'rgba(255,55,95,0.06)',
    iconBg: 'bg-rose-500/[0.06]',
    iconRing: 'ring-rose-500/10 hover:ring-rose-500/30',
    iconColor: 'text-[#ff375f]',
  },
];

export const TrustIndicators: React.FC = () => {
  return (
    <section className="relative py-14 sm:py-24 lg:py-32 overflow-hidden bg-[#FBFBFD] antialiased">
      
      {/* Dynamic light refraction canvas in the background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft, structural backdrop blurs */}
        <div className="absolute -top-[10%] left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gradient-to-tr from-blue-300/10 to-indigo-300/10 blur-[80px] sm:blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-gradient-to-bl from-rose-200/10 to-amber-200/10 blur-[90px] sm:blur-[130px]" />
        
        {/* Apple-style fine grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Premium Glassmorphic Grid */}
        {/* grid-cols-2 for small phones, md:grid-cols-3 for tablets, lg:grid-cols-4 for desktops */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {TRUST_POINTS.slice(0, 4).map((pt, idx) => {
            const config = TRUST_CONFIG[idx % TRUST_CONFIG.length];
            const IconComponent = config.icon;

            return (
              <div
                key={pt.title || idx}
                className="group relative"
              >
                {/* Dynamic backdrop aura that activates on card hover */}
                <div 
                  className="absolute inset-4 rounded-2xl sm:rounded-[28px] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[20px] sm:blur-[32px] pointer-events-none"
                  style={{ backgroundColor: config.bgGlow }}
                />

                {/* Main Card Element (Multi-layered Light Glassmorphism) */}
                <div className="relative h-full flex flex-col p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-[28px] bg-white/[0.65] backdrop-blur-2xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.015),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] hover:border-white/90 hover:bg-white/85 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 overflow-hidden">
                  
                  {/* Subtle active state top lens-highlight line */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Top Row: Refined Lens & Metric */}
                  <div className="flex items-start justify-between mb-4 sm:mb-6 lg:mb-8">
                    {/* Icon Container with multi-layered specular highlights */}
                    <div className="relative">
                      {/* Outer shadow aura */}
                      <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]" />
                      
                      {/* Interactive ring element */}
                      <div className={`relative w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-white border border-slate-200/50 ring-2 sm:ring-4 ${config.iconRing} flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
                        {/* Dynamic glass color panel inside icon box */}
                        <div className={`absolute inset-0 ${config.iconBg} rounded-xl sm:rounded-2xl`} />
                        <IconComponent className={`relative w-4 h-4 sm:w-5 sm:h-5 ${config.iconColor} transition-transform duration-500 group-hover:scale-110`} strokeWidth={1.8} />
                      </div>
                    </div>

                    {/* Highly polished Metric presentation */}
                    <div className="text-right">
                      <div className={`text-base sm:text-xl lg:text-3xl font-bold tracking-tight bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent leading-none`}>
                        {config.metric}
                      </div>
                      <div className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mt-0.5 sm:mt-1.5">
                        {config.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Body Copy */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-slate-900 tracking-tight leading-snug mb-1 sm:mb-2 group-hover:text-black transition-colors duration-300 truncate sm:whitespace-normal">
                        {pt.title}
                      </h3>
                      
                      {/* Description with responsive line clamping */}
                      <p className="text-[11px] sm:text-[13px] lg:text-sm text-slate-500 leading-relaxed font-normal line-clamp-3 sm:line-clamp-none">
                        {pt.desc}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};