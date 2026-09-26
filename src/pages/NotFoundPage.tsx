import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-[#F7F9FC]">
      <div className="max-w-md mx-auto text-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#E53935] flex items-center justify-center mx-auto mb-6">
          <Compass className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono font-bold text-[#E53935] uppercase tracking-wider">
          Error 404
        </span>

        <h1 className="text-3xl font-extrabold text-[#0B0F19] tracking-tight mt-1">
          Route Not Found
        </h1>

        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          The travel page or itinerary you are searching for might have been moved or is currently unavailable.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E53935] hover:bg-[#B91C1C] text-white rounded-full text-xs font-bold tracking-wide transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            to="/packages"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-full text-xs font-bold tracking-wide border border-slate-200 transition-colors"
          >
            <span>Explore Tours</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};
