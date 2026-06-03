import React, { useState, useEffect } from 'react';
import { Tag, Calendar, Copy, Check, Ticket, Gift, Clock } from 'lucide-react';
import { SPECIAL_DEAL } from '../data';

interface SpecialOffersProps {
  onClaimDeal: (destinationId: string) => void;
}

export default function SpecialOffers({ onClaimDeal }: SpecialOffersProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const calculateCountdown = () => {
      const difference = +new Date(SPECIAL_DEAL.endsAt) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // Fallback or restart for static showcase purposes inside preview
        // Ensure there is always a countdown showing
        const mockFutureDate = new Date();
        mockFutureDate.setDate(mockFutureDate.getDate() + 18);
        const diff = +mockFutureDate - +new Date();
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(SPECIAL_DEAL.promoCode);
    setCopiedCode(true);
    setTimeout(() => {
      setCopiedCode(false);
    }, 3000);
  };

  return (
    <div id="special-offers-container" className="relative rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl p-8 lg:p-12">
      {/* Background graphic elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none -ml-32 -mb-32" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Text details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-sans font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 animate-bounce" />
            Limited Time Executive Vacancy
          </div>

          <div className="space-y-3">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
              {SPECIAL_DEAL.title}
            </h3>
            <h4 className="text-xl sm:text-2xl font-serif text-amber-400 font-medium">
              {SPECIAL_DEAL.subtitle}
            </h4>
          </div>

          <p className="text-slate-300 font-sans text-base leading-relaxed">
            {SPECIAL_DEAL.discountText}. Access completely pre-negotiated priority villa setups and luxurious itinerary schedules for half the cost. Valid only until timer runs dry.
          </p>

          {/* Countdown timer components */}
          <div className="flex gap-3 sm:gap-4 flex-wrap">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-slate-900/90 border border-white/10 rounded-2xl p-3 w-16 sm:w-20 text-center shadow-md backdrop-blur-md"
              >
                <span className="text-xl sm:text-2xl font-sans font-extrabold text-white block">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-slate-400">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          {/* Promo code actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
            <div className="bg-slate-900 border border-white/15 rounded-2xl p-1.5 flex items-center pr-3 group w-full sm:w-auto">
              <div className="bg-amber-500 text-slate-950 p-2 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1 shrink-0">
                <Ticket className="w-4 h-4" />
                DURING CHECKOUT ENTER
              </div>
              <span className="text-sm font-mono font-bold text-white px-3 flex-grow text-center select-all">
                {SPECIAL_DEAL.promoCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer transition-colors"
                title="Copy voucher code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: Image card and pricing */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group select-none relative">
            <img
              src={SPECIAL_DEAL.imageUrl}
              alt="Bali Island"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Visual gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-6" />

            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white z-10">
              <div>
                <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold block">
                  ALL-INCLUSIVE PROMO PRICE
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-sans font-black text-white">
                    ${SPECIAL_DEAL.dealPrice}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ${SPECIAL_DEAL.originalPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() => onClaimDeal('dest-bali')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs uppercase font-sans font-extrabold rounded-xl transition-all cursor-pointer shadow-lg tracking-wider"
              >
                Claim Package
              </button>
            </div>
          </div>

          {/* Quick trust badge */}
          <div className="absolute -bottom-4 -left-4 bg-slate-900 border border-white/10 p-3.5 rounded-2xl flex items-center gap-2.5 shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-400 block leading-none">
                24-Hour Guarantee
              </span>
              <span className="text-xs font-sans font-bold text-white block mt-0.5">
                Instant Advisor Matching
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
