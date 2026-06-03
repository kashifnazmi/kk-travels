import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, X, Heart, MessageSquare, ShieldCheck, Share2 } from 'lucide-react';
import { BLOGS } from '../data';
import { BlogPost } from '../types';

export default function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedArticles(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="blog-comp-root" className="space-y-12">
      {/* Title briefs */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit mx-auto">
          KK Travel Insights
        </span>
        <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white">
          Journals, Logs & Packing Manuals
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
          Stay informed with elite preparation briefings penned directly by our senior global expedition coordinators. Learn about hidden locations, seasonal gears, and foreign visa laws.
        </p>
      </div>

      {/* Blogs list grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOGS.map((blog) => {
          const isLiked = !!likedArticles[blog.id];

          return (
            <article
              key={blog.id}
              id={`blog-card-${blog.id}`}
              onClick={() => setActiveArticle(blog)}
              className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full group transform hover:-translate-y-1"
            >
              {/* Picture banner */}
              <div className="relative h-56 overflow-hidden select-none shrink-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] uppercase font-sans font-bold tracking-widest text-slate-950 bg-amber-500 px-3 py-1 rounded-lg shadow-sm">
                  {blog.category}
                </span>
              </div>

              {/* Text content details */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  {/* Meta stats tags */}
                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>

                {/* Writer profiles */}
                <div className="border-t border-slate-100 dark:border-white/10 pt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center border border-white/10 text-slate-400 font-sans font-bold text-xs">
                      {blog.author[0]}
                    </div>
                    <div>
                      <span className="text-xs font-sans font-bold text-slate-900 dark:text-white block leading-none">
                        {blog.author}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {blog.authorRole}
                      </span>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => toggleLike(e, blog.id)}
                      className={`p-2 rounded-lg bg-slate-50 dark:bg-white/10 hover:bg-red-500/10 cursor-pointer hover:text-red-500 transition-colors ${
                        isLiked ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'
                      }`}
                      aria-label="Like story"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                    </button>
                    <span className="text-[11px] font-sans font-bold text-slate-500 hover:text-amber-500 transition-colors flex items-center gap-0.5">
                      Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Expansion Article Overlay Reader */}
      {activeArticle && (
        <div
          id="blog-overlay-story-reader"
          onClick={() => setActiveArticle(null)}
          className="fixed inset-0 z-55 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-8"
          >
            {/* Top Close indicator */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-20 p-2.5 bg-slate-950/70 hover:bg-slate-950 text-slate-400 hover:text-white rounded-xl border border-white/10 transition-all cursor-pointer"
              aria-label="Close story log reader"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Thumbnail */}
            <div className="relative h-64 sm:h-72 w-full select-none">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] uppercase font-mono tracking-widest bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded-md mb-2 inline-block">
                  {activeArticle.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-white leading-tight">
                  {activeArticle.title}
                </h3>
              </div>
            </div>

            {/* Complete content display block */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto dark-scrollbar">
              {/* Writer Header details */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 text-amber-500 font-sans font-extrabold">
                    {activeArticle.author[0]}
                  </div>
                  <div>
                    <span className="text-sm font-sans font-extrabold text-white block">
                      {activeArticle.author}
                    </span>
                    <span className="text-xs font-mono text-slate-400 block">
                      {activeArticle.authorRole}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-amber-500" /> {activeArticle.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-amber-500" /> {activeArticle.readTime}
                  </span>
                </div>
              </div>

              {/* Main Essay */}
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans first-letter:text-4xl first-letter:font-extrabold first-letter:text-amber-500 first-letter:float-left first-letter:mr-2">
                  {activeArticle.content}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed font-sans mt-4">
                  Planning an expedition under similar conditions requires extensive preparation. Learn how KK Travels secures custom logistics, fine boutique stays, and dedicated multi-lingual native guides for every custom route. Use of authorized materials requires attribution.
                </p>
              </div>

              {/* Share & Trust seals */}
              <div className="border-t border-white/5 pt-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorized preparation briefing</span>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Log link copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-xs font-sans font-bold border border-white/10 rounded-xl text-slate-3 w flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Story</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
