import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<'All' | 'General' | 'Booking' | 'Payment' | 'Documents'>('All');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1'); // Expanded first element by default

  const categories: Array<'All' | 'General' | 'Booking' | 'Payment' | 'Documents'> = ['All', 'General', 'Booking', 'Payment', 'Documents'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter(faq => faq.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div id="faq-comp-wrapper" className="space-y-12">
      {/* Header brief */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit mx-auto">
          Frictionless Advising
        </span>
        <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white">
          Frequently Answered Queries
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
          Need specifics regarding customized visa durations, emergency insurance covers, or credit card installations? Dive into our comprehensive categories list below.
        </p>
      </div>

      {/* Category Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-md mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              // reset open selection to avoid empty active selections
              const match = cat === 'All' ? FAQS : FAQS.filter(f => f.category === cat);
              if (match.length > 0) setExpandedId(match[0].id);
            }}
            className={`px-4 py-2 text-xs font-sans font-semibold tracking-wider rounded-xl transition-all cursor-pointer border ${
              activeCategory === cat
                ? 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold'
                : 'bg-white dark:bg-white/5 border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            {cat} {cat === 'All' ? '' : 'Faq'}
          </button>
        ))}
      </div>

      {/* Accordion List Body */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filteredFaqs.map((faq) => {
          const isOpen = expandedId === faq.id;

          return (
            <div
              key={faq.id}
              id={`faq-accordion-item-${faq.id}`}
              className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
            >
              {/* Expand Target Header */}
              <button
                onClick={() => toggleExpand(faq.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-950/40 select-none group"
              >
                <div className="flex items-start gap-3.5">
                  <HelpCircle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <span className="font-sans font-extrabold text-slate-950 dark:text-white text-sm sm:text-base leading-snug group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className="p-1 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expandable answer panel */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? 'max-h-[500px] border-t border-slate-100 dark:border-white/10' : 'max-h-0'
                }`}
              >
                <div className="p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-950/30 text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-sans">
                  {faq.answer}
                  
                  {/* Category Pill Footer inside answer */}
                  <div className="mt-4 flex items-center gap-1.5">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-200 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                      Filed under: {faq.category}
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      Verified Answer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick live support notice */}
      <div className="bg-gradient-to-r from-blue-600/10 to-amber-500/10 border border-white/5 rounded-3xl p-6 sm:p-8 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="p-4 bg-amber-500 rounded-2xl text-slate-950 shrink-0">
          <MessageCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="text-base font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
            Still Have Unanswered Inquiries?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Our luxury advisory team is online. Shoot us a message directly via Google App live channels or on WhatsApp for direct answers.
          </p>
        </div>
      </div>
    </div>
  );
}
