import React, { useState } from 'react';
import { Star, Clock, MapPin, Tag, Check, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  key?: string;
  destination: Destination;
  onBook: (destinationId: string) => void;
}

export default function DestinationCard({ destination, onBook }: DestinationCardProps) {
  const [showItinerary, setShowItinerary] = useState(false);

  return (
    <div
      id={`dest-card-${destination.id}`}
      className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] transition-all duration-300 group flex flex-col h-full transform hover:-translate-y-1.5"
    >
      {/* Thumbnail and Tags */}
      <div className="relative h-64 overflow-hidden select-none shrink-0">
        <img
          src={destination.image}
          alt={destination.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />

        {/* Dynamic Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-sans font-bold tracking-wide uppercase bg-slate-950/70 backdrop-blur-md text-amber-500 px-2.5 py-1 rounded-lg border border-amber-500/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured Pill */}
        {destination.featured && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-sans font-extrabold uppercase px-3 py-1 rounded-lg shadow-md tracking-wider flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-slate-950" />
            Top Choice
          </div>
        )}

        {/* Price Tag Layer */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-sans font-bold text-sm tracking-tight text-slate-200">
              {destination.subtitle}
            </span>
          </div>
          <div className="text-right">
            {destination.originalPrice && (
              <span className="text-xs line-through text-slate-400 block -mb-1">
                ${destination.originalPrice}
              </span>
            )}
            <span className="text-xl font-sans font-extrabold text-amber-500 block">
              ${destination.price}
              <span className="text-xs text-slate-300 font-normal">/ pax</span>
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="space-y-3.5">
          {/* Header Indicators */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {destination.duration}
            </span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1 bg-slate-100 dark:bg-white/10 px-2.5 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              {destination.rating}
              <span className="text-slate-400 font-normal">({destination.reviewCount})</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
            {destination.title}
          </h3>

          {/* Summary description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
            {destination.description}
          </p>

          {/* Key highlights bullet points */}
          <div className="pt-2">
            <h4 className="text-xs font-sans font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Package Includes:
            </h4>
            <ul className="grid grid-cols-1 gap-1.5">
              {destination.highlights.slice(0, 3).map((item, idx) => (
                <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="font-sans line-clamp-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Collapsible structured itinerary view */}
        <div className="mt-4 border-t border-slate-100 dark:border-white/5 pt-4 space-y-3 shrink-0">
          <button
            onClick={() => setShowItinerary(!showItinerary)}
            className="w-full flex items-center justify-between text-xs font-sans font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white pb-1 transition-all cursor-pointer"
          >
            <span>{showItinerary ? 'Hide Complete Itinerary' : 'View Day-by-day schedule'}</span>
            {showItinerary ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showItinerary && (
            <div className="bg-slate-50 dark:bg-[#0B0F19]/90 rounded-xl p-3 space-y-3.5 border border-slate-100 dark:border-white/10 max-h-56 overflow-y-auto dark:scrollbar">
              {destination.itinerary.map((day, idx) => (
                <div key={idx} className="text-xs space-y-1">
                  <span className="font-sans font-extrabold text-amber-500 uppercase tracking-widest text-[9px] block">
                    Day {idx + 1} Plan
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-sans">{day}</p>
                </div>
              ))}
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex gap-2.5 pt-1.5">
            <button
              onClick={() => onBook(destination.id)}
              className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-sans font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wide transform active:scale-95 cursor-pointer text-center"
            >
              Book Package Now
            </button>
            <button
              onClick={() => {
                setShowItinerary(!showItinerary);
                const el = document.getElementById(`dest-card-${destination.id}`);
                el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className="px-3.5 py-3 border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 text-slate-755 dark:text-slate-300 font-sans font-semibold text-xs rounded-xl transition-all cursor-pointer bg-transparent"
              aria-label="View comprehensive day itineraries"
            >
              See details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
