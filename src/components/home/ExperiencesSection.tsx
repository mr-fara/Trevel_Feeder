import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Waves, Sparkles, Mountain, Droplets, Compass } from 'lucide-react';
import ellaHillsImg from '../../assets/images/ella_tea_hills_1790443301054.jpg';
import yalaLeopardImg from '../../assets/images/yala_leopard_safari_1790443274802.jpg';
import luxuryResortImg from '../../assets/images/luxury_resort_ocean_1790443287801.jpg';

export const ExperiencesSection: React.FC = () => {
  const experiences = [
    {
      title: "Pristine Golden Beaches",
      desc: "Sri Lanka offers extensive golden beaches surrounded by coconut palms, coastal resorts and water-based activities like surfing, diving, and catamaran sailing.",
      icon: <Waves className="w-5 h-5 text-[#2563EB]" />,
      image: luxuryResortImg,
      linkText: "Explore Beaches"
    },
    {
      title: "Exotic Wildlife & Safaris",
      desc: "Internationally recognized for its biodiversity, hosting the highest leopard density on earth, majestic wild elephant gatherings, and over 400 bird species.",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      image: yalaLeopardImg,
      linkText: "Discover Wildlife"
    },
    {
      title: "Misty Hill Country & Tea",
      desc: "Explore misty mountains, cascading waterfalls, cool mountain air, emerald tea gardens, and legendary colonial rail journeys through Nuwara Eliya and Ella.",
      icon: <Mountain className="w-5 h-5 text-emerald-600" />,
      image: ellaHillsImg,
      linkText: "Explore Mountains"
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
            The Diversity of Ceylon
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1 text-balance">
            One Island. <br className="hidden sm:inline" />
            A Thousand Experiences.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Within just a few hours' drive, transition from sun-kissed Indian Ocean shores to 2,000-meter misty tea peaks and wild safari savannahs.
          </p>
        </div>

        {/* 3 Large Experience Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="group relative rounded-3xl overflow-hidden bg-[#F7F9FC] border border-slate-100 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    {exp.icon}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-bold text-[#0B0F19]">
                    {exp.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {exp.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-200/60">
                  <Link
                    to="/destinations"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#0F3B82] transition-colors"
                  >
                    <span>{exp.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
