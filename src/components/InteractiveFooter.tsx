import React, { useState } from 'react';
import { Sun, Mail, Check, Github, Instagram, MessageSquare } from 'lucide-react';

interface InteractiveFooterProps {
  onNavigate: (section: string) => void;
}

export default function InteractiveFooter({ onNavigate }: InteractiveFooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="footer-section" className="bg-[#130D0A] text-art-cream py-16 border-t border-art-brown/15 relative z-10">
      <div id="footer-container" className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Brand Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-art-orange/20 text-art-orange border border-art-orange/20">
              <Sun className="h-4.5 w-4.5" />
            </div>
            <span className="font-serif text-xl font-bold tracking-[0.25em] uppercase text-white">Amira</span>
          </div>
          <p className="text-xs text-art-cream/60 leading-relaxed max-w-sm font-sans">
            Amira is a premium dermatologist-approved brand focused entirely on the physics of elite solar defense. Made sustainably in California with certified organic compounds.
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <a id="footer-social-github" href="https://github.com" target="_blank" rel="noreferrer" className="text-art-cream/40 hover:text-art-orange transition-colors">
              <Github className="h-4 w-4" />
            </a>
            <a id="footer-social-instagram" href="https://instagram.com" target="_blank" rel="noreferrer" className="text-art-cream/40 hover:text-art-orange transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <span className="text-[10px] font-mono text-art-cream/40 uppercase font-bold tracking-widest">@AMIRASOLAR</span>
          </div>
        </div>

        {/* Quick Links Column (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-white">Active Lab Sections</h4>
          <ul className="space-y-2.5 text-xs font-bold uppercase tracking-wider">
            <li>
              <button id="footer-link-showcase" onClick={() => onNavigate('showcase')} className="text-art-cream/50 hover:text-art-orange transition-colors text-left cursor-pointer">
                Product Showcase
              </button>
            </li>
            <li>
              <button id="footer-link-uv" onClick={() => onNavigate('uv-shield')} className="text-art-cream/50 hover:text-art-orange transition-colors text-left cursor-pointer">
                UV Shield Simulator
              </button>
            </li>
            <li>
              <button id="footer-link-lab" onClick={() => onNavigate('alchemist')} className="text-art-cream/50 hover:text-art-orange transition-colors text-left cursor-pointer">
                Ingredient Alchemist Lab
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Column (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-white">Subscribe to UV Reports</h4>
          <p className="text-xs text-art-cream/60 leading-relaxed max-w-sm font-sans">
            Get bi-weekly laboratory reports on UV index trends, photoprotective ingredients, and seasonal skincare safety.
          </p>

          {!subscribed ? (
            <form id="footer-newsletter-form" onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md pt-1">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full bg-[#1C1410] border border-art-brown/20 px-5 py-3 text-xs text-art-cream placeholder-art-cream/30 focus:border-art-orange focus:outline-none"
              />
              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="rounded-full bg-art-orange px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-art-orange/85 active:scale-95 transition-all flex items-center justify-center space-x-1.5 cursor-pointer shadow-md shadow-art-orange/20"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Join Lab</span>
              </button>
            </form>
          ) : (
            <div id="newsletter-success-toast" className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs flex items-center space-x-2 max-w-md font-sans">
              <Check className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
              <span>Subscription successful! Welcome to the Amira Solar Labs digest.</span>
            </div>
          )}
        </div>

      </div>

      {/* Bottom bar with mock info */}
      <div id="footer-bottom-bar" className="mx-auto max-w-7xl px-6 md:px-12 mt-12 pt-8 border-t border-art-brown/15 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-art-cream/35">
        <p>© 2026 Amira Solar Labs Inc. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 items-center justify-center font-bold tracking-wider">
          <span className="rounded-full bg-[#1C1410] border border-art-brown/20 px-3 py-1 text-art-orange font-mono tracking-widest uppercase">
            Client Demonstration Pitch Mode
          </span>
          <span>Dermatologist Approved</span>
          <span>Reef-Safe Certified</span>
        </div>
      </div>
    </footer>
  );
}
