/**
 * Travels Feeder - Core Data & Content Store
 * Sri Lanka Tours, Air Tickets & Worldwide Travel
 * Tagline: "Feel the difference with us"
 */

const heroFlightImg = '/image/hero_flight_travel_1790443248215.jpg';
const sigiriyaImg = '/image/sigiriya_rock_sunrise_1790443260997.jpg';
const yalaLeopardImg = '/image/yala_leopard_safari_1790443274802.jpg';
const luxuryResortImg = '/image/luxury_resort_ocean_1790443287801.jpg';
const ellaHillsImg = '/image/ella_tea_hills_1790443301054.jpg';

export const COMPANY_DETAILS = {
  name: "Travels Feeder",
  tagline: "Feel the difference with us",
  foundedLocation: "Sri Lanka",
  address: "No. 06, Kandy Road, Nittambuwa, Sri Lanka.",
  phones: [
    { display: "+94 77 463 8544", raw: "+94774638544" },
    { display: "+94 333 333 332", raw: "+94333333332" }
  ],
  emails: [
    "muzammil@travelsfeeder.com",
    "info@travelsfeeder.com"
  ],
  website: "www.travelsfeeder.com",
  accreditation: "IATA Accredited Agent",
  support: "24/7 Airport & Travel Operations",
  whatsappNumber: "+94774638544"
};

export interface Destination {
  id: string;
  name: string;
  tagline: string;
  category: 'Culture' | 'Hill Country' | 'Beaches' | 'Wildlife' | 'Southern Coast' | 'Adventure';
  description: string;
  image: string;
  highlights: string[];
  bestTimeToVisit: string;
  idealDuration: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "sigiriya",
    name: "Sigiriya",
    tagline: "The Ancient Citadel in the Sky",
    category: "Culture",
    description: "An awe-inspiring 5th-century palace fortress perched atop a 200-meter sheer granite rock, featuring ancient frescoes, landscaped water gardens, and panoramic views of Sri Lanka's cultural heartland.",
    image: sigiriyaImg,
    highlights: ["Lion Rock Fortress", "Ancient Water Gardens", "Mirror Wall Frescoes", "Pidurangala Sunset"],
    bestTimeToVisit: "November – April",
    idealDuration: "1 - 2 Days"
  },
  {
    id: "ella",
    name: "Ella",
    tagline: "Where mountains meet adventure",
    category: "Hill Country",
    description: "Nestled amidst misty green peaks and cascading waterfalls, Ella is Sri Lanka's high-altitude paradise famed for the Nine Arch Bridge, Little Adam's Peak, and emerald tea valleys.",
    image: ellaHillsImg,
    highlights: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls", "Scenic Train Journey"],
    bestTimeToVisit: "December – May",
    idealDuration: "2 - 3 Days"
  },
  {
    id: "yala",
    name: "Yala",
    tagline: "Wild Sri Lanka at its most spectacular",
    category: "Wildlife",
    description: "Home to one of the highest leopard densities in the world, Yala National Park borders the Indian Ocean and showcases elephants, sloth bears, spotted deer, and vibrant birdlife.",
    image: yalaLeopardImg,
    highlights: ["Sri Lankan Leopard Safaris", "Wild Elephant Herds", "Coastal Lagoons", "Sloth Bear Spotting"],
    bestTimeToVisit: "February – July",
    idealDuration: "2 Days"
  },
  {
    id: "kandy",
    name: "Kandy",
    tagline: "Culture, heritage and timeless beauty",
    category: "Culture",
    description: "Sri Lanka's sacred hill capital cradles the revered Temple of the Sacred Tooth Relic, surrounded by tranquil Kandy Lake, royal botanical gardens, and traditional cultural dance performances.",
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Temple of the Sacred Tooth Relic", "Royal Botanical Gardens Peradeniya", "Kandy Lake Walk", "Cultural Dance Shows"],
    bestTimeToVisit: "December – April",
    idealDuration: "2 Days"
  },
  {
    id: "galle",
    name: "Galle",
    tagline: "Colonial charm beside the Indian Ocean",
    category: "Southern Coast",
    description: "A UNESCO World Heritage maritime fortress town where Dutch-colonial ramparts, boutique cafes, cobblestone streets, and ocean breezes create an enchanting timeless atmosphere.",
    image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    highlights: ["17th Century Galle Fort", "Lighthouse & Ramparts", "Boutique Artisan Stores", "Sunset at Flag Rock"],
    bestTimeToVisit: "October – April",
    idealDuration: "1 - 2 Days"
  },
  {
    id: "nuwara-eliya",
    name: "Nuwara Eliya",
    tagline: "Little England amidst misty tea estates",
    category: "Hill Country",
    description: "Perched at 1,868 meters, Sri Lanka's cool-climate mountain getaway features English country architecture, sprawling Ceylon tea plantations, Lake Gregory, and crisp mountain air.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Ceylon Tea Factory Tours", "Lake Gregory Boating", "Horton Plains & World's End", "Strawberry Farms"],
    bestTimeToVisit: "February – May",
    idealDuration: "2 Days"
  },
  {
    id: "mirissa",
    name: "Mirissa",
    tagline: "Crescent shores and blue ocean giants",
    category: "Beaches",
    description: "A laid-back southern crescent beach celebrated for blue whale watching expeditions, Coconut Tree Hill sunsets, beachside seafood dining, and gentle ocean surf.",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Blue Whale Watching", "Coconut Tree Hill", "Secret Beach", "Surfing & Snorkeling"],
    bestTimeToVisit: "November – April",
    idealDuration: "2 - 3 Days"
  },
  {
    id: "bentota",
    name: "Bentota",
    tagline: "Golden beaches and water sport thrills",
    category: "Beaches",
    description: "Sri Lanka's premier coastal resort haven, featuring expansive golden sands, luxury beach resorts, Madu River mangrove boat safaris, and turtle conservation hatcheries.",
    image: luxuryResortImg,
    highlights: ["Madu River Mangrove Safari", "Water Sports & Jet Skiing", "Sea Turtle Hatcheries", "Luxury Ayurvedic Spas"],
    bestTimeToVisit: "November – April",
    idealDuration: "2 Days"
  },
  {
    id: "colombo",
    name: "Colombo",
    tagline: "Cosmopolitan pulse and coastal elegance",
    category: "Culture",
    description: "The vibrant commercial capital where modern skyscrapers meet colonial landmarks, bustling Pettah markets, seaside promenade walks at Galle Face Green, and premier fine dining.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Galle Face Green Promenade", "National Museum", "Lotus Tower Observation", "Boutique Shopping & Dining"],
    bestTimeToVisit: "All Year Round",
    idealDuration: "1 - 2 Days"
  },
  {
    id: "jaffna",
    name: "Jaffna",
    tagline: "Northern soul, temples and untouched islands",
    category: "Culture",
    description: "A culturally distinctive peninsula in northern Sri Lanka rich in vibrant Tamil heritage, colorful kovils, Dutch fort ruins, Palmyra palms, and delectable culinary traditions.",
    image: "https://images.unsplash.com/photo-1571401835393-8c5f35328320?auto=format&fit=crop&w=1200&q=80",
    highlights: ["Nallur Kandaswamy Kovil", "Jaffna Dutch Fort", "Delft Island Wild Ponies", "Authentic Northern Cuisine"],
    bestTimeToVisit: "January – September",
    idealDuration: "2 - 3 Days"
  }
];

