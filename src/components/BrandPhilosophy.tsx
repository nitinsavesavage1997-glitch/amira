import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sun, Shield, Leaf, HeartHandshake, EyeOff, Heart, HelpCircle } from 'lucide-react';

export default function BrandPhilosophy() {
  const [activePhilosophy, setActivePhilosophy] = useState<'mineral' | 'chemical'>('mineral');

  const principles = [
    {
      icon: Leaf,
      title: 'Reef-Safe Certified',
      desc: 'Formulated completely free of Oxybenzone and Octinoxate, protecting delicate coral ecosystems from bleaching and disruption.'
    },
    {
      icon: EyeOff,
      title: 'Invisible Melting Base',
      desc: 'Using micronized non-nano suspension filters, we ensure absolute transparency on all Fitzpatrick skin tones—no chalky white-cast, ever.'
    },
    {
      icon: HeartHandshake,
      title: 'Dermatologically Tested',
      desc: 'Completely fragrance-free, non-comedogenic, and safe for highly reactive skin experiencing eczema, redness, or acne.'
    }
  ];

  return (
    <section 
      id="brand-philosophy-section" 
      className="relative min-h-screen bg-art-bg/25 py-16 md:py-24 border-b border-art-brown/10"
    >
      <div id="philosophy-header" className="mx-auto max-w-4xl px-6 text-center space-y-3 mb-16 relative z-10">
        <span id="philosophy-category" className="text-xs font-bold tracking-[0.2em] uppercase text-art-orange">
          Pure Science
        </span>
        <h2 id="philosophy-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-art-brown tracking-tight">
          Mineral Shield vs. Chemical Filters
        </h2>
        <p id="philosophy-desc" className="text-sm text-art-dark/80 max-w-xl mx-auto">
          Understanding the mechanism of sun protection. Click to toggle and preview how different molecular filters interact with solar energy.
        </p>
      </div>

      <div id="philosophy-comparison" className="mx-auto max-w-5xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20 relative z-10">
        {/* Left Side: Interactive Toggles */}
        <div id="comparison-details" className="lg:col-span-5 space-y-6">
          <div className="flex rounded-full bg-art-cream/60 p-1.5 border border-art-brown/10">
            <button
              id="btn-philosophy-mineral"
              onClick={() => setActivePhilosophy('mineral')}
              className={`flex-1 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activePhilosophy === 'mineral'
                  ? 'bg-art-brown text-white shadow-lg'
                  : 'text-art-brown/60 hover:text-art-brown'
              }`}
            >
              Mineral Shield (Amira Core)
            </button>
            <button
              id="btn-philosophy-chemical"
              onClick={() => setActivePhilosophy('chemical')}
              className={`flex-1 rounded-full py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activePhilosophy === 'chemical'
                  ? 'bg-art-brown text-white shadow-lg'
                  : 'text-art-brown/60 hover:text-art-brown'
              }`}
            >
              Chemical Filters
            </button>
          </div>

          <div className="space-y-4">
            <h4 id="active-philosophy-title" className="text-xl font-serif font-bold text-art-brown tracking-tight">
              {activePhilosophy === 'mineral' 
                ? 'Physical Deflection Mechanism' 
                : 'Chemical Absorption Mechanism'}
            </h4>
            <p id="active-philosophy-desc" className="text-xs text-art-dark/80 leading-relaxed font-sans">
              {activePhilosophy === 'mineral'
                ? 'Mineral sunscreen ingredients (Zinc Oxide, Titanium Dioxide) sit on the very outer surface of your skin. They act like microscopic mirrors, reflecting and scattering both UVA and UVB rays away from your body immediately before they penetrate any skin cell. This physical action generates zero heat, making it the supreme choice for easily irritated or sensitive skin.'
                : 'Chemical sunscreen ingredients (like Avobenzone) sink deep into the upper skin layers. When UV rays enter, these compounds absorb the high-energy solar radiation, triggering a chemical reaction that converts the radiation into harmless low-level thermal heat, which is then safely released from the skin surface. This ensures a 100% transparent, weightless finish.'}
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center space-x-2 text-art-brown">
                <Shield className="h-4 w-4 text-art-orange" />
                <span className="font-bold">
                  {activePhilosophy === 'mineral' ? 'Zero cell penetration' : 'Weightless fluid texture'}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-art-brown">
                <Sun className="h-4 w-4 text-art-orange" />
                <span className="font-bold">
                  {activePhilosophy === 'mineral' ? 'Protects instantly upon application' : 'Extremely water & sweat-resistant'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Mechanism Simulation */}
        <div id="comparison-visual" className="lg:col-span-7 bg-[#1C1410] rounded-[36px] p-6 md:p-8 border border-art-brown/15 h-[360px] flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-mono tracking-widest text-art-cream/40 uppercase font-bold">Interactive Physics Model</span>
          </div>

          {/* Interactive physics SVG container */}
          <div className="flex-1 flex items-center justify-center pt-8">
            <svg className="w-full h-44 pointer-events-none overflow-visible">
              {/* Sun source */}
              <circle cx="50%" cy="10" r="15" fill="#FBBF24" opacity="0.9" />
              <circle cx="50%" cy="10" r="22" fill="#FBBF24" opacity="0.2" className="animate-pulse" />

              {/* Skin Surface */}
              <line x1="10%" y1="120" x2="90%" y2="120" stroke="#78350F" strokeWidth="3" opacity="0.3" />
              <text x="12%" y="142" fill="#A1A1AA" fontSize="9" fontFamily="monospace" letterSpacing="1">SKIN CELLS</text>

              {activePhilosophy === 'mineral' ? (
                <>
                  {/* Mineral Barrier line */}
                  <line x1="10%" y1="110" x2="90%" y2="110" stroke="#FBBF24" strokeWidth="4" />
                  <text x="50%" y="103" textAnchor="middle" fill="#FBBF24" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">AMIRA MINERAL BARRIER</text>

                  {/* Reflecting Beams */}
                  <path d="M 50% 10 L 30% 110 L 10% 30" stroke="#C084FC" strokeWidth="2.5" fill="none" />
                  <path d="M 50% 10 L 70% 110 L 90% 30" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
                  
                  {/* Bouncing sparkles */}
                  <circle cx="30%" cy="110" r="3" fill="#FBBF24" className="animate-ping" />
                  <circle cx="70%" cy="110" r="3" fill="#FBBF24" className="animate-ping" />
                  
                  {/* Arrowhead markers */}
                  <polygon points="10,30 15,25 18,32" fill="#C084FC" transform="translate(10,30)" />
                </>
              ) : (
                <>
                  {/* Chemical Filter absorption area */}
                  <rect x="10%" y="112" width="80%" height="25" fill="#F59E0B" opacity="0.15" />
                  <text x="50%" y="125" textAnchor="middle" fill="#F59E0B" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">CHEMICAL FILTER ABSORPTION MATRIX</text>

                  {/* Absorbing Beams (penetrating into skin, then dissipating) */}
                  <path d="M 50% 10 L 35% 122" stroke="#C084FC" strokeWidth="2.5" fill="none" />
                  <path d="M 50% 10 L 65% 122" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
                  
                  {/* Dissipated Thermal heat waves (squiggly) */}
                  <path d="M 35% 122 Q 33% 105, 36% 95 T 33% 85" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.7" className="animate-pulse" />
                  <path d="M 65% 122 Q 63% 105, 66% 95 T 63% 85" stroke="#F59E0B" strokeWidth="1.5" fill="none" opacity="0.7" className="animate-pulse" />
                  
                  <text x="25%" y="85" fill="#F59E0B" fontSize="7" fontFamily="monospace">THERMAL HEAT DISPERSION</text>
                </>
              )}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] text-art-cream/40 font-mono border-t border-art-brown/15 pt-3 font-bold">
            <span>UVA / UVB Wavelengths: 290nm - 400nm</span>
            <span>Reflectance Efficiency: {activePhilosophy === 'mineral' ? '99.8%' : '98.5% (heat convert)'}</span>
          </div>
        </div>
      </div>

      {/* Sustainable Principles Grid */}
      <div id="sustainable-principles" className="mx-auto max-w-5xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {principles.map((pr, i) => {
          const Icon = pr.icon;
          return (
            <div key={i} className="bg-white border border-art-brown/10 rounded-[24px] p-6 space-y-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="h-10 w-10 rounded-full bg-art-orange/10 text-art-orange flex items-center justify-center">
                <Icon className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1.5">
                <h4 className="text-sm font-serif font-bold text-art-brown uppercase tracking-wider">{pr.title}</h4>
                <p className="text-xs text-art-dark/75 leading-relaxed font-sans">{pr.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
