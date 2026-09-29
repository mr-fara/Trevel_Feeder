import {lazy, Suspense} from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { EnquiryProvider } from './context/EnquiryContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { EnquiryModal } from './components/common/EnquiryModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { FlightsPage } from './pages/FlightsPage';
import { PackagesPage } from './pages/PackagesPage';
import { PackageDetailPage } from './pages/PackageDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ServicesPage } from './pages/ServicesPage';
import { AccommodationPage } from './pages/AccommodationPage';
import { SafariPage } from './pages/SafariPage';
import { CarRentalPage } from './pages/CarRentalPage';
import { TransfersPage } from './pages/TransfersPage';
import { VisaPage } from './pages/VisaPage';
import { GalleryPage } from './pages/GalleryPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AdminRoutes = lazy(() => import('./pages/admin/AdminDashboard').then((module) => ({default: module.AdminRoutes})));

export default function App() {
  return (
    <BrowserRouter>
      <EnquiryProvider>
        <AppRoutes />
      </EnquiryProvider>
    </BrowserRouter>
  );
}

function AppRoutes() {
  const {pathname} = useLocation();
  if (pathname.startsWith('/admin')) {
    return <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#F3F5F2] text-sm text-slate-500">Loading admin workspace...</div>}><AdminRoutes /></Suspense>;
  }

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-[#0B0F19]">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/flights" element={<FlightsPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:id" element={<PackageDetailPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/safari" element={<SafariPage />} />
            <Route path="/car-rental" element={<CarRentalPage />} />
            <Route path="/transfers" element={<TransfersPage />} />
            <Route path="/visa" element={<VisaPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <EnquiryModal />
      </div>
    </>
  );
}
