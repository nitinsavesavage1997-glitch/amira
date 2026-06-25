import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Sparkles, ShieldCheck, Award, Heart, Check } from 'lucide-react';

interface HeroProps {
  onExplore: (section: string) => void;
  openQuiz: () => void;
}

export default function Hero({ onExplore, openQuiz }: HeroProps) {
  const [solarProtectionActive, setSolarProtectionActive] = useState(false);

  const keyUSP = [
    { text: 'Micronized Mineral Defense', desc: 'No heavy white-cast, perfect for sensitive skin' },
    { text: 'Reef-Safe & Certified Vegan', desc: 'Biodegradable filters protecting marine lifecycles' },
    { text: 'HEV Blue-Light Shield', desc: 'Guards cells against high-energy screen radiation' },
    { text: 'All-Day Weightless Hydration', desc: 'Infused with soothing Cica and Hyaluronic Acid' }
  ];

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[calc(100vh-6rem)] overflow-hidden bg-art-bg py-12 md:py-20"
    >
      {/* Absolute Decorative Warm Sun Radial */}
      <div 
        id="hero-bg-glow" 
        className="absolute top-[-20%] right-[-10%] h-[700px] w-[700px] rounded-full bg-gradient-to-br from-[#FFD700] to-[#FF8C00] opacity-10 blur-3xl pointer-events-none" 
      />
      <div 
        id="hero-bg-glow-2" 
        className="absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-art-cream opacity-20 blur-3xl pointer-events-none" 
      />

      <div id="hero-grid-container" className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left Side: Brand Story and USPs */}
        <div id="hero-left-content" className="lg:col-span-7 flex flex-col justify-center space-y-8">
          <div id="hero-badge-wrapper">
            <span 
              id="hero-organic-badge" 
              className="inline-flex items-center space-x-1.5 rounded-full border border-art-brown/10 bg-art-cream/30 px-4 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-art-brown shadow-sm"
            >
              <Award className="h-3.5 w-3.5 text-art-orange" />
              <span>Premium Solar Care • Amira Labs</span>
            </span>
          </div>

          <div id="hero-text-block" className="space-y-4">
            <h1 
              id="hero-main-title" 
              className="font-serif text-6xl sm:text-7xl lg:text-[100px] font-light tracking-tight text-art-brown leading-[0.95]"
            >
              Pure <br />
              <span className="font-serif italic font-light text-art-orange ml-4 sm:ml-12">
                Solar
              </span>
            </h1>
            <p 
              id="hero-description" 
              className="max-w-xl text-lg leading-relaxed text-art-brown/80 font-sans"
            >
              An ethereal shield crafted for the modern skin. Amira represents the zenith of minimalist skincare. SPF 50+ mineral protection that melts into light, shielding and perfecting without leaving a trace.
            </p>
          </div>

          {/* Core Interactive Sunscreen Feature Toggle */}
          <div id="hero-interactive-demo-card" className="rounded-3xl border border-art-brown/10 bg-white/70 p-6 backdrop-blur-md shadow-xl max-w-lg">
            <div className="flex items-start justify-between">
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-art-brown flex items-center gap-1.5">
                  <Sun className="h-4.5 w-4.5 text-art-orange animate-spin" style={{ animationDuration: '20s' }} />
                  Live UV Shield Preview
                </h3>
                <p className="text-xs text-art-dark/75">
                  Toggle to overlay Amira's invisible mineral filter on the product bottle.
                </p>
              </div>
              <button
                id="hero-solar-toggle"
                onClick={() => setSolarProtectionActive(!solarProtectionActive)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none ${
                  solarProtectionActive ? 'bg-art-orange' : 'bg-art-brown/20'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-300 ${
                    solarProtectionActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            
            <div className="mt-4 text-xs text-art-brown/90 flex items-center gap-2 font-medium">
              <span className={`h-2.5 w-2.5 rounded-full ${solarProtectionActive ? 'bg-art-orange animate-ping' : 'bg-art-brown/40'}`} />
              <span>{solarProtectionActive ? 'Active Shielding: Deflecting UV rays at 380-400nm spectrum.' : 'Default view: Normal visible spectrum light.'}</span>
            </div>
          </div>

          {/* Quick USP list with checkmarks */}
          <div id="hero-usp-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl pt-2">
            {keyUSP.map((usp, i) => (
              <div key={i} className="flex space-x-3 items-start">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-art-cream/30 text-art-brown border border-art-brown/10">
                  <Check className="h-3.5 w-3.5 text-art-orange stroke-[3]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-art-brown tracking-widest uppercase">{usp.text}</h4>
                  <p className="text-[11px] text-art-dark/70 mt-0.5">{usp.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div id="hero-actions-container" className="flex flex-wrap gap-4 pt-4">
            <button
              id="hero-btn-discover"
              onClick={() => onExplore('showcase')}
              className="rounded-full bg-art-brown px-10 py-5 text-xs font-bold uppercase tracking-widest text-white hover:bg-art-orange shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Explore Formulas
            </button>
            <button
              id="hero-btn-match"
              onClick={openQuiz}
              className="rounded-full border-2 border-art-brown/20 bg-transparent px-10 py-5 text-xs font-bold uppercase tracking-widest text-art-brown hover:bg-art-brown hover:text-white hover:border-art-brown transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Analyze Your Skin Type
            </button>
          </div>
        </div>

        {/* Right Side: Product Image Showcase */}
        <div id="hero-right-visual" className="lg:col-span-5 relative flex justify-center lg:justify-end">
          {/* Main Visual Border Card */}
          <motion.div
            id="hero-image-wrapper"
            className="relative overflow-hidden rounded-[40px] border border-art-brown/10 bg-white p-5 shadow-2xl max-w-[420px] aspect-[3/4] w-full"
            style={{ perspective: 1000 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          >
            {/* The actual premium generated hero image */}
            <img
              id="hero-brand-image"
              src="/src/assets/images/amira_hero_sunscreen_1782403512332.jpg"
              alt="Luxury Amira Sunscreen Bottle Standing on Sand"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover rounded-[30px] transition-transform duration-700 hover:scale-105"
            />

            {/* Glowing UV Protective Energy Overlay when active */}
            <AnimatePresence>
              {solarProtectionActive && (
                <motion.div
                  id="hero-uv-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-5 rounded-[30px] bg-art-orange/20 mix-blend-screen pointer-events-none flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-art-orange/40 to-art-cream/10 border-2 border-art-orange/50 rounded-[30px] animate-pulse" />
                  <div className="flex flex-col items-center justify-center space-y-2 rounded-2xl bg-art-brown/95 px-5 py-3.5 text-center text-white border border-art-orange/30 shadow-2xl relative z-10">
                    <ShieldCheck className="h-5 w-5 text-art-orange animate-bounce" />
                    <span className="text-[10px] font-mono tracking-widest text-art-cream uppercase font-bold">UV Barricade active</span>
                    <span className="text-[9px] text-white/80">99.8% UV Reflected</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Float Badge 1 */}
            <div className="absolute bottom-8 left-8 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 shadow-lg border border-art-brown/5 flex items-center space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[10px] font-bold tracking-widest text-art-brown uppercase">100% Non-Nano Zinc</span>
            </div>

            {/* Float Badge 2 */}
            <div className="absolute top-8 right-8 rounded-full bg-art-brown/95 backdrop-blur-sm px-4 py-2 shadow-lg flex items-center space-x-1.5 text-white">
              <span className="text-[10px] font-mono tracking-widest text-art-cream font-bold">SPF 50+ / PA++++</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
