import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Product3DShowcase from './components/Product3DShowcase';
import UVSimulator from './components/UVSimulator';
import SkincareQuiz from './components/SkincareQuiz';
import IngredientAlchemist from './components/IngredientAlchemist';
import BrandPhilosophy from './components/BrandPhilosophy';
import InteractiveFooter from './components/InteractiveFooter';
import { Sun, Sparkles, AlertTriangle, Compass, Shield, Beaker, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [localUv, setLocalUv] = useState(5);
  const [dismissSolarAlert, setDismissSolarAlert] = useState(false);

  // Simulate local UV Index changes based on "time of day"
  useEffect(() => {
    const hours = new Date().getHours();
    let computedUv = 1;
    if (hours >= 11 && hours <= 14) computedUv = 9; // Peak sun
    else if (hours >= 9 && hours <= 16) computedUv = 6; // High sun
    else if (hours >= 7 && hours <= 18) computedUv = 3; // Light sun
    setLocalUv(computedUv);
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(`${sectionId}-section-anchor`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="app-root-container" className="min-h-screen bg-art-bg text-art-dark font-sans antialiased scroll-smooth selection:bg-art-cream selection:text-art-brown relative overflow-hidden">
      
      {/* Background Decorative Element: The Sun */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-[#FFD700] to-[#FF8C00] opacity-10 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-art-cream opacity-25 rounded-full blur-3xl pointer-events-none z-0"></div>
      
      {/* Subtle Architectural Grid Overlay */}
      <div className="pointer-events-none absolute inset-y-0 inset-x-0 grid grid-cols-6 h-full w-full z-0">
        <div className="border-r border-art-brown/5 h-full"></div>
        <div className="border-r border-art-brown/5 h-full"></div>
        <div className="border-r border-art-brown/5 h-full"></div>
        <div className="border-r border-art-brown/5 h-full"></div>
        <div className="border-r border-art-brown/5 h-full"></div>
        <div className="h-full"></div>
      </div>

      {/* Dynamic Solar Alert Banner */}
      <AnimatePresence>
        {!dismissSolarAlert && (
          <motion.div
            id="solar-alert-banner"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-art-orange text-white px-6 py-2.5 text-center text-xs font-semibold tracking-wider relative flex items-center justify-center gap-2 border-b border-art-brown/10 z-[60] shadow-sm"
          >
            <Sun className="h-4 w-4 animate-spin text-white shrink-0" style={{ animationDuration: '12s' }} />
            <span>
              <strong>Local Solar Report:</strong> UV Index is currently <strong>{localUv} (Moderate/High)</strong> in your location. Ensure skin cellular defense is active.
            </span>
            <button
              id="banner-close"
              onClick={() => setDismissSolarAlert(true)}
              className="absolute right-4 hover:bg-white/20 rounded-full p-1 transition-colors font-bold text-white text-sm h-6 w-6 flex items-center justify-center"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Header/Navbar */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={handleNavigateSection} 
        openQuiz={() => setIsQuizOpen(true)} 
      />

      {/* Main Flow Sections */}
      <main id="primary-skincare-stage">
        
        {/* HERO SECTION */}
        <div id="hero-section-anchor">
          <Hero 
            onExplore={handleNavigateSection} 
            openQuiz={() => setIsQuizOpen(true)} 
          />
        </div>

        {/* 3D SHOWCASE SECTION */}
        <div id="showcase-section-anchor" className="scroll-mt-20">
          <Product3DShowcase />
        </div>

        {/* UV SIMULATOR SECTION */}
        <div id="uv-shield-section-anchor" className="scroll-mt-20">
          <UVSimulator />
        </div>

        {/* INGREDIENT LAB SECTION */}
        <div id="alchemist-section-anchor" className="scroll-mt-20">
          <IngredientAlchemist />
        </div>

        {/* BRAND VALUES & MECHANISM */}
        <div id="philosophy-section-anchor" className="scroll-mt-20">
          <BrandPhilosophy />
        </div>

      </main>

      {/* MASTER FOOTER */}
      <InteractiveFooter onNavigate={handleNavigateSection} />

      {/* MULTI-STEP SPF MATCHER QUIZ DIALOG */}
      <AnimatePresence>
        {isQuizOpen && (
          <SkincareQuiz 
            isOpen={isQuizOpen} 
            onClose={() => setIsQuizOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* FLOATING QUICK TOOLS LAUNCHER */}
      <div id="floating-widget-dock" className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Launcher Button */}
        <button
          id="floating-quiz-launcher"
          onClick={() => setIsQuizOpen(true)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-art-brown text-white shadow-xl border border-art-brown/20 transition-all duration-300 hover:bg-art-orange hover:scale-110 active:scale-95 group"
          title="Skin Diagnostic"
        >
          <HelpCircle className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all bg-art-brown text-white text-[10px] font-mono tracking-wider uppercase px-2.5 py-1.5 rounded-lg border border-art-brown/30 whitespace-nowrap shadow-md">
            SPF Skin Matcher
          </span>
        </button>
      </div>

    </div>
  );
}
