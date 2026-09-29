import * as catalogRepository from './catalog.repository.ts';
import type {CatalogCollection} from './catalog.data.ts';

export async function getContent() {
  const documents = await catalogRepository.getDocuments();
  return {
    companyDetails: documents.companyDetails ?? {},
    destinations: documents.destinations ?? [],
    tourPackages: documents.tourPackages ?? [],
    internationalDestinations: documents.internationalDestinations ?? [],
    services: documents.services ?? [],
    vehicleOptions: documents.vehicleOptions ?? [],
    accommodationCategories: documents.accommodationCategories ?? [],
    galleryItems: documents.galleryItems ?? [],
    testimonials: documents.testimonials ?? [],
    trustPoints: documents.trustPoints ?? [],
    flightRoutes: documents.flightRoutes ?? [],
    safariContent: documents.safariContent ?? {},
  };
}

export async function getCollection(collection: CatalogCollection) {
  return await catalogRepository.getDocument(collection) ?? [];
}

export async function getById(collection: 'destinations' | 'tourPackages', id: string) {
  const records = await getCollection(collection) as {id: string}[];
  return records.find((item) => item.id === id) ?? null;
}