export interface TourPackage {
  id: string;
  name: string;
  duration: string;
  category: 'Sri Lanka' | 'International' | 'Adventure' | 'Luxury' | 'Family' | 'Honeymoon' | 'Wildlife' | 'Cultural' | 'Beach';
  priceStarting: string;
  destinations: string[];
  image: string;
  summary: string;
  highlights: string[];
  itinerary: { day: string; title: string; desc: string }[];
  includes: string[];
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "sri-lanka-highlights",
    name: "Sri Lanka Highlights",
    duration: "7 Days / 6 Nights",
    category: "Sri Lanka",
    priceStarting: "Request Quote",
    destinations: ["Colombo", "Sigiriya", "Kandy", "Nuwara Eliya", "Galle"],
    image: sigiriyaImg,
    summary: "The quintessential Sri Lankan journey spanning ancient UNESCO rock fortresses, sacred Buddhist temples, misty tea country, and historic colonial seaside ramparts.",
    highlights: ["Climb ancient Sigiriya Fortress", "Temple of the Tooth Relic in Kandy", "Scenic hill country train ride", "Dutch Fort sunset stroll in Galle"],
    itinerary: [
      { day: "Day 01", title: "Arrival in Colombo & Transfer to Sigiriya", desc: "VIP airport reception by your Travels Feeder chauffeur guide, transfer through lush tropical countryside to Sigiriya." },
      { day: "Day 02", title: "Sigiriya Rock Citadel & Dambulla Caves", desc: "Early morning ascent of Sigiriya Lion Rock Fortress, followed by afternoon visit to Dambulla Golden Cave Temple." },
      { day: "Day 03", title: "Spice Sanctuaries & Sacred Kandy", desc: "Journey to Kandy visiting an aromatic spice sanctuary en route. Evening cultural dance show and visit to the Temple of the Tooth." },
      { day: "Day 04", title: "Panoramic Train to Nuwara Eliya", desc: "Board the world-famous hill country train through cascading waterfalls and tea valleys into misty Nuwara Eliya." },
      { day: "Day 05", title: "Tea Plantations & Transfer to Galle", desc: "Tour an operational Ceylon tea estate, sample fine teas, and descend past scenic valleys to coastal Galle." },
      { day: "Day 06", title: "Galle Dutch Fort & Southern Beaches", desc: "Explore the UNESCO-listed Galle Fort ramparts, artisanal boutiques, and enjoy an evening oceanside dinner." },
      { day: "Day 07", title: "Colombo Coastal Drive & Departure", desc: "Scenic highway transfer to Bandaranaike International Airport with dedicated VIP airport team assistance." }
    ],
    includes: ["Private air-conditioned vehicle & dedicated chauffeur guide", "Breakfast daily at boutique properties", "All entrance tickets & permits", "24/7 dedicated travel support"]
  },
  {
    id: "cultural-sri-lanka",
    name: "Cultural Sri Lanka Heritage",
    duration: "6 Days / 5 Nights",
    category: "Cultural",
    priceStarting: "Request Quote",
    destinations: ["Anuradhapura", "Polonnaruwa", "Sigiriya", "Kandy"],
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
    summary: "Step back 2,500 years through monumental stupas, rock carvings, ancient irrigation marvels, and royal cities of the Cultural Triangle.",
    highlights: ["Sacred Sri Maha Bodhi tree", "Polonnaruwa royal stone sculptures", "Dambulla cave frescoes", "Kandy cultural immersion"],
    itinerary: [
      { day: "Day 01", title: "Arrival & Transfer to Anuradhapura", desc: "Arrive at CMB airport, receive private transfer to Sri Lanka's first royal kingdom." },
      { day: "Day 02", title: "Anuradhapura Sacred Stupas", desc: "Explore ancient Ruwanwelisaya stupa and the world's oldest historically documented tree." },
      { day: "Day 03", title: "Polonnaruwa Medieval City", desc: "Marvel at the Gal Vihara colossal Buddha statues carved into living granite." },
      { day: "Day 04", title: "Sigiriya to Kandy", desc: "Morning exploration of Sigiriya citadel followed by transfer to the hill country kingdom of Kandy." },
      { day: "Day 05", title: "Kandy Royal Heritage", desc: "Visit Peradeniya Botanical Gardens and the sacred Tooth Relic shrine." },
      { day: "Day 06", title: "Return to Airport", desc: "Comfortable private transfer to the airport for your outbound flight." }
    ],
    includes: ["Licensed heritage chauffeur guide", "All cultural triangle access permits", "Selected hotel stays", "24/7 airport dispatch"]
  },
  {
    id: "hill-country-escape",
    name: "Hill Country & Tea Escapes",
    duration: "5 Days / 4 Nights",
    category: "Adventure",
    priceStarting: "Request Quote",
    destinations: ["Kandy", "Nuwara Eliya", "Ella", "Horton Plains"],
    image: ellaHillsImg,
    summary: "Immerse yourself in cool mountain air, emerald green Ceylon tea gardens, dramatic viewpoints, and the legendary Nine Arch Bridge.",
    highlights: ["Nine Arch Bridge photo stop", "Horton Plains World's End trek", "Working tea factory private tour", "Little Adam's Peak sunrise"],
    itinerary: [
      { day: "Day 01", title: "Airport to Kandy Hill Capital", desc: "Scenic ascent to Kandy, checking into your hillside boutique resort." },
      { day: "Day 02", title: "Nuwara Eliya & Tea Country", desc: "Drive past Ramboda Falls into Little England, visiting high-elevation tea plantations." },
      { day: "Day 03", title: "World's End Hike & Ella Train", desc: "Early morning trek across Horton Plains plateau, then scenic rail journey to Ella." },
      { day: "Day 04", title: "Ella Peaks & Nine Arch Bridge", desc: "Hike Little Adam's Peak for sunrise and visit the iconic colonial railway viaduct." },
      { day: "Day 05", title: "Descent to Coast / Airport", desc: "Scenic mountain descent to CMB airport or onward beach destination." }
    ],
    includes: ["Private luxury vehicle", "First class observation train tickets", "Mountain guide for treks", "Luxury hillside accommodation"]
  },
  {
    id: "wildlife-safari-adventure",
    name: "Wildlife & Safari Expedition",
    duration: "6 Days / 5 Nights",
    category: "Wildlife",
    priceStarting: "Request Quote",
    destinations: ["Wilpattu", "Minneriya", "Yala", "Udawalawe"],
    image: yalaLeopardImg,
    summary: "An exhilarating safari circuit tracing wild leopard tracks in Yala, vast elephant gatherings in Minneriya, and the untouched wilderness of Wilpattu.",
    highlights: ["Private 4x4 safari jeeps", "Yala leopard & sloth bear tracking", "Minneriya elephant gathering", "Udawalawe elephant transit home"],
    itinerary: [
      { day: "Day 01", title: "Arrival to Wilpattu Wilderness", desc: "Transfer directly to safari campsite bordering Wilpattu National Park." },
      { day: "Day 02", title: "Wilpattu Safari to Minneriya", desc: "Morning leopard & bear tracking game drive, transfer across to Habarana." },
      { day: "Day 03", title: "Minneriya Elephant Gathering", desc: "Afternoon 4x4 open-top safari observing hundreds of wild Asian elephants." },
      { day: "Day 04", title: "Journey South to Yala", desc: "Scenic transfer south past the central highlands to the coastal scrublands of Yala." },
      { day: "Day 05", title: "Full Dawn & Dusk Safari at Yala", desc: "Twin game drives through prime leopard territory with experienced naturalists." },
      { day: "Day 06", title: "Udawalawe & Coastal Return", desc: "Visit Udawalawe Elephant Transit Home before comfortable airport transfer." }
    ],
    includes: ["Specially modified 4x4 safari jeeps", "Professional wildlife naturalists", "All park entrance fees & tracker permits", "Tented safari / lodge stays"]
  },
  {
    id: "southern-coast-escape",
    name: "Southern Coast & Marine Escape",
    duration: "5 Days / 4 Nights",
    category: "Beach",
    priceStarting: "Request Quote",
    destinations: ["Bentota", "Hikkaduwa", "Galle", "Mirissa"],
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    summary: "Sun-drenched golden beaches, private catamaran cruises, blue whale watching in Mirissa, and romantic colonial dining in Galle Fort.",
    highlights: ["Blue whale ocean expedition", "Private Madu river boat safari", "Surfing & snorkeling", "Secluded beach cabanas"],
    itinerary: [
      { day: "Day 01", title: "Airport to Bentota Golden Beach", desc: "Express coastal highway transfer directly to your beachfront resort." },
      { day: "Day 02", title: "Madu River Mangroves & Sea Turtles", desc: "Speedboat mangrove safari and visit to sea turtle conservation sanctuary." },
      { day: "Day 03", title: "Mirissa Blue Whale Cruise", desc: "Early morning ocean cruise to observe the largest creatures on Earth." },
      { day: "Day 04", title: "Galle Fort Colonial Walk", desc: "Relaxing day exploring boutique ramparts and dining overlooking the sunset." },
      { day: "Day 05", title: "Coastal Leisure & Airport Transfer", desc: "Leisurely beach morning followed by express highway transfer to CMB." }
    ],
    includes: ["Private oceanfront resort stays", "Whale watching boat tickets", "Private vehicle throughout", "VIP airport coordination"]
  },
  {
    id: "luxury-sri-lanka",
    name: "Luxury Sri Lanka Signature",
    duration: "10 Days / 9 Nights",
    category: "Luxury",
    priceStarting: "Request Quote",
    destinations: ["Colombo", "Cultural Triangle", "Tea Country", "Yala Safari", "Southern Coast"],
    image: luxuryResortImg,
    summary: "The ultimate luxury indulgence featuring handpicked 5-star boutique sanctuaries, private chartered options, gourmet dining, and private naturalists.",
    highlights: ["Boutique luxury resorts & tea bungalows", "Exclusive private game drives", "Private helicopter transfer options", "Bespoke fine-dining & Ayurvedic wellness"],
    itinerary: [
      { day: "Day 01", title: "VIP Airport Meet & Colombo Luxury", desc: "Champagne welcome and stay at Colombo's premier colonial hotel." },
      { day: "Day 02-03", title: "Sigiriya Private Pavilion", desc: "Stay in ultra-luxury forest chalets, private sunset tour of Sigiriya rock." },
      { day: "Day 04-05", title: "Ceylon Tea Trails Bungalow", desc: "Relive colonial elegance in restored planter bungalows with personal butler." },
      { day: "Day 06-07", title: "Wild Coast Luxury Tented Pavilion", desc: "Ultra-luxury cocoon tents where the jungle meets the pristine ocean." },
      { day: "Day 08-09", title: "Private Galle Ocean Villa", desc: "Exclusive beachfront villa with dedicated private chef and infinity pool." },
      { day: "Day 10", title: "Helicopter / Chauffeur to Airport", desc: "Seamless executive airport transfer with priority lounge check-in." }
    ],
    includes: ["5-star & Relais & Châteaux properties", "Executive private transport", "Personalized private guides & naturalists", "24/7 dedicated senior concierge"]
  }
];

