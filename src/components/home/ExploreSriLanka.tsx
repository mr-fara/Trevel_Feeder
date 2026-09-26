import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { DESTINATIONS } from '../../data/travelData';

export const ExploreSriLanka: React.FC = () => {
  // Select top 6 curated destinations for homepage showcase
  const featured = DESTINATIONS.slice(0, 6);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#E53935]">
              Curated Island Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B0F19] tracking-tight mt-1 text-balance">
              Explore Sri Lanka
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              From golden beaches to misty mountains, discover the experiences that make Sri Lanka unforgettable.
            </p>
          </div>

          <Link
            to="/destinations"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#2563EB] hover:text-[#0F3B82] transition-colors self-start md:self-end"
          >
            <span>View All Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Card 1: Sigiriya (Large Span 7) */}
          <div className="md:col-span-7 group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={featured[0].image}
                alt={featured[0].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                {featured[0].category}
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>Central Province</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {featured[0].name}
                </h3>
                <p className="text-sm text-white/80 line-clamp-2 mt-1">
                  {featured[0].description}
                </p>
                <div className="mt-4">
                  <Link
                    to="/destinations"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-red-300 transition-colors"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Ella (Span 5) */}
          <div className="md:col-span-5 group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="aspect-[16/10] md:aspect-auto md:h-full overflow-hidden relative min-h-[300px]">
              <img
                src={featured[1].image}
                alt={featured[1].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 text-xs font-semibold text-white/90 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full">
                {featured[1].category}
              </div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-1.5 text-xs text-white/80 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                  <span>Hill Country</span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {featured[1].name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mt-1">
                  {featured[1].tagline}
                </p>
                <div className="mt-4">
                  <Link
                    to="/destinations"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white hover:text-red-300 transition-colors"
                  >
                    <span>Explore Destination</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Yala (Span 4) */}
          <div className="md:col-span-4 group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={featured[2].image}
                alt={featured[2].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs text-white/70">{featured[2].category}</div>
                <h3 className="text-xl font-bold">{featured[2].name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{featured[2].tagline}</p>
                <Link
                  to="/destinations"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white hover:text-red-300"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 4: Kandy (Span 4) */}
          <div className="md:col-span-4 group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={featured[3].image}
                alt={featured[3].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs text-white/70">{featured[3].category}</div>
                <h3 className="text-xl font-bold">{featured[3].name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{featured[3].tagline}</p>
                <Link
                  to="/destinations"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white hover:text-red-300"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 5: Galle (Span 4) */}
          <div className="md:col-span-4 group relative rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={featured[4].image}
                alt={featured[4].name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs text-white/70">{featured[4].category}</div>
                <h3 className="text-xl font-bold">{featured[4].name}</h3>
                <p className="text-xs text-white/80 mt-0.5">{featured[4].tagline}</p>
                <Link
                  to="/destinations"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white hover:text-red-300"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
