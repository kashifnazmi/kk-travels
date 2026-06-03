import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Calendar,
  Users,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  ArrowUp,
  Sparkles,
  CheckCircle2,
  Building,
  Heart,
  Compass,
  ArrowRight
} from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import DestinationCard from './components/DestinationCard.tsx';
import BookingModal from './components/BookingModal.tsx';
import GallerySection from './components/GallerySection.tsx';
import SpecialOffers from './components/SpecialOffers.tsx';
import ServicesSection from './components/ServicesSection.tsx';
import FaqSection from './components/FaqSection.tsx';
import BlogSection from './components/BlogSection.tsx';
import AboutSection from './components/AboutSection.tsx';
import { DESTINATIONS } from './data';
import { PackageCategory } from './types';

export default function App() {
  // Navigation Tabs state
  const [activeTab, setActiveTab] = useState('home');

  // Theme states
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const stored = localStorage.getItem('kk_travels_dark_mode');
    if (stored) return stored === 'true';
    return true; // Executive premium dark mode active by default
  });

  // Modal actions
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDestId, setSelectedDestId] = useState<string | undefined>(undefined);

  // Search parameter inputs state
  const [searchDest, setSearchDest] = useState('');
  const [searchCategory, setSearchCategory] = useState<string>('All');
  const [searchMonth, setSearchMonth] = useState('All');
  const [searchGuests, setSearchGuests] = useState('2');

  // Main active package filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSearchQuery, setActiveSearchQuery] = useState('');

  // Floating helper states
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
    { sender: 'agent', text: 'Hi! I am Rohan, your personal KK Travels concierge. What gorgeous country are we exploring next?', time: 'Just now' }
  ]);
  const [hasSentChat, setHasSentChat] = useState(false);

  // Active Map Pin location
  const [activeMapPin, setActiveMapPin] = useState<string | null>('india');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('General Vacation Tour Planning');
  const [contactMessage, setContactMessage] = useState('');
  const [isContactSuccess, setIsContactSuccess] = useState(false);

  // Sync dark theme
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('kk_travels_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Handle scroll to top threshold
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarOffset = 80;
      const elementPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Run tour criteria search filter
  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedCategory(searchCategory);
    setActiveSearchQuery(searchDest);
    setIsBookingOpen(false);
    scrollToSection('packages');
  };

  // Filter package matching rules
  const matchingDestinations = DESTINATIONS.filter((item) => {
    // Search input keyword check
    const matchesKeyword =
      activeSearchQuery === '' ||
      item.title.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(activeSearchQuery.toLowerCase());

    // Category check
    let matchesCategory = true;
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'International') {
        matchesCategory = item.category === 'International' || item.category === 'Honeymoon' || item.id.includes('bali') || item.id.includes('swiss') || item.id.includes('maldives') || item.id.includes('kyoto');
      } else if (selectedCategory === 'Domestic') {
        matchesCategory = item.category === 'Domestic' || item.id.includes('leh') || item.id.includes('kerala') || item.id.includes('rajasthan') || item.id.includes('varanasi');
      } else {
        // Direct category enum map
        matchesCategory = item.category.toLowerCase().includes(selectedCategory.toLowerCase());
      }
    }

    return matchesKeyword && matchesCategory;
  });

  const triggerBookingModal = (destId?: string) => {
    setSelectedDestId(destId);
    setIsBookingOpen(true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = chatMessage;
    setChatLog((prev) => [...prev, { sender: 'user', text: userMsg, time: timestamp }]);
    setChatMessage('');

    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `Ah! Designing an expedition for that sounds splendid. Let me flag my regional itinerary lead so we can reach you with personalized luxury options. I will text you on WhatsApp within 10 minutes.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setHasSentChat(true);
    }, 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactPhone) return;

    setIsContactSuccess(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
      setIsContactSuccess(false);
    }, 6000);
  };

  const mapLocations: Record<string, { city: string; role: string; address: string; phone: string; email: string; localTime: string }> = {
    india: {
      city: 'Signature Plaza Kanpur (HQ)',
      role: 'Global HQ & Ticketing Consolidation',
      address: 'Suite 402, Signature Plaza, Mall Road, Kanpur, Uttar Pradesh, India',
      phone: '+91-82996-49495',
      email: 'corp@kktravels.example.com',
      localTime: '8:30 PM (IST)'
    },
    swiss: {
      city: 'Alpine Operations Center',
      role: 'Europe Logistics & Snow Chalets Coordinator',
      address: 'Höheweg 37, Interlaken, Switzerland',
      phone: '+41-33-826-1212',
      email: 'swiss@kktravels.example.com',
      localTime: '4:00 PM (CET)'
    },
    bali: {
      city: 'Seminyak Liaison Office',
      role: 'South East Asia Private Villas & Heli-Tours',
      address: 'Jalan Raya Seminyak No.119, Kuta Badung, Bali, Indonesia',
      phone: '+62-361-730008',
      email: 'bali@kktravels.example.com',
      localTime: '11:00 PM (WITA)'
    },
    maldives: {
      city: 'Hulhumale Atoll Office',
      role: 'Overwater Bungalow Contracts & Seaplane Links',
      address: 'Lot 10427, Kelaa Magu, Hulhumale, Maldives',
      phone: '+960-335-5123',
      email: 'maldives@kktravels.example.com',
      localTime: '8:00 PM (MVT)'
    }
  };

  return (
    <div id="app-landing-root" className="min-h-screen bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-colors duration-300 transition-all font-sans antialiased relative overflow-hidden">
      {/* Background Elegant Dark Decorative Elements */}
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none hidden dark:block z-0" />
      <div className="absolute bottom-[-150px] left-[-150px] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none hidden dark:block z-0" />

      {/* Sticky Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        scrollToSection={scrollToSection}
        onOpenConsultation={() => triggerBookingModal()}
      />

      {/* Main Sections */}
      <main className="pt-0 relative z-10">

        {/* 1. HERO SECTION */}
        <section
          id="home"
          className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden select-none"
        >
          {/* Immersive background graphic */}
          <div className="absolute inset-0 z-0 bg-[#0F172A]">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
              alt="Luxury Caribbean Shoreline"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60 mix-blend-color-dodge brightness-75 scale-102"
            />
            {/* Dark radial glow map */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 w-full">
            {/* Elegant upper flag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs tracking-widest font-sans font-bold uppercase backdrop-blur-md animate-float">
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>Beside You on Every Horizon</span>
            </div>

            {/* Headline elements */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-black text-white tracking-tight leading-none">
                Explore The World <br />
                With <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">KK Travels</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-xl text-slate-300 leading-relaxed font-sans max-w-2xl mx-auto font-light">
                Premium global bespoke tours curated with absolute flight channels, five-star hotel partner rates, private chauffeured logistics, and dedicated regional guides.
              </p>
            </div>

            {/* Call to Actions quick buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => scrollToSection('packages')}
                className="px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-extrabold text-sm rounded-xl transition-all shadow-xl hover:shadow-amber-500/20 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Discover Hot Packages &rarr;
              </button>
              <button
                onClick={() => triggerBookingModal()}
                className="px-7 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 font-sans font-medium text-sm rounded-xl transition-all backdrop-blur-sm cursor-pointer"
              >
                Inquire Consultation
              </button>
            </div>

            {/* Elegant Search Form Widget */}
            <div id="search-bar-anchor" className="max-w-4xl mx-auto bg-slate-950/80 border border-white/10 p-5 rounded-3xl shadow-2xl backdrop-blur-md">
              <form onSubmit={handleHeroSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
                
                {/* Search Target Name */}
                <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                  <label htmlFor="hero-dest" className="text-[10px] sm:text-xs font-sans font-extrabold tracking-wider text-amber-500 uppercase flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5" /> Destination
                  </label>
                  <input
                    type="text"
                    id="hero-dest"
                    placeholder="e.g. Bali, Swiss Alps"
                    value={searchDest}
                    onChange={(e) => setSearchDest(e.target.value)}
                    className="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-0 cursor-text"
                  />
                </div>

                {/* Search Select Category */}
                <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                  <label htmlFor="hero-cat" className="text-[10px] sm:text-xs font-sans font-extrabold tracking-wider text-amber-500 uppercase flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Package Type
                  </label>
                  <select
                    id="hero-cat"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none border-none select-none cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900 text-white">All Options</option>
                    <option value="Domestic" className="bg-slate-900 text-white">Domestic Tour</option>
                    <option value="International" className="bg-slate-900 text-white">International Tour</option>
                    <option value="Family" className="bg-slate-900 text-white">Family Special</option>
                    <option value="Honeymoon" className="bg-slate-900 text-white">Honeymoon Package</option>
                    <option value="Adventure" className="bg-slate-900 text-white">Adventure Trek</option>
                    <option value="Religious" className="bg-slate-900 text-white">Religious Holy</option>
                  </select>
                </div>

                {/* Travel Month selection */}
                <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-4">
                  <label htmlFor="hero-month" className="text-[10px] sm:text-xs font-sans font-extrabold tracking-wider text-amber-500 uppercase flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> Month
                  </label>
                  <select
                    id="hero-month"
                    value={searchMonth}
                    onChange={(e) => setSearchMonth(e.target.value)}
                    className="w-full bg-transparent text-sm text-white focus:outline-none border-none outline-none select-none cursor-pointer"
                  >
                    <option value="All" className="bg-slate-900 text-white">Any Month (2026)</option>
                    <option value="Jun" className="bg-slate-900 text-white">June 2026</option>
                    <option value="Jul" className="bg-slate-900 text-white">July 2026</option>
                    <option value="Aug" className="bg-slate-900 text-white">August 2026</option>
                    <option value="Sep" className="bg-slate-900 text-white">September 2026</option>
                  </select>
                </div>

                {/* Big Search CTA */}
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-full h-12 bg-amber-500 hover:bg-amber-400 text-slate-105 font-sans font-extrabold text-sm rounded-xl shadow-lg transition-all transform hover:scale-[1.03] cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Search className="w-4 h-4 group-hover:scale-115 transition-transform" />
                    <span>Search Tours</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Quick trust metrics line */}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-6 sm:gap-12 text-slate-400 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Authorized IATA Partner
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Secure SSL Ledger
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Rated 4.95/5 on HolidayCheck
              </span>
            </div>

          </div>
        </section>

        {/* 2. ABOUT US STORY & ACHIEVEMENTS */}
        <section id="about" className="py-24 bg-white dark:bg-[#0F172A] border-t border-slate-100 dark:border-white/5 transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutSection />
          </div>
        </section>

        {/* 3. POPULAR DESTINATIONS & 4. TOUR PACKAGES COMPREHENSIVE ENGINE */}
        <section id="destinations" className="py-24 bg-slate-50 dark:bg-[#0B0F19] transition-colors relative z-10">
          <div id="packages" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header titles */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-slate-100 dark:border-white/5 pb-6">
              <div className="space-y-3">
                <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit">
                  KK Live Vacation Matrix
                </span>
                <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                  Curated Domestic &amp; International Packages
                </h2>
                <p className="text-slate-500 dark:text-slate-400 font-sans text-sm max-w-xl">
                  Filter packages by category constraints or run quick text queries. Click on schedules to preview comprehensive day-by-day programs.
                </p>
              </div>

              {/* Inline query search input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Query by title or tag..."
                  value={activeSearchQuery}
                  onChange={(e) => {
                    setActiveSearchQuery(e.target.value);
                    scrollToSection('packages');
                  }}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 pl-11 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* Main Interactive Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All Packages', key: 'All' },
                { label: 'Domestic', key: 'Domestic' },
                { label: 'International', key: 'International' },
                { label: 'Family Package', key: 'Family' },
                { label: 'Honeymoon Package', key: 'Honeymoon' },
                { label: 'Adventure', key: 'Adventure' },
                { label: 'Religious', key: 'Religious' },
              ].map((pill) => (
                <button
                  key={pill.key}
                  onClick={() => setSelectedCategory(pill.key)}
                  className={`px-4.5 py-2.5 rounded-xl text-xs font-sans font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === pill.key
                      ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/10'
                      : 'bg-white dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-250/50 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Tour list grid rendering */}
            {matchingDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {matchingDestinations.map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onBook={(id) => triggerBookingModal(id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-3xl p-12 text-center space-y-4 max-w-md mx-auto shadow-sm">
                <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded-full text-slate-400 dark:text-slate-500 w-16 h-16 flex items-center justify-center mx-auto">
                  <Compass className="w-8 h-8 animate-spin-slow" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-slate-900 dark:text-white text-lg">
                    No Matching Tour Found
                  </h3>
                  <p className="text-sm text-slate-400 font-sans mt-0.5">
                    We could not find matching active lists for keywords "{activeSearchQuery}". Let's clear parameters to look again.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-5 py-2.5 bg-slate-900 dark:bg-slate-850 hover:bg-slate-800 text-white font-sans text-xs font-bold rounded-xl cursor-pointer"
                >
                  Clear search filters &amp; Reset
                </button>
              </div>
            )}

          </div>
        </section>

        {/* 6. SPECIAL HOLIDAY OFFERS (Bali Countdown and Promo voucher) */}
        <section id="special-offers" className="py-24 bg-white dark:bg-[#0F172A] border-t border-b border-slate-100 dark:border-white/5 transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SpecialOffers onClaimDeal={triggerBookingModal} />
          </div>
        </section>

        {/* 5. TRAVEL SERVICES CATALOG */}
        <section id="services" className="py-24 bg-slate-55 dark:bg-[#0B0F19] transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ServicesSection />
          </div>
        </section>

        {/* 8. GALLERY MASONRY LIGHTBOX */}
        <section id="gallery" className="py-24 bg-white dark:bg-[#0F172A] border-b border-slate-100 dark:border-white/5 transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <GallerySection />
          </div>
        </section>

        {/* 7. CUSTOMER TESTIMONIALS */}
        <section id="testimonials" className="py-24 bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-100 dark:border-white/5 transition-all relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {/* Header titles */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit mx-auto">
                Client Success Stories
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 dark:text-white">
                Smiles Recorded Worldwide
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
                Read direct feedbacks from real family organizers, honey-moon couples, and international travelers who choose KK Travels for pristine logistics execution.
              </p>
            </div>

            {/* Testimonials grid layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
              {[
                {
                  quote: 'KK Travels exceeded our wildest dreams! Our Bali honeymoon felt like a complete royal fairytale inside private lagoons. Their 24/7 WhatsApp concierge was a absolute lifesaver when choosing sunset cafes.',
                  name: 'Clarissa Jenkins',
                  role: 'Bespoke Travel Journalist',
                  location: 'New York, USA',
                  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
                  stars: 5
                },
                {
                  quote: 'For our annual multi-generational family tour across Rajasthan forts, KK Travels was outstanding. Handled senior citizen safety and infant milk requests flawlessly. The heritage palace hotel recommendations were immaculate.',
                  name: 'Rajesh Malhotra',
                  role: 'Director, Malhotra Engineering Corp',
                  location: 'New Delhi, India',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
                  stars: 5
                },
                {
                  quote: 'The Swiss trains and chalet hotels organized by KK Travels were pure paradise. Riding the Glacier Express with priority seats and champagne was breathtaking. They absolutely live up to their 5-star reputation.',
                  name: 'Oliver Sterling',
                  role: 'Luxury Outfitting Advisor',
                  location: 'London, UK',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
                  stars: 5
                }
              ].map((test, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 p-6 sm:p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
                >
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-350 italic font-medium">
                    &ldquo;{test.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-3.5 border-t border-slate-100 dark:border-white/5">
                    {/* Picture */}
                    <img
                      src={test.image}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="text-sm font-sans font-extrabold text-slate-905 dark:text-white leading-none">
                        {test.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 block mt-1">
                        {test.role} &bull; {test.location}
                      </span>
                      {/* Star rating icons */}
                      <div className="flex gap-0.5 mt-1.5 text-amber-500">
                        {Array.from({ length: test.stars }).map((_, sIdx) => (
                          <svg
                            key={sIdx}
                            className="w-3.5 h-3.5 fill-amber-500 text-amber-500"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10 15l-5.88 3.09 1.12-6.54L.48 6.91l6.57-.96L10 0l2.95 5.95 6.57.96-4.76 4.64 1.12 6.54z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 9. FAQ ACCORDION ACCENT PANEL */}
        <section id="faqs" className="py-24 bg-white dark:bg-[#0F172A] border-b border-slate-100 dark:border-white/5 transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FaqSection />
          </div>
        </section>

        {/* KK Travel Insights / Blog Section */}
        <section id="blog" className="py-24 bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-100 dark:border-white/5 transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSection />
          </div>
        </section>

        {/* 10. CONTACT CHANNELS & INTERACTIVE SVG WORLD MAP OFFICE */}
        <section id="contact" className="py-24 bg-white dark:bg-[#0F172A] transition-colors relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Header titles */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-amber-500 font-sans text-xs uppercase font-extrabold tracking-widest block bg-amber-500/5 py-1.5 px-3 rounded-full border border-amber-500/10 w-fit mx-auto">
                Global Travel Consulates
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-905 dark:text-white">
                Let's Design Your Next Vacation Blueprint
              </h2>
              <p className="text-slate-600 dark:text-slate-400 font-sans text-base leading-relaxed">
                Connect with our certified regional advisors directly through the instant consultation dispatch below, or visit any of our four physical international branches listed.
              </p>
            </div>

            {/* Grid details: left column interactive SVG partner hubs, right column contact form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Interactive hub map */}
              <div className="lg:col-span-6 space-y-8">
                <div className="bg-slate-50 dark:bg-[#0B0F19]/90 border border-slate-100 dark:border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Interactive KK Partner Grid
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-sans">
                      Select glowing partner coordinates inside Europe, paradise islands, or our main Delhi capital headquarters to access localized hotlines and hours.
                    </p>
                  </div>

                  {/* HIGH TECH CUSTOM SVG VECTOR MAP */}
                  <div className="relative aspect-[16/9] bg-slate-900 dark:bg-[#0F172A]/80 border border-white/10 rounded-2xl overflow-hidden p-4 select-none shadow-inner flex items-center justify-center">
                    <svg
                      viewBox="0 0 1000 500"
                      className="w-full h-full opacity-40 mix-blend-screen text-slate-400 dark:text-slate-700"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Stylized geometric grid coordinates */}
                      <path d="M 0,50 L 1000,50 M 0,100 L 1000,100 M 0,150 L 1000,150 M 0,200 L 1000,200 M 0,250 L 1000,250 M 0,300 L 1000,300 M 0,350 L 1000,350 M 0,400 L 1000,400 M 0,450 L 1000,450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />
                      <path d="M 100,0 L 100,500 M 200,0 L 200,500 M 300,0 L 300,500 M 400,0 L 400,500 M 500,0 L 500,500 M 600,0 L 600,500 M 700,0 L 700,500 M 800,0 L 800,500 M 900,0 L 900,500" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />

                      {/* Abstract Continents outlines */}
                      {/* Europe */}
                      <path d="M 460,110 C 480,120 520,110 540,140 C 530,160 500,170 480,180 C 460,160 450,130 460,110 Z" fill="currentColor" opacity="0.5" />
                      {/* Asia with Subcontinent */}
                      <path d="M 540,140 C 580,110 650,150 720,130 C 780,120 830,155 850,220 C 820,240 780,210 740,245 C 720,265 680,240 660,260 C 650,290 620,285 590,260 C 580,240 560,260 550,225 C 570,190 550,160 540,140 Z" fill="currentColor" opacity="0.5" />
                      {/* Indian Peninsula */}
                      <path d="M 590,260 L 610,310 L 631,260 Z" fill="currentColor" opacity="0.6" />
                      {/* Indonesia & Bali islands dots */}
                      <circle cx="670" cy="350" r="12" fill="currentColor" opacity="0.6" />
                      <circle cx="690" cy="340" r="14" fill="currentColor" opacity="0.5" />
                      {/* Maldives isolated bubble dot */}
                      <circle cx="580" cy="352" r="10" fill="currentColor" opacity="0.5" />

                      {/* Glow Lines linking HQ to offices */}
                      <path d="M 610,270 Q 550,220 500,160" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
                      <path d="M 610,270 Q 640,310 680,340" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
                      <path d="M 610,270 Q 590,310 580,345" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="5,5" opacity="0.4" />
                    </svg>

                    {/* INTERACTIVE GLOWING COORDINATE PINS POSITIONED RELATIVELY */}
                    {/* Pin 1: India HQ */}
                    <button
                      type="button"
                      onClick={() => setActiveMapPin('india')}
                      className="absolute top-[54%] left-[60%] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-20 group"
                      title="Branch: India HQ"
                    >
                      <span className="absolute inline-flex h-6 w-6 rounded-full bg-amber-500/40 animate-ping" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500 border border-slate-900 shadow-md transform group-hover:scale-125 transition-transform" />
                    </button>

                    {/* Pin 2: Switzerland */}
                    <button
                      type="button"
                      onClick={() => setActiveMapPin('swiss')}
                      className="absolute top-[32%] left-[49%] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-20 group"
                      title="Branch: Switzerland"
                    >
                      <span className="absolute inline-flex h-5 w-5 rounded-full bg-blue-500/40 animate-ping" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 border border-slate-900 shadow-md transform group-hover:scale-125 transition-transform" />
                    </button>

                    {/* Pin 3: Bali */}
                    <button
                      type="button"
                      onClick={() => setActiveMapPin('bali')}
                      className="absolute top-[68%] left-[67%] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-20 group"
                      title="Branch: Bali Island"
                    >
                      <span className="absolute inline-flex h-5 w-5 rounded-full bg-emerald-500/40 animate-ping" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-slate-900 shadow-md transform group-hover:scale-125 transition-transform" />
                    </button>

                    {/* Pin 4: Maldives */}
                    <button
                      type="button"
                      onClick={() => setActiveMapPin('maldives')}
                      className="absolute top-[69%] left-[57%] -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none z-20 group"
                      title="Branch: Male, Maldives"
                    >
                      <span className="absolute inline-flex h-5 w-5 rounded-full bg-cyan-700/40 animate-ping" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border border-slate-900 shadow-md transform group-hover:scale-125 transition-transform" />
                    </button>

                    {/* Active pin label overlay map */}
                    <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[10px] uppercase font-mono tracking-widest border border-white/10 px-2 py-0.5 rounded-md">
                      ACTIVE ADVISOR SYSTEM GATES
                    </div>
                  </div>

                  {/* Office Coordinates Panel Detail synced with activeMapPin */}
                  {activeMapPin && mapLocations[activeMapPin] && (
                    <div id="map-pin-detail-output" className="p-5 bg-white dark:bg-[#0F172A] border border-slate-205/40 dark:border-white/10 rounded-2xl shadow-sm space-y-3 animate-fade-in text-left">
                      <div className="flex justify-between items-start border-b border-slate-100 dark:border-white/5 pb-2.5">
                        <div>
                          <span className="text-[10px] font-mono tracking-wider text-amber-500 uppercase font-bold block">
                            {mapLocations[activeMapPin].role}
                          </span>
                          <h4 className="text-base font-sans font-extrabold text-slate-905 dark:text-white mt-0.5">
                            {mapLocations[activeMapPin].city}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-900 text-slate-550 dark:text-slate-400 px-2 py-0.5 rounded-md shrink-0">
                          Local: {mapLocations[activeMapPin].localTime}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed font-sans">
                        <div className="space-y-1">
                          <span className="text-slate-400 block font-light">Office Address:</span>
                          <span className="text-slate-800 dark:text-slate-300 font-medium">
                            {mapLocations[activeMapPin].address}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <span className="text-slate-400 block font-light">Direct Telephone:</span>
                            <a href={`tel:${mapLocations[activeMapPin].phone}`} className="text-amber-500 hover:underline font-semibold block">
                              {mapLocations[activeMapPin].phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-light">Assigned Mail Desk:</span>
                            <a href={`mailto:${mapLocations[activeMapPin].email}`} className="text-amber-500 hover:underline font-semibold block">
                              {mapLocations[activeMapPin].email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: High Fidelity Contact Form */}
              <div className="lg:col-span-6">
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl p-6 sm:p-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-sans font-extrabold text-slate-900 dark:text-white tracking-tight">
                      Instant Expert Consultation Form
                    </h3>
                    <p className="text-xs text-slate-450 font-sans mt-0.5">
                      Have raw questions or custom itineraries you want drafted? File your fields. Certified leads will contact you in under 10 minutes.
                    </p>
                  </div>

                  {isContactSuccess ? (
                    <div id="contact-success-banner" className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-3.5">
                      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle2 className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-base font-sans font-extrabold text-white">
                          Enquiry Registered Successfully!
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto mt-1">
                          Consulate Dispatch System has logged your verification keys. Advisor Rohan has been tagged of your request. Prepare for custom callbacks shortly.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      
                      {/* Name input */}
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />

                      {/* Coordinates row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-205/60 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number (WhatsApp preferred)"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-205/60 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      {/* Subject dropdown selection */}
                      <div className="space-y-1">
                        <label htmlFor="contact-subj" className="text-[10px] uppercase font-sans font-bold text-slate-400 tracking-widest pl-1">
                          Inquiry Subject Category
                        </label>
                        <select
                          id="contact-subj"
                          value={contactSubject}
                          onChange={(e) => setContactSubject(e.target.value)}
                          className="w-full bg-white dark:bg-slate-950 border border-slate-205/60 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                        >
                          <option value="General Vacation Tour Planning">General Vacation Tour Planning</option>
                          <option value="Custom Bespoke Itinerary Customization">Custom Bespoke Itinerary Customization</option>
                          <option value="Corporate/Group MICE Packages">Corporate/Group MICE Packages</option>
                          <option value="Urgent Consolidated Air Tickets Quote">Urgent Consolidated Air Tickets Quote</option>
                          <option value="Immigration or Business Visa Support">Immigration or Business Visa Support</option>
                        </select>
                      </div>

                      {/* Inquiries text comments */}
                      <textarea
                        rows={3.5}
                        placeholder="Write down details here... (e.g. 'I am organizing an 8 pax family trip across Kashmir next August...')"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        className="w-full bg-white dark:bg-slate-950 border border-slate-205/60 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />

                      {/* Big Submit CTA button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-sans font-extrabold text-sm rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10 cursor-pointer flex items-center justify-center gap-2 transform active:scale-98"
                      >
                        <Send className="w-4.5 h-4.5" />
                        <span>Register Inquiry & Arrange Callback</span>
                      </button>

                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SITE MAP LINKS & LEGAL */}
      <Footer
        scrollToSection={scrollToSection}
        onOpenConsultation={() => triggerBookingModal()}
      />

      {/* Floating Widget 1: Back To Top Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-floating"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 p-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-2xl shadow-2xl transition-all hover:-translate-y-1 cursor-pointer z-40 active:scale-95 border border-amber-600/20"
          aria-label="Scroll back layout to top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}

      {/* Floating Widget 2: Interactive WhatsApp Concierge Chat Drawer */}
      <div id="whatsapp-floating-bracket" className="fixed bottom-6 left-6 z-45">
        
        {/* Glowing floating launcher button */}
        <button
          type="button"
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`p-4 rounded-full shadow-2xl transition-all hover:scale-105 active:scale-92 cursor-pointer relative z-50 flex items-center justify-center border ${
            isChatOpen
              ? 'bg-slate-950 border-white/10 text-white'
              : 'bg-emerald-500 hover:bg-emerald-400 border-emerald-600/10 text-white animate-float'
          }`}
          aria-label="Chat with travel counselor Rohan on WhatsApp"
        >
          {/* Unread message count badge */}
          {!hasSentChat && !isChatOpen && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[9px] font-mono font-bold text-white flex items-center justify-center animate-pulse">
              1
            </span>
          )}
          <MessageSquare className="w-6 h-6 shrink-0" />
        </button>

        {/* Floating Chat Drawer box */}
        {isChatOpen && (
          <div
            id="whatsapp-chat-drawer"
            className="absolute bottom-16 left-0 w-80 bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 animate-fade-in text-left"
          >
            {/* Drawer Header info */}
            <div className="p-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-white/20 text-white flex items-center justify-center text-sm font-sans font-extrabold shadow-md">
                  RS
                </div>
                {/* Active marker dot */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>
              
              <div className="leading-tight">
                <h4 className="text-sm font-sans font-black text-white">Rohan Sharma</h4>
                <p className="text-[10px] font-mono text-emerald-200">KK Destination Counselor</p>
                <span className="text-[9px] text-white opacity-80 flex items-center gap-1 mt-0.5">
                  &bull; Online &bull; Replies in 2 mins
                </span>
              </div>
            </div>

            {/* Chat Messages flow list log */}
            <div className="p-4 h-56 overflow-y-auto space-y-3 bg-slate-950/80 dark-scrollbar flex flex-col justify-end">
              {chatLog.map((log, idx) => {
                const isAgent = log.sender === 'agent';
                return (
                  <div
                    key={idx}
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-1 ${
                      isAgent
                        ? 'bg-slate-900 text-slate-300 self-start border border-white/5 rounded-tl-none'
                        : 'bg-emerald-500 text-slate-950 font-medium self-end rounded-tr-none'
                    }`}
                  >
                    <p className="font-sans">{log.text}</p>
                    <span className={`text-[8px] block text-right mt-1 ${isAgent ? 'text-slate-500 font-mono' : 'text-slate-950/50'}`}>
                      {log.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Private Input field form inline typing send */}
            <form onSubmit={handleSendMessage} className="p-2 border-t border-white/5 bg-slate-900 flex gap-1.5 items-center">
              <input
                type="text"
                required
                placeholder="Type your destination query..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-2xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 flex-grow"
              />
              <button
                type="submit"
                className="p-2 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all cursor-pointer shadow-md shrink-0 flex items-center justify-center"
                aria-label="Send WhatsApp mock massage"
              >
                <Send className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Universal Booking inquiries Form Modal Dialog Popup */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedDestinationId={selectedDestId}
      />
    </div>
  );
}