export interface InternationalDestination {
  id: string;
  name: string;
  region: string;
  image: string;
  tagline: string;
  highlights: string[];
}

export const INTERNATIONAL_DESTINATIONS: InternationalDestination[] = [
  {
    id: "dubai",
    name: "Dubai & UAE",
    region: "Middle East",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    tagline: "Futuristic skylines, desert dunes and luxury shopping",
    highlights: ["Burj Khalifa Sky Lounge", "Desert Dune Safari", "Palm Jumeirah Resorts", "Dubai Mall & Gold Souk"]
  },
  {
    id: "maldives",
    name: "Maldives",
    region: "Indian Ocean",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
    tagline: "Overwater bungalows on turquoise crystalline lagoons",
    highlights: ["Private Island Villas", "Manta Ray Snorkeling", "Seaplane Transfers", "Undersea Dining"]
  },
  {
    id: "singapore",
    name: "Singapore",
    region: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80",
    tagline: "The garden city of visionary architecture and culinary marvels",
    highlights: ["Marina Bay Sands SkyPark", "Gardens by the Bay Supertrees", "Sentosa Island", "Michelin Street Food"]
  },
  {
    id: "malaysia",
    name: "Malaysia",
    region: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    tagline: "Petronas towers, rainforest canopies and cultural diversity",
    highlights: ["Kuala Lumpur Petronas Towers", "Penang Heritage Street Food", "Langkawi Cable Car & Beaches", "Batu Caves"]
  },
  {
    id: "thailand",
    name: "Thailand",
    region: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=1200&q=80",
    tagline: "Ornate Buddhist temples, tropical islands and night markets",
    highlights: ["Bangkok Grand Palace", "Phuket & Phi Phi Island Cruises", "Chiang Mai Mountain Sanctuaries", "Floating Markets"]
  },
  {
    id: "bali",
    name: "Bali, Indonesia",
    region: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
    tagline: "Spiritual retreats, jungle waterfalls and cliffside temples",
    highlights: ["Ubud Rice Terraces", "Uluwatu Sunset Temple", "Nusa Penida Coastal Tours", "Luxury Jungle Pool Villas"]
  },
  {
    id: "turkey",
    name: "Turkey",
    region: "Eurasia",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80",
    tagline: "East meets West in Istanbul and Cappadocia's fairy chimneys",
    highlights: ["Cappadocia Hot Air Balloons", "Bosphorus Luxury Cruise", "Hagia Sophia & Blue Mosque", "Pamukkale Thermal Pools"]
  },
  {
    id: "europe",
    name: "Europe Grand Tours",
    region: "Europe",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80",
    tagline: "Iconic capitals, alpine vistas and timeless romance",
    highlights: ["Paris Eiffel Tower & Louvre", "Swiss Alpine Glacier Rail", "Rome Colosseum & Vatican", "Amsterdam Canals"]
  },
  {
    id: "australia",
    name: "Australia",
    region: "Oceania",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
    tagline: "Sydney Harbour, the Great Barrier Reef and outback wonders",
    highlights: ["Sydney Opera House & Bridge Climb", "Great Barrier Reef Snorkel", "Melbourne Laneway Culture", "Gold Coast Beaches"]
  }
];

