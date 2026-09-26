import React from 'react';
import { Award, Clock, Users2, Globe2 } from 'lucide-react';
import { COMPANY_DETAILS, TRUST_POINTS } from '../../data/travelData';

export const TrustIndicators: React.FC = () => {
  const icons = [
    <Award className="w-5 h-5 text-[#2563EB]" />,
    <Clock className="w-5 h-5 text-emerald-600" />,
    <Users2 className="w-5 h-5 text-amber-500" />,
    <Globe2 className="w-5 h-5 text-[#E53935]" />
  ];

  return (
    <section className="mt-15 py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_POINTS.map((pt, idx) => (
            <div key={pt.title} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {icons[idx % icons.length]}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B0F19]">
                  {pt.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
