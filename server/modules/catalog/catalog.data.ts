import * as data from '../../../src/data/travelData.ts';

export const catalog = {
  companyDetails: data.COMPANY_DETAILS,
  destinations: data.DESTINATIONS,
  tourPackages: data.TOUR_PACKAGES,
  internationalDestinations: data.INTERNATIONAL_DESTINATIONS,
  services: data.SERVICES,
  vehicleOptions: data.VEHICLE_OPTIONS,
  accommodationCategories: data.ACCOMMODATION_CATEGORIES,
  galleryItems: data.GALLERY_ITEMS,
  testimonials: data.TESTIMONIALS,
  trustPoints: data.TRUST_POINTS,
  flightRoutes: data.FLIGHT_ROUTES,
  safariContent: data.SAFARI_CONTENT,
};

export type CatalogCollection = Exclude<keyof typeof catalog, 'companyDetails'>;