export interface ServiceItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  link: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "tour-programs",
    num: "01",
    title: "Tour Programs",
    shortDesc: "Carefully designed tour programmes with multilingual guide options, flexible hotel choices and fully customizable itineraries.",
    fullDesc: "Discover Sri Lanka through carefully designed tour programmes with multilingual guide options, flexible hotel choices and fully customizable itineraries. Whether you seek cultural deep dives, high-altitude hiking, or tranquil beach getaways, we craft bespoke schedules around your travel rhythm.",
    image: sigiriyaImg,
    link: "/packages"
  },
  {
    id: "accommodation",
    num: "02",
    title: "Accommodation",
    shortDesc: "Choose from homestays, backpacker accommodation, 3–5 star hotels, boutique properties, luxury resorts and unique campsite experiences.",
    fullDesc: "Choose from homestays, backpacker accommodation, 3–5 star hotels, boutique properties, luxury resorts and unique campsite experiences. We maintain direct relationships across Sri Lanka's finest hospitality brands to guarantee the best rates, upgrades, and verified comfort.",
    image: luxuryResortImg,
    link: "/accommodation"
  },
  {
    id: "transfers",
    num: "03",
    title: "Transfers & Fleet",
    shortDesc: "Travel comfortably with reliable transfer services across Sri Lanka, including cars, vans, minibuses, coaches and VIP limousine transfers.",
    fullDesc: "Travel comfortably with reliable transfer services across Sri Lanka, including cars, vans, minibuses, coaches and VIP limousine transfers. Every vehicle is comprehensively insured, rigorously maintained, air-conditioned, and driven by English-speaking tourist-board certified chauffeurs.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    link: "/transfers"
  },
  {
    id: "safari-journeys",
    num: "04",
    title: "Safari Journeys",
    shortDesc: "Experience Sri Lanka's remarkable wildlife through professionally arranged safari journeys featuring elephants, leopards and diverse natural ecosystems.",
    fullDesc: "Experience Sri Lanka's remarkable wildlife through professionally arranged safari journeys featuring elephants, leopards and diverse natural ecosystems. We organize specialized 4x4 open-top safari jeeps, park permits, and top-tier naturalists across Yala, Wilpattu, Udawalawe, and Minneriya.",
    image: yalaLeopardImg,
    link: "/safari"
  },
  {
    id: "car-rental",
    num: "05",
    title: "Car Rental",
    shortDesc: "Choose the right vehicle for your journey with flexible rental options and comfortable transportation for destinations across Sri Lanka.",
    fullDesc: "Choose the right vehicle for your journey with flexible rental options and comfortable transportation for destinations across Sri Lanka. Options include self-drive with international permit endorsements or private chauffeur-driven hires for complete peace of mind.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    link: "/car-rental"
  },
  {
    id: "airport-services",
    num: "06",
    title: "Airport Services",
    shortDesc: "Receive dependable airport assistance through our 24/7 airport operation team stationed right at Bandaranaike International Airport.",
    fullDesc: "Receive dependable airport assistance through our 24/7 airport operation team stationed at CMB airport. From tarmac meet-and-greets, fast-track baggage support, and priority terminal transfers to emergency flight modifications, we are always on the ground.",
    image: heroFlightImg,
    link: "/transfers"
  },
  {
    id: "tour-guides",
    num: "07",
    title: "Tour Guides & Naturalists",
    shortDesc: "Travel with experienced guides and specialist naturalists with expertise in wildlife, birds, marine biology, butterflies and reptiles.",
    fullDesc: "Travel with experienced guides and specialist naturalists with expertise in wildlife, birds, marine biology, butterflies and reptiles. Our team members are certified by the Sri Lanka Tourism Development Authority (SLTDA) and fluent in English, German, French, Arabic, and Russian.",
    image: ellaHillsImg,
    link: "/about"
  },
  {
    id: "visa-assistance",
    num: "08",
    title: "Visa Assistance",
    shortDesc: "Get professional assistance with travel documentation, Electronic Travel Authorization (ETA), and visa-related requirements.",
    fullDesc: "Get professional assistance with travel documentation, Electronic Travel Authorization (ETA), tourist visas, transit permits, and outbound travel clearance. We handle the paperwork smoothly so your travel begins without delays.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    link: "/visa"
  }
];

