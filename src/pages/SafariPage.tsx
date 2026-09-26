import React from 'react';
import { Camera, Check, ShieldCheck, Clock, MapPin, Compass } from 'lucide-react';
import yalaLeopardImg from '../assets/images/yala_leopard_safari_1790443274802.jpg';
import { useEnquiry } from '../context/EnquiryContext';

export const SafariPage: React.FC = () => {
  const { openEnquiry } = useEnquiry();

  const nationalParks = [
    {
      name: "Yala National Park",
      region: "Southern / Uva Province",
      highlight: "Highest Leopard Density on Earth",
      bestSeason: "February to July (Dry Season)",
      description: "Yala features semi-arid scrub forest bordered by the Indian Ocean. Its famous Block 1 holds the densest population of leopards worldwide, alongside wild elephants, sloth bears, and saltwater crocodiles.",
      animals: ["Sri Lankan Leopard", "Asian Elephant", "Sloth Bear", "Spotted Deer", "Mugger Crocodile", "Black-necked Stork"]
    },
    {
      name: "Wilpattu National Park",
      region: "North Western Province",
      highlight: "Sri Lanka's Largest & Oldest Natural Sanctuary",
      bestSeason: "May to October",
      description: "Wilpattu is unique for its 'Villus'—natural sand-rimmed water basins that attract diverse wildlife. Its dense jungle canopy offers unhurried, secluded leopard and sloth bear tracking.",
      animals: ["Leopard", "Barking Deer", "Sloth Bear", "Water Buffalo", "Peafowl", "Star Tortoise"]
    },
    {
      name: "Minneriya National Park",
      region: "Central Cultural Province",
      highlight: "The Elephant Gathering (Up to 300+ Elephants)",
      bestSeason: "July to October",
      description: "During the dry season, hundreds of wild Asian elephants congregate on the lush green shores of the ancient Minneriya reservoir, creating one of the world's greatest wildlife spectacles.",
      animals: ["Asian Elephant Herds", "Painted Storks", "Cormorants", "Sambar Deer", "Purple-faced Langur"]
    },
    {
      name: "Udawalawe National Park",
      region: "Sabaragamuwa / Uva Province",
      highlight: "Guaranteed Year-Round Elephant Sightings",
      bestSeason: "All Year Round",
      description: "Reminiscent of East African savannah grasslands, Udawalawe provides unparalleled opportunities to observe matriarchal elephant herds with newborn calves at close range.",
      animals: ["Wild Elephants", "Crested Serpent Eagle", "Jackals", "Wild Boar", "Monitor Lizards"]
    }
  ];

  return (
    <main className="mt-10 py-20 sm:py-28 bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Editorial Wildlife Hero */}
        <div className="bg-[#0B0F19] text-white rounded-3xl sm:rounded-[40px] p-8 sm:p-14 mb-16 relative overflow-hidden">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
              Wildlife & Safari Journeys
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Into the Wild.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Experience the extraordinary wildlife of Sri Lanka through carefully arranged safari journeys. Private 4x4 open-top jeeps, dedicated naturalists, and access to the island's prime national parks.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() =>
                  openEnquiry({
                    service: 'Safari Journey',
                    destination: 'Yala / Wilpattu / Minneriya Safari'
                  })
                }
                className="px-7 py-3.5 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide shadow-sm cursor-pointer"
              >
                Plan a Safari Journey
              </button>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 lg:opacity-60 hidden md:block">
            <img
              src={yalaLeopardImg}
              alt="Yala Leopard"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] to-transparent" />
          </div>
        </div>

        {/* National Parks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nationalParks.map((park) => (
            <div
              key={park.name}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                    {park.region}
                  </span>
                  <span className="text-emerald-600 font-semibold">{park.bestSeason}</span>
                </div>

                <h3 className="text-2xl font-bold text-[#0B0F19]">
                  {park.name}
                </h3>
                <div className="text-xs font-semibold text-[#2563EB] mt-1">
                  {park.highlight}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  {park.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                    Key Wildlife Species
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {park.animals.map((a, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  Private 4x4 Jeep Safari
                </span>

                <button
                  onClick={() =>
                    openEnquiry({
                      service: 'Safari Journey',
                      destination: park.name,
                      notes: `Requesting private safari in ${park.name}. Best season: ${park.bestSeason}.`
                    })
                  }
                  className="px-5 py-2.5 bg-[#0B0F19] hover:bg-[#2563EB] text-white rounded-full text-xs font-bold transition-colors cursor-pointer"
                >
                  Book Safari
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
