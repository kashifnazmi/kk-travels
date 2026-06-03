import React, { useState } from 'react';
import { Plane, Hotel, FileText, Car, ShieldCheck, MapPin, ChevronRight, Check } from 'lucide-react';
import { SERVICES } from '../data';

// Map icon strings to actual lucide-react components for secure type compilation
const ICON_COMPONENTS: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane: Plane,
  Hotel: Hotel,
  FileText: FileText,
  Car: Car,
  ShieldCheck: ShieldCheck,
  MapPin: MapPin,
};

export default function ServicesSection() {
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);

  return (
    <div id="services-section-wrapper" className="space-y-12">
      {/* Title brief */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit mx-auto">
          KK Luxury Amenities
        </span>
        <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white">
          Complete End-To-End Travel Ecosystem
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
          Forget multi-vendor booking chaos. We synchronize flight schedules, five-star hotel priority check-ins, local chauffeured logistics, and entry visas inside a single tailored vault.
        </p>
      </div>

      {/* Grid of services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((srv) => {
          const IconComponent = ICON_COMPONENTS[srv.iconName] || Compass;
          const isSelected = hoveredIdx === srv.id;

          return (
            <div
              key={srv.id}
              id={`service-card-${srv.id}`}
              onMouseEnter={() => setHoveredIdx(srv.id)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-6 sm:p-8 hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(245,158,11,0.04)] transition-all duration-300 group relative overflow-hidden transform hover:-translate-y-1"
            >
              {/* Highlight background glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none transition-all duration-500 -mr-12 -mt-12 ${
                  isSelected ? 'scale-150 opacity-100' : 'opacity-0'
                }`}
              />

              <div className="space-y-5">
                {/* Icon display space */}
                <div className="p-4 bg-slate-100 dark:bg-white/10 text-slate-800 dark:text-amber-500 rounded-2xl w-fit group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                  <IconComponent className="w-6 h-6 shrink-0" />
                </div>

                {/* Info titles */}
                <div className="space-y-2">
                  <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white tracking-tight group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>

                {/* Sublist bullet details */}
                <div className="border-t border-slate-100 dark:border-white/10 pt-4 space-y-2">
                  <span className="text-[10px] tracking-widest font-mono uppercase font-black text-slate-400 dark:text-slate-500 block">
                    Exclusive Service Guards
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {srv.benefits.map((bene, idx) => (
                      <li key={idx} className="flex items-start gap-1 text-slate-500 dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span className="font-sans line-clamp-2 leading-tight">{bene}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Fallback just in case
function Compass({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