export interface VehicleOption {
  id: string;
  name: string;
  category: string;
  passengers: string;
  luggage: string;
  transmission: string;
  airConditioning: boolean;
  image: string;
  description: string;
}

export const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: "sedan",
    name: "Toyota Allion / Axio Sedan",
    category: "Sedan",
    passengers: "3 Passengers",
    luggage: "2 Large Bags",
    transmission: "Automatic",
    airConditioning: true,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80",
    description: "Ideal for couples and solo travelers looking for smooth, fuel-efficient city and intercity travel."
  },
  {
    id: "suv",
    name: "Toyota Prado / Mitsubishi Montero",
    category: "SUV",
    passengers: "4 - 5 Passengers",
    luggage: "4 Large Bags",
    transmission: "4WD / Automatic",
    airConditioning: true,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
    description: "Spacious luxury SUV built for navigating hill country roads, coastal highways, and rugged terrain in total comfort."
  },
  {
    id: "van",
    name: "Toyota KDH High-Roof Van",
    category: "Van",
    passengers: "6 - 9 Passengers",
    luggage: "7 Large Bags",
    transmission: "Automatic",
    airConditioning: true,
    image: "https://images.unsplash.com/photo-1559297434-fae8a1916a79?auto=format&fit=crop&w=800&q=80",
    description: "The gold standard for family and small group tours across Sri Lanka, equipped with reclining seats and generous baggage space."
  },
  {
    id: "minibus",
    name: "Toyota Coaster Minibus",
    category: "Minibus",
    passengers: "14 - 22 Passengers",
    luggage: "15 Large Bags",
    transmission: "Manual / Automatic",
    airConditioning: true,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
    description: "Comfortable air-conditioned mini-coach designed for larger tour groups and corporate delegations."
  },
  {
    id: "luxury",
    name: "Mercedes-Benz E-Class / S-Class",
    category: "Luxury VIP",
    passengers: "3 Passengers",
    luggage: "3 Bags",
    transmission: "Automatic",
    airConditioning: true,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    description: "Prestige luxury chauffeur limousine service for VIP travelers, diplomats, and special celebration occasions."
  },
  {
    id: "safari-jeep",
    name: "Custom 4x4 Safari Cruiser",
    category: "Safari Vehicle",
    passengers: "6 Passengers",
    luggage: "Daypacks",
    transmission: "4x4 Heavy Duty",
    airConditioning: false,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    description: "Raised tier-seated 4WD with removable canopy designed specifically for unobstructed wildlife photography in national parks."
  }
];

