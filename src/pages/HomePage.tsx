import React from 'react';
import { Hero } from '../components/home/Hero';
import { FlightSearchCard } from '../components/home/FlightSearchCard';
import { TrustIndicators } from '../components/home/TrustIndicators';
import { ExploreSriLanka } from '../components/home/ExploreSriLanka';
import { HolidayPackagesSection } from '../components/home/HolidayPackagesSection';
import { InternationalDestinations } from '../components/home/InternationalDestinations';
import { PlanningSteps } from '../components/home/PlanningSteps';
import { ServicesPreview } from '../components/home/ServicesPreview';
import { ExperiencesSection } from '../components/home/ExperiencesSection';
import { SafariSection } from '../components/home/SafariSection';
import { AccommodationPreview } from '../components/home/AccommodationPreview';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { LargeCtaSection } from '../components/home/LargeCtaSection';
import { ContactPreview } from '../components/home/ContactPreview';

export const HomePage: React.FC = () => {
  return (
    <main>
      {/* 3. Premium hero */}
      <Hero />

      {/* 4. Flight / travel booking search */}
      <FlightSearchCard />

      {/* 5. Trust indicators */}
      <TrustIndicators />

      {/* 6. Explore Sri Lanka */}
      <ExploreSriLanka />

      {/* 7. Featured holiday packages */}
      <HolidayPackagesSection />

      {/* 8. International destinations */}
      <InternationalDestinations />

      {/* 9. Plan Your Journey */}
      <PlanningSteps />

      {/* 10. Services */}
      <ServicesPreview />

      {/* 11. Sri Lanka experiences */}
      <ExperiencesSection />

      {/* 12. Safari / wildlife */}
      <SafariSection />

      {/* 13. Accommodation */}
      <AccommodationPreview />

      {/* 14. Why Travels Feeder */}
      <WhyUsSection />

      {/* 15. Testimonials */}
      <TestimonialsSection />

      {/* 16. Photo gallery */}
      <GalleryPreview />

      {/* 17. Large CTA */}
      <LargeCtaSection />

      {/* 18. Contact preview */}
      <ContactPreview />
    </main>
  );
};
