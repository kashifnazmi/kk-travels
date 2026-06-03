import React, { useState, useEffect } from 'react';
import { Award, Shield, Sparkles, Building, Star, CheckCircle } from 'lucide-react';
import { STATS } from '../data';

export default function AboutSection() {
  const [counts, setCounts] = useState(STATS.map(() => 0));

  useEffect(() => {
    // Simulating animated counting speed indicators
    const duration = 2000; // 2 seconds total animation
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts(
        STATS.map((stat) => {
          const currentVal = Math.min(stat.value, Math.round((stat.value / steps) * step));
          return currentVal;
        })
      );

      if (step >= steps) {
        clearInterval(timer);
        setCounts(STATS.map((stat) => stat.value)); // Guarantee absolute values are precise
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const valueCards = [
    {
      icon: Award,
      title: '5-Star Hospitality Partners',
      description: 'We ignore standard tourist class blocks. We maintain priority booking arrangements with curated leading luxury stays and exclusive mountain chalet estates.',
    },
    {
      icon: Shield,
      title: 'Uncompromising Safety Standards',
      description: 'Complete peace of mind. Every group movement operates inside high-grade satellite tracked fleets with certified medical guides and robust international plans.',
    },
    {
      icon: Sparkles,
      title: '100% Customized Blueprints',
      description: 'Your hobbies drive your route. Whether you require standard sea surfing guides, traditional local kimonos, or premium heli-services, we configure it.',
    },
  ];

  return (
    <div id="about-section-container" className="space-y-16">
      {/* Upper grid panel: Briefing story and Core value cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Story */}
        <div className="lg:col-span-6 space-y-6">
          <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit">
            Our Heritage Story
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            KK Travels &mdash; Crafting Lifelong Expeditions Since 2011
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
            Founded with a clear, humble vision: to bridge the gap between structured commercial itineraries and true, organic travel. At KK Travels, we treat travel not as transactional lodging, but as an ongoing story of personal discovery and mutual connection.
          </p>
          <p className="text-slate-600 dark:text-slate-400 font-sans text-sm leading-relaxed">
            Every Single Tour includes native Multi-lingual concierges, personal drivers, fully comprehensive health covers, and complete flexibility. We operate in over 30 countries with trusted ground experts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Direct-To-Hotel Wholesale Rates',
              'Custom proposed blueprints in 2 hrs',
              '99.4% Tourist Visa Clearance rate',
              'Certified local Multi-lingual Guides',
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Core Strengths */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            {valueCards.map((card, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl p-5 flex gap-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.01]"
              >
                <div className="p-3 bg-amber-500/10 dark:bg-amber-500/5 rounded-xl text-amber-500 shrink-0 h-fit">
                  <card.icon className="w-5 h-5 shrink-0" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans font-extrabold text-slate-900 dark:text-white text-base">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Counter Stats Panel Section */}
      <div className="bg-[#0B0F19]/90 rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden select-none">
        {/* Background glow overlay */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 text-center">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-baseline justify-center gap-0.5">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {counts[idx]}
                </span>
                <span className="text-xl sm:text-2xl font-sans font-extrabold text-amber-500">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs uppercase font-sans font-bold tracking-widest text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