export interface AccommodationCategory {
  id: string;
  name: string;
  description: string;
  tier: string;
  image: string;
  typicalAmenities: string[];
}

export const ACCOMMODATION_CATEGORIES: AccommodationCategory[] = [
  {
    id: "luxury-5star",
    name: "5-Star Resorts & Boutique Villas",
    description: "World-class luxury properties offering personal butler service, infinity pools overlooking oceans or tea hills, and Michelin-standard dining.",
    tier: "5 Star / Luxury",
    image: luxuryResortImg,
    typicalAmenities: ["Private Plunge Pool", "Ayurvedic Spa", "Fine Dining", "Oceanfront Cabana", "Concierge Service"]
  },
  {
    id: "beach-resorts",
    name: "Beachfront Coastal Resorts",
    description: "Sun-drenched properties situated right along the beaches of Bentota, Mirissa, Tangalle, and Pasikudah.",
    tier: "Beach Resort",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    typicalAmenities: ["Direct Beach Access", "Seafood Grill", "Water Sports", "Sunset Lounge", "Day Spa"]
  },
  {
    id: "heritage-tea",
    name: "Colonial Tea Bungalows & Heritage Mansions",
    description: "Historic planter residences and Dutch colonial mansions restored with timeless mahogany charm, lush lawns, and log fireplaces.",
    tier: "Heritage / Boutique",
    image: ellaHillsImg,
    typicalAmenities: ["Colonial Fireplace", "Planter's High Tea", "Bespoke Dining", "Private Tea Valet", "Lush Mountain Views"]
  },
  {
    id: "safari-camps",
    name: "Luxury Safari Lodges & Glamping",
    description: "Immersive wilderness lodges and upscale canvas glamping tents situated along park borders in Yala and Wilpattu.",
    tier: "Safari Glamping",
    image: yalaLeopardImg,
    typicalAmenities: ["Wilderness Bush Dinners", "Open Air Showers", "Campfire Lounges", "On-site Naturalist", "Deck Viewing"]
  },
  {
    id: "comfort-hotels",
    name: "3 & 4-Star Premium Comfort Hotels",
    description: "Reliable, modern, and comfortable hotels located conveniently near primary attractions, ideal for families and touring groups.",
    tier: "3–4 Star Comfort",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    typicalAmenities: ["Swimming Pool", "Complimentary Wi-Fi", "Buffet Breakfast", "Air Conditioned Rooms", "Fitness Center"]
  },
  {
    id: "homestays",
    name: "Authentic Homestays & Backpacker Lodges",
    description: "Warm, family-run guesthouses where guests experience genuine Sri Lankan hospitality, authentic home-cooked meals, and friendly local stories.",
    tier: "Homestay / Eco",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    typicalAmenities: ["Home Cooked Meals", "Clean Private Bathrooms", "Host Guidance", "Cultural Immersion", "Garden Setting"]
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Destinations' | 'Wildlife' | 'Beaches' | 'Culture' | 'Hotels' | 'Tours';
  image: string;
  location: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "Sigiriya Rock at Dawn", category: "Destinations", image: sigiriyaImg, location: "Sigiriya, Central Province" },
  { id: "g2", title: "Majestic Leopard on Granite", category: "Wildlife", image: yalaLeopardImg, location: "Yala National Park" },
  { id: "g3", title: "Rolling Ceylon Tea Hills", category: "Destinations", image: ellaHillsImg, location: "Ella, Hill Country" },
  { id: "g4", title: "Luxury Beachfront Cabana", category: "Hotels", image: luxuryResortImg, location: "Bentota Coast" },
  { id: "g5", title: "Aviation Travel Above the Clouds", category: "Tours", image: heroFlightImg, location: "International Air Travel" },
  { id: "g6", title: "Temple of the Tooth Relic", category: "Culture", image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1000&q=80", location: "Kandy" },
  { id: "g7", title: "Colonial Galle Fort Ramparts", category: "Culture", image: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80", location: "Galle Fort" },
  { id: "g8", title: "Wild Asian Elephants at Gathering", category: "Wildlife", image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80", location: "Minneriya National Park" },
  { id: "g9", title: "Mirissa Crescent Bay at Sunset", category: "Beaches", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1000&q=80", location: "Mirissa Beach" },
  { id: "g10", title: "Scenic Hill Country Railway", category: "Tours", image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1000&q=80", location: "Demodara Nine Arch Bridge" },
  { id: "g11", title: "Stilt Fishermen at Twilight", category: "Culture", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1000&q=80", location: "Koggala Coast" },
  { id: "g12", title: "Tropical Infinity Pool Oasis", category: "Hotels", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80", location: "Southern Coast" }
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  country: string;
  tripType: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "From our midnight arrival at Colombo airport to our departure ten days later, Travels Feeder orchestrated every transfer, hotel, and safari with flawless precision. Our chauffeur guide felt like family.",
    author: "Alexander & Claire M.",
    country: "United Kingdom",
    tripType: "10-Day Sri Lanka Highlights & Hill Country"
  },
  {
    id: "t2",
    quote: "Booking international flights and connecting our luxury tour in Sri Lanka through one team made all the difference. When our connection in Dubai was rescheduled, Travels Feeder resolved everything before we even landed.",
    author: "Tariq Al-Mansoor",
    country: "United Arab Emirates",
    tripType: "Flight Booking & Luxury Family Tour"
  },
  {
    id: "t3",
    quote: "Our safari in Yala was extraordinary! Our naturalist spotted two leopards and a family of sloth bears. The 4x4 vehicle was comfortable, clean, and in pristine condition. Highly recommended.",
    author: "Elena Rostova",
    country: "Germany",
    tripType: "Wildlife & Safari Expedition"
  },
  {
    id: "t4",
    quote: "We arranged an island-wide car rental with a driver for a two-week botanical journey. Every day was punctual, thoughtful, and stress-free. Truly feel the difference with Travels Feeder!",
    author: "David & Sarah Chen",
    country: "Australia",
    tripType: "Chauffeur Driven Island Tour"
  }
];

export const TRUST_POINTS = [
  { title: "IATA Accredited Agent", desc: "Recognized international airline ticketing and travel assurance." },
  { title: "24/7 Airport Operations", desc: "Dedicated ground support team stationed at Colombo CMB Airport." },
  { title: "Experienced Travel Team", desc: "Decades of combined knowledge in island tourism and world routes." },
  { title: "Worldwide Travel Assistance", desc: "Outbound holiday packages and flight support to 50+ countries." }
];

export interface TravelContent {
  companyDetails: typeof COMPANY_DETAILS;
  destinations: Destination[];
  tourPackages: TourPackage[];
  internationalDestinations: InternationalDestination[];
  services: ServiceItem[];
  vehicleOptions: VehicleOption[];
  accommodationCategories: AccommodationCategory[];
  galleryItems: GalleryItem[];
  testimonials: Testimonial[];
  trustPoints: typeof TRUST_POINTS;
}

export function hydrateTravelData(content: TravelContent): void {
  Object.assign(COMPANY_DETAILS, content.companyDetails);
  DESTINATIONS.splice(0, DESTINATIONS.length, ...content.destinations);
  TOUR_PACKAGES.splice(0, TOUR_PACKAGES.length, ...content.tourPackages);
  INTERNATIONAL_DESTINATIONS.splice(0, INTERNATIONAL_DESTINATIONS.length, ...content.internationalDestinations);
  SERVICES.splice(0, SERVICES.length, ...content.services);
  VEHICLE_OPTIONS.splice(0, VEHICLE_OPTIONS.length, ...content.vehicleOptions);
  ACCOMMODATION_CATEGORIES.splice(0, ACCOMMODATION_CATEGORIES.length, ...content.accommodationCategories);
  GALLERY_ITEMS.splice(0, GALLERY_ITEMS.length, ...content.galleryItems);
  TESTIMONIALS.splice(0, TESTIMONIALS.length, ...content.testimonials);
  TRUST_POINTS.splice(0, TRUST_POINTS.length, ...content.trustPoints);
}
