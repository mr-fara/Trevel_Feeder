import {z} from 'zod';

const text = (maximum = 4000) => z.string().trim().min(1).max(maximum);
const textList = z.array(text(500)).max(40);
const recordId = z.string().regex(/^[a-z0-9][a-z0-9-]{1,79}$/);

const destination = z.object({
  id: recordId,
  name: text(100),
  tagline: text(180),
  category: z.enum(['Culture', 'Hill Country', 'Beaches', 'Wildlife', 'Southern Coast', 'Adventure']),
  description: text(),
  image: text(1000),
  highlights: textList,
  bestTimeToVisit: text(100),
  idealDuration: text(80),
}).strict();

const tourPackage = z.object({
  id: recordId,
  name: text(120),
  duration: text(80),
  category: z.enum(['Sri Lanka', 'International', 'Adventure', 'Luxury', 'Family', 'Honeymoon', 'Wildlife', 'Cultural', 'Beach']),
  priceStarting: text(100),
  destinations: textList,
  image: text(1000),
  summary: text(),
  highlights: textList,
  itinerary: z.array(z.object({day: text(40), title: text(160), desc: text(1000)}).strict()).max(40),
  includes: textList,
}).strict();

const service = z.object({
  id: recordId,
  num: text(10),
  title: text(120),
  shortDesc: text(500),
  fullDesc: text(),
  image: text(1000),
  link: z.string().regex(/^\/[a-z0-9/-]*$/),
}).strict();

const galleryItem = z.object({
  id: recordId,
  title: text(140),
  category: z.enum(['Destinations', 'Wildlife', 'Beaches', 'Culture', 'Hotels', 'Tours']),
  image: text(1000),
  location: text(160),
}).strict();

const flightRoute = z.object({
  id: recordId,
  from: text(120),
  to: text(120),
  duration: text(80),
  note: text(160),
}).strict();

const safariPark = z.object({
  id: recordId,
  name: text(120),
  region: text(120),
  highlight: text(180),
  bestSeason: text(120),
  description: text(),
  animals: textList,
  focus: text(180),
  animalSummary: text(220),
  block: text(80),
}).strict();

const safariContent = z.object({
  heroBadge: text(120),
  heroTitle: text(160),
  heroDescription: text(),
  sectionHeading: text(160),
  parks: z.array(safariPark).max(40),
  keySpecies: textList,
  stats: z.array(z.object({value: text(30), label: text(80)}).strict()).max(12),
  featuredSpecies: z.object({
    name: text(120),
    scientificName: text(160),
    status: text(80),
    location: text(100),
    image: text(1000),
  }).strict(),
}).strict();

export const managedContentSchemas = {
  destinations: z.array(destination).max(200),
  tourPackages: z.array(tourPackage).max(200),
  services: z.array(service).max(100),
  galleryItems: z.array(galleryItem).max(300),
  flightRoutes: z.array(flightRoute).max(100),
  safariContent,
};

export type ManagedContentCollection = keyof typeof managedContentSchemas;
