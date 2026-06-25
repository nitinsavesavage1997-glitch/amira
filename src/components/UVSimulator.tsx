import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, ShieldAlert, Sparkles, ShieldCheck, Flame, Heart, Info } from 'lucide-react';

export default function UVSimulator() {
  const [uvIndex, setUvIndex] = useState(6); // Default to High (6)
  const [sunscreenApplied, setSunscreenApplied] = useState(false);

  // Determine UV level class and label
  const getUvDetails = (index: number) => {
    if (index <= 2) return { label: 'Low', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', damageSpeed: 0.1, desc: 'Safe for brief exposure. Minimal damage risk.' };
    if (index <= 5) return { label: 'Moderate', color: 'text-amber-600 bg-amber-50 border-amber-200', damageSpeed: 0.4, desc: 'Protection recommended. Sunburn risk in 30-45 mins.' };
    if (index <= 7) return { label: 'High', color: 'text-orange-600 bg-orange-50 border-orange-200', damageSpeed: 0.8, desc: 'Amira shield essential. Damage accumulates in 15-20 mins.' };
    if (index <= 10) return { label: 'Very High', color: 'text-red-600 bg-red-50 border-red-200', damageSpeed: 1.2, desc: 'Extremely high risk. Collagen degrades rapidly.' };
    return { label: 'Extreme', color: 'text-purple-600 bg-purple-50 border-purple-200', damageSpeed: 1.8, desc: 'Unprotected skin burns in under 10 minutes.' };
  };

  const uv = getUvDetails(uvIndex);

  // Calculations for simulated metrics
  const collagenDamagePercentage = sunscreenApplied ? 0 : Math.min(100, Math.round(uvIndex * 9.1));
  const burnRiskIndex = sunscreenApplied ? 'None (Safe)' : uvIndex >= 8 ? 'Extreme Risk' : uvIndex >= 6 ? 'High Risk' : uvIndex >= 3 ? 'Moderate' : 'Low';
  const burnTimeText = sunscreenApplied ? 'Unlimited' : uvIndex >= 11 ? '8-10 mins' : uvIndex >= 8 ? '10-15 mins' : uvIndex >= 6 ? '20 mins' : uvIndex >= 3 ? '40 mins' : '2 hours';

  return (
    <section 
      id="uv-simulator-section" 
      className="relative min-h-screen bg-art-bg/25 py-16 md:py-24 border-b border-art-brown/10"
    >
      <div id="simulator-header" className="mx-auto max-w-4xl px-6 text-center space-y-3 mb-12 relative z-10">
        <span id="simulator-category" className="text-xs font-bold tracking-[0.2em] uppercase text-art-orange">
          Skin Physics Lab
        </span>
        <h2 id="simulator-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-art-brown tracking-tight">
          Broad-Spectrum Solar Shield Simulator
        </h2>
        <p id="simulator-desc" className="text-sm text-art-dark/80 max-w-xl mx-auto">
          Adjust the UV Index dial to simulate how high-energy UVA (cellular aging) and UVB (sunburn) radiation affect unprotected skin versus skin covered by Amira's molecular filter.
        </p>
      </div>

      <div id="simulator-grid" className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left Side: Controller Panel */}
        <div id="simulator-controls" className="lg:col-span-4 space-y-6 bg-white border border-art-brown/10 p-6 md:p-8 rounded-[32px] shadow-2xl">
          {/* Slider 1: UV Index */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label id="lbl-uv-index" className="text-xs font-bold uppercase tracking-widest text-art-brown">UV Radiation Index</label>
              <span id="uv-badge" className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${uv.color}`}>
                UV {uvIndex} ({uv.label})
              </span>
            </div>
            
            <input
              id="slider-uv-index"
              type="range"
              min="1"
              max="12"
              value={uvIndex}
              onChange={(e) => setUvIndex(Number(e.target.value))}
              className="w-full h-1.5 bg-art-brown/10 rounded-lg appearance-none cursor-pointer accent-art-orange"
            />
            
            <div className="flex justify-between text-[10px] font-mono text-art-brown/40">
              <span>1 Low</span>
              <span>6 High</span>
              <span>12 Extreme</span>
            </div>
          </div>

          {/* Interactive Protective Toggle */}
          <div className="space-y-3 pt-4 border-t border-art-brown/10">
            <label className="text-xs font-bold uppercase tracking-widest text-art-brown block">Amira Protective Formula</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                id="btn-sunscreen-off"
                onClick={() => setSunscreenApplied(false)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                  !sunscreenApplied 
                    ? 'border-red-200 bg-red-50 text-red-800 font-bold shadow-sm' 
                    : 'border-art-brown/10 bg-white text-art-brown/50 hover:border-art-brown/30'
                }`}
              >
                <ShieldAlert className="h-4.5 w-4.5 mb-1 text-red-500" />
                <span className="text-[10px] uppercase tracking-wider font-bold">No Protection</span>
              </button>
              <button
                id="btn-sunscreen-on"
                onClick={() => setSunscreenApplied(true)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300 cursor-pointer ${
                  sunscreenApplied 
                    ? 'border-art-orange/30 bg-art-orange/5 text-art-brown font-bold shadow-sm' 
                    : 'border-art-brown/10 bg-white text-art-brown/50 hover:border-art-brown/30'
                }`}
              >
                <ShieldCheck className="h-4.5 w-4.5 mb-1 text-art-orange animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-bold">Amira SPF 50+</span>
              </button>
            </div>
          </div>

          {/* Metric Status Reports */}
          <div className="space-y-4 pt-4 border-t border-art-brown/10 bg-art-bg/30 rounded-2xl p-4">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-art-brown/50 font-bold">Simulated Cellular Diagnosis</h4>
            
            <div className="space-y-3">
              {/* Metric 1: Collagen degradation */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-art-brown font-medium">UVA Collagen Degradation Rate</span>
                  <span className={`font-bold ${collagenDamagePercentage > 50 ? 'text-red-600' : 'text-art-brown'}`}>
                    {collagenDamagePercentage}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-art-brown/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      collagenDamagePercentage > 50 ? 'bg-red-500' : 'bg-art-orange'
                    }`}
                    style={{ width: `${collagenDamagePercentage}%` }}
                  />
                </div>
              </div>

              {/* Metric 2: Burn risks */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-art-brown/50 font-mono block font-bold">Erythema (Burn) Risk</span>
                  <span className={`font-bold ${sunscreenApplied ? 'text-emerald-600' : 'text-art-brown'}`}>{burnRiskIndex}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-art-brown/50 font-mono block font-bold">Time to Cell Damage</span>
                  <span className="font-bold text-art-brown">{burnTimeText}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2.5 p-3.5 rounded-xl border border-art-brown/10 bg-white text-[11px] text-art-dark/80">
            <Info className="h-4 w-4 shrink-0 text-art-orange" />
            <p className="leading-relaxed font-sans">{uv.desc}</p>
          </div>
        </div>

        {/* Right Side: Interactive Skin Layer Diagram */}
        <div id="simulator-skin-stage" className="lg:col-span-8 bg-white border border-art-brown/10 rounded-[36px] p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[500px]">
          {/* Header indicator */}
          <div className="flex items-center justify-between border-b border-art-brown/10 pb-4 mb-4">
            <span className="text-xs font-mono tracking-widest text-art-brown/40 uppercase font-bold">Cross-Section Skin Schematic</span>
            <div className="flex items-center space-x-2">
              <span className={`h-2.5 w-2.5 rounded-full ${sunscreenApplied ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
              <span className="text-xs font-bold uppercase tracking-wider text-art-brown">
                {sunscreenApplied ? 'Amira Shield Protected' : 'UV Damage Vulnerable'}
              </span>
            </div>
          </div>

          {/* Interactive SVG Diagram */}
          <div className="relative flex-1 bg-stone-950 rounded-2xl p-4 overflow-hidden min-h-[300px] flex flex-col justify-end">
            
            {/* The Sun / UV Rays Source */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <Sun 
                  className={`h-12 w-12 text-amber-400 transition-all duration-700 ${
                    uvIndex >= 9 ? 'scale-125 text-orange-500' : uvIndex >= 6 ? 'scale-110 text-amber-500' : 'scale-100'
                  }`} 
                />
                <div 
                  className={`absolute inset-0 rounded-full bg-amber-400/20 blur-md animate-ping`}
                  style={{ animationDuration: `${3 - Math.min(2.5, uvIndex * 0.2)}s` }}
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase mt-1">Solar Source</span>
            </div>

            {/* UV Ray Lines Penetration Canvas */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="uva-ray" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C084FC" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="uvb-ray" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* UVB Rays (Medium Penetration to Epidermis) */}
              {Array.from({ length: Math.min(5, Math.ceil(uvIndex / 2.2)) }).map((_, i) => {
                const startX = 15 + i * 18 + '%';
                const endY = sunscreenApplied ? '28%' : '48%';
                return (
                  <g key={`uvb-${i}`}>
                    {/* Beam Line */}
                    <line
                      x1="50%"
                      y1="40"
                      x2={startX}
                      y2={endY}
                      stroke="url(#uvb-ray)"
                      strokeWidth={sunscreenApplied ? 1 : Math.max(1.5, uvIndex * 0.35)}
                      strokeDasharray={sunscreenApplied ? '5,5' : '0'}
                      className="transition-all duration-500"
                    />
                    {/* UV Label on path */}
                    {!sunscreenApplied && (
                      <circle cx={startX} cy="60%" r="2" fill="#F43F5E" className="animate-ping" />
                    )}
                  </g>
                );
              })}

              {/* UVA Rays (Deep Penetration to Dermis & Collagen) */}
              {Array.from({ length: Math.min(5, Math.ceil(uvIndex / 2.2)) }).map((_, i) => {
                const startX = 50 + (i - 2) * 18 + '%';
                const endY = sunscreenApplied ? '28%' : '80%';
                return (
                  <g key={`uva-${i}`}>
                    {/* Beam Line */}
                    <line
                      x1="50%"
                      y1="40"
                      x2={startX}
                      y2={endY}
                      stroke="url(#uva-ray)"
                      strokeWidth={sunscreenApplied ? 1 : Math.max(1.5, uvIndex * 0.35)}
                      strokeDasharray={sunscreenApplied ? '5,5' : '0'}
                      className="transition-all duration-500"
                    />
                    {!sunscreenApplied && (
                      <circle cx={startX} cy="82%" r="2.5" fill="#C084FC" className="animate-bounce" />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* SKIN LAYERS VISUAL REPRESENTATION */}
            <div className="space-y-1 relative z-10 w-full">
              {/* 1. Amira Golden Shield Barrier */}
              <div className="relative h-6 flex items-center justify-center">
                <AnimatePresence>
                  {sunscreenApplied ? (
                    <motion.div
                      id="sim-protective-barrier"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      className="absolute inset-x-0 h-3.5 bg-gradient-to-r from-art-orange via-art-cream to-art-orange rounded-full border border-art-orange/35 shadow-lg flex items-center justify-center"
                    >
                      <span className="absolute text-[8px] font-mono tracking-widest text-art-brown uppercase font-extrabold animate-pulse">
                        AMIRA BARRICADE (SPF 50+) ACTIVE
                      </span>
                    </motion.div>
                  ) : (
                    <span className="text-[9px] text-red-300 font-mono tracking-wider uppercase bg-red-950/50 px-2.5 py-0.5 rounded-lg border border-red-900/30">
                      Skin Exposed — No Barrier
                    </span>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Stratum Corneum (Skin Surface) */}
              <div 
                id="skin-surface-layer" 
                className={`h-14 rounded-2xl p-4 flex justify-between items-center border transition-all duration-700 ${
                  sunscreenApplied 
                    ? 'bg-art-bg border-art-brown/15 text-art-brown' 
                    : uvIndex >= 8 
                    ? 'bg-red-950/80 border-red-500 text-red-200 animate-pulse' 
                    : uvIndex >= 5 
                    ? 'bg-rose-950/60 border-rose-800 text-rose-200' 
                    : 'bg-art-cream/40 border-art-brown/10 text-art-brown'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono tracking-widest uppercase opacity-70 block font-bold">Epidermis Layer</span>
                  <span className="text-[10px] font-bold">Skin Barrier (Hydration Level: {sunscreenApplied ? 'Excellent' : uvIndex >= 7 ? 'Dry/Irritated' : 'Balanced'})</span>
                </div>
                {uvIndex >= 6 && !sunscreenApplied && (
                  <span className="flex items-center text-[9px] bg-red-600 text-white rounded-lg px-2 py-1 space-x-1 font-bold shadow-md">
                    <Flame className="h-3 w-3 animate-bounce" />
                    <span>SUNBURN INFLAMMATION</span>
                  </span>
                )}
              </div>

              {/* 3. Dermis Layer containing Collagen structures */}
              <div 
                id="skin-dermis-layer" 
                className="h-40 rounded-2xl border border-art-brown/15 bg-[#1C1410] p-4 flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-mono tracking-widest text-art-cream/40 uppercase font-bold">Dermis (Deep Cell Structure)</span>
                  <span className="text-[9px] font-mono text-art-cream/30">Depth: 1.5mm - 3.0mm</span>
                </div>

                {/* Simulated Collagen Fibers Grid */}
                <div className="flex-1 flex justify-around items-center pt-2 gap-4">
                  {Array.from({ length: 6 }).map((_, idx) => {
                    const damaged = !sunscreenApplied && uvIndex >= 5;
                    return (
                      <div key={idx} className="flex flex-col items-center space-y-1">
                        {/* Wavy line or particle representing collagen */}
                        <div className="relative flex flex-col items-center">
                          {/* Collagen Fiber visual */}
                          <div 
                            className={`w-1.5 rounded-full transition-all duration-700 ${
                              damaged 
                                ? 'h-14 bg-stone-700/60 border-dashed border-t-2 border-stone-850' 
                                : 'h-16 bg-art-orange/80 shadow-md shadow-art-orange/20'
                            }`}
                          />
                          {/* Label */}
                          <span className={`text-[8px] font-mono tracking-tight transition-colors duration-500 mt-1 ${
                            damaged ? 'text-red-400/80 font-bold' : 'text-art-cream/60'
                          }`}>
                            {damaged ? 'Fractured' : 'Resilient'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between items-center text-[9px] border-t border-art-brown/15 pt-2 text-art-cream/40 font-bold">
                  <span>Collagen Grid: {sunscreenApplied ? 'Protected (Fully Elastic)' : uvIndex >= 8 ? 'Damaging (Photo-Aging)' : uvIndex >= 4 ? 'Moderate Stress' : 'Normal'}</span>
                  <span className="flex items-center gap-1">
                    <Heart className={`h-3 w-3 ${sunscreenApplied ? 'text-emerald-500' : 'text-art-cream/40'}`} />
                    {sunscreenApplied ? 'Stable Elastin' : 'Elastin Damage Risk'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Guide panel */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-art-brown/10 pt-4 text-xs text-art-dark/80">
            <div className="space-y-1">
              <h5 className="font-bold text-art-brown flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-art-orange" />
                UVA Protection (Cellular Aging)
              </h5>
              <p className="text-[11px] leading-relaxed font-sans">
                UVA rays account for 95% of solar radiation. They penetrate glass and deep dermis layers, breaking down collagen matrix networks. Amira blocks UVA to prevent dynamic wrinkles and sunspots.
              </p>
            </div>
            <div className="space-y-1">
              <h5 className="font-bold text-art-brown flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-art-brown" />
                UVB Protection (Sunburn)
              </h5>
              <p className="text-[11px] leading-relaxed font-sans">
                UVB rays affect the outer epidermal skin cells, causing acute redness, burning, and immediate barrier damage. Amira's physical zinc block acts like micro-mirrors, bouncing UVB rays instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
