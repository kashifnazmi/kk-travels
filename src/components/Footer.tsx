import React, { useState } from 'react';
import { Compass, Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  scrollToSection: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export default function Footer({ scrollToSection, onOpenConsultation }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="bg-[#0B0F19] text-slate-400 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-amber-500 rounded-lg text-slate-950">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-sans font-extrabold text-xl tracking-wide text-white">
                KK <span className="text-amber-500">Travels</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Crafting state-of-the-art luxury and custom tours since 2011. We specialize in curating off-beat, magnificent, and highly safe experiential packages globally.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 transition-all duration-300"
                aria-label="Visit our Facebook profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 transition-all duration-300"
                aria-label="Visit our Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 border border-white/10 transition-all duration-300"
                aria-label="Visit our Twitter profile"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick navigation */}
          <div>
            <h3 className="font-sans font-semibold text-white tracking-wider text-base uppercase mb-6 border-b border-white/10 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'Home Page', id: 'home' },
                { label: 'About Story', id: 'about' },
                { label: 'Superb Destinations', id: 'destinations' },
                { label: 'Bespoke Packages', id: 'packages' },
                { label: 'Our Services', id: 'services' },
                { label: 'Photo Gallery', id: 'gallery' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-amber-500 hover:translate-x-1 transition-all duration-200 focus:outline-none cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-white tracking-wider text-base uppercase mb-6 border-b border-white/10 pb-2">
              Contact Desk
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <span>
                  Suite 402, Signature Plaza, Mall Road, Kanpur, Uttar Pradesh, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="tel:+918299649495" className="hover:text-amber-500 transition-colors">
                  +91-82996-49495
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <a href="mailto:info@kktravels.example.com" className="hover:text-amber-500 transition-colors">
                  info@kktravels.example.com
                </a>
              </li>
            </ul>
            <button
              onClick={onOpenConsultation}
              className="mt-2 text-xs text-amber-500 hover:text-amber-400 font-bold border border-amber-500/30 hover:border-amber-500 rounded-lg px-4 py-2 transition-all cursor-pointer inline-flex items-center gap-1 bg-amber-500/5"
            >
              Request Custom Quote &rarr;
            </button>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-sans font-semibold text-white tracking-wider text-base uppercase mb-6 border-b border-white/10 pb-2">
              Newsletter
            </h3>
            <p className="text-sm text-slate-400">
              Subscribe to unlock secret customized discounts (up to 30%) and seasonal travel newsletters.
            </p>
            {isSubscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl flex items-center gap-2 text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed! Check your inbox soon for discounts.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-xl transition-all font-bold shrink-0 shadow-lg cursor-pointer flex items-center justify-center hover:scale-105"
                  aria-label="Subscribe newsletter submit"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
            <span className="text-[10px] text-slate-600 block mt-2">
              We value privacy strictly and share no spam. Unsubscribe anytime.
            </span>
          </div>

        </div>

        {/* Bottom Bar: Copyright and signature */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0">
          <p className="text-slate-500 font-sans">
            &copy; {currentYear} KK Travels Private Limited. All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-slate-500">
            <a href="#terms" className="hover:text-amber-500 transition-colors">
              Terms of Service
            </a>
            <a href="#privacy" className="hover:text-amber-500 transition-colors text-slate-500">
              Privacy Policy
            </a>
            <a href="#licensing" className="hover:text-amber-500 transition-colors text-slate-500">
              Sitemap & Licensing
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
