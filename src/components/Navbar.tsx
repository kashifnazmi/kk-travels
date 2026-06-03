import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Compass, Phone } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  scrollToSection: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  isDarkMode,
  toggleDarkMode,
  scrollToSection,
  onOpenConsultation,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'Packages', id: 'packages' },
    { label: 'Services', id: 'services' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background styling toggle
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll progress indicator calculation
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      id="navbar-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0F172A]/90 text-white backdrop-blur-md shadow-lg border-b border-white/10'
          : 'bg-transparent text-slate-100'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        id="scroll-progress-indicator"
        className="h-[3px] bg-amber-500 transition-all duration-100 ease-out origin-left sticky top-0"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <button
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer group"
          >
            <div className="p-2.5 bg-amber-500 rounded-xl text-slate-950 shadow-md group-hover:bg-amber-400 transition-all duration-300">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div className="text-left">
              <span className="font-sans font-extrabold text-2xl tracking-wide text-white block">
                KK <span className="text-amber-500 group-hover:text-amber-400 transition-colors">Travels</span>
              </span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase block -mt-1">
                Luxury Journeys
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer relative py-2 ${
                  activeTab === item.id
                    ? 'text-amber-500 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              id="theme-toggler"
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-white/10 text-amber-500 hover:text-amber-400 transition-all duration-200 cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>

            {/* CTA Phone Option */}
            <button
              id="join-consultation-btn"
              onClick={onOpenConsultation}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-amber-500 text-white text-sm font-sans font-bold rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-white" />
              Book Consultation
            </button>
          </div>

          {/* Responsive Mobile Toggle Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              id="mobile-theme-toggler"
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 hover:border-white/20 border border-white/10 text-amber-500 transition-all duration-200 cursor-pointer mr-2"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-300" />}
            </button>

            <button
              id="mobile-menu-toggler"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white border border-white/10 transition-all hover:bg-slate-700 cursor-pointer"
              aria-label="Show main navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Mobile Navigation Slide Down */}
      {isOpen && (
        <div id="mobile-nav-menu" className="lg:hidden bg-[#0F172A]/98 backdrop-blur-lg border-b border-white/10">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all font-sans font-medium text-base cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-amber-500/20 text-amber-400 font-semibold border-l-4 border-amber-500 pl-3'
                    : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/10">
              <button
                id="mobile-nav-consultation-btn"
                onClick={() => {
                  setIsOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-amber-500 text-white font-sans font-bold rounded-xl hover:bg-indigo-700 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Book Consulation Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
