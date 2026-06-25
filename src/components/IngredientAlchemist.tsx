import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ingredients } from '../data/sunscreenData';
import { Ingredient } from '../types';
import { Beaker, Sparkles, Plus, Trash2, ShieldCheck, Heart, Droplets, Leaf } from 'lucide-react';

export default function IngredientAlchemist() {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewResult, setBrewResult] = useState<{
    title: string;
    description: string;
    suitability: string;
    skinGoals: string[];
    grade: string;
  } | null>(null);

  const toggleIngredient = (ing: Ingredient) => {
    if (selectedIngredients.find((i) => i.id === ing.id)) {
      // Remove it
      setSelectedIngredients((prev) => prev.filter((i) => i.id !== ing.id));
      setBrewResult(null);
    } else {
      // Add it (max 3)
      if (selectedIngredients.length >= 3) return;
      setSelectedIngredients((prev) => [...prev, ing]);
      setBrewResult(null);
    }
  };

  const clearBeaker = () => {
    setSelectedIngredients([]);
    setBrewResult(null);
  };

  const brewFormula = () => {
    if (selectedIngredients.length === 0) return;
    
    setIsBrewing(true);
    setBrewResult(null);

    // Simulate 1.5s laboratory mixing
    setTimeout(() => {
      setIsBrewing(false);
      calculateSynergy();
    }, 1500);
  };

  const calculateSynergy = () => {
    const ids = selectedIngredients.map((i) => i.id);

    // 1. Zinc + Green Tea (The Calm & Matte Filter)
    if (ids.includes('Zinc Oxide') && ids.includes('Green Tea Extract')) {
      setBrewResult({
        title: 'The Calm & Velvet Shield Matrix',
        description: 'Micronized Zinc Oxide combines with EGCG antioxidants from Green Tea to deflect UV rays while absorbing excess sebum and soothing dermal heat.',
        suitability: 'Best for Oily, Acne-Prone, and Reactive Skin',
        skinGoals: ['Acne and Redness Relief', '8-Hour Matte Sebum Control', 'Physical Mirror UV Deflection'],
        grade: 'Medical Grade'
      });
    } 
    // 2. Hyaluronic Acid + Centella (The Luminous Barrier Hydrator)
    else if (ids.includes('Hyaluronic Acid') && ids.includes('Centella Asiatica')) {
      setBrewResult({
        title: 'The Dewy Luminous Moisture Matrix',
        description: 'A deep moisture-binding complex. Hyaluronic Acid plumps dry cells while fermented Centella repairs UV micro-tears and thermal skin stress.',
        suitability: 'Best for Extremely Dry, Dull, and Flakey Skin',
        skinGoals: ['Luminous Dewy Finish', 'Deep Epidermal Water Lock', 'Thermal Heat Soothing'],
        grade: 'Premium Hydration'
      });
    } 
    // 3. Zinc + Niacinamide + Vitamin E (Ultimate Age-Defying Shield)
    else if (ids.includes('Zinc Oxide') && ids.includes('Niacinamide')) {
      setBrewResult({
        title: 'The Hyperpigmentation Guard Matrix',
        description: 'Physical solar protection supercharged with Niacinamide to block UV-induced melanin activation, preventing dark spots, freckles, and sun discoloration.',
        suitability: 'Best for Hyperpigmented, Spot-Prone, and Aging Skin',
        skinGoals: ['Prevents Dark Spots and Sunspots', 'Smooths Fine Lines and Wrinkles', 'Reduces UV-Induced Inflammation'],
        grade: 'Radiance Recovery'
      });
    } 
    // 4. Default Balancing Combo
    else {
      setBrewResult({
        title: 'Custom Balancing Solar Matrix',
        description: 'A balanced sunscreen formula blending photoprotective filters with natural skin conditioning agents to guard cell structures daily.',
        suitability: 'Best for Normal, Balanced, or Combination Skin Types',
        skinGoals: ['Broad-Spectrum UV Filtering', 'Balanced Cellular Hydration', 'Antioxidant Oxidative Defence'],
        grade: 'Daily Essential'
      });
    }
  };

  return (
    <section 
      id="ingredient-lab-section" 
      className="relative min-h-screen bg-art-bg/40 py-16 md:py-24 border-t border-b border-art-brown/10"
    >
      <div id="lab-header" className="mx-auto max-w-4xl px-6 text-center space-y-3 mb-16 relative z-10">
        <span id="lab-category" className="text-xs font-bold tracking-[0.2em] uppercase text-art-orange">
          Amira Laboratories
        </span>
        <h2 id="lab-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-art-brown tracking-tight">
          Interactive Ingredient Alchemist
        </h2>
        <p id="lab-desc" className="text-sm text-art-dark/80 max-w-xl mx-auto">
          Mix up to 3 pure active sunscreen ingredients inside the virtual lab beaker below to discover their cellular synergy and find your perfect customized formula.
        </p>
      </div>

      <div id="lab-grid" className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left column: Selection bank (8 cols or 6 cols) */}
        <div id="ingredient-selection-bank" className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-art-brown">Skincare Actives Bank</h3>
            <span className="text-xs text-art-brown/60 font-mono font-bold">
              Selected: {selectedIngredients.length} / 3 Max
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ingredients.map((ing) => {
              const isSelected = !!selectedIngredients.find((i) => i.id === ing.id);
              const isDisabled = selectedIngredients.length >= 3 && !isSelected;

              return (
                <button
                  key={ing.id}
                  id={`lab-ingredient-${ing.id.replace(/\s+/g, '-').toLowerCase()}`}
                  disabled={isDisabled}
                  onClick={() => toggleIngredient(ing)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between space-y-3 relative overflow-hidden cursor-pointer ${
                    isSelected 
                      ? 'border-art-orange/30 bg-art-orange/5 shadow-md ring-1 ring-art-orange/10' 
                      : isDisabled
                      ? 'border-art-brown/5 bg-art-bg/30 opacity-40 cursor-not-allowed'
                      : 'border-art-brown/10 bg-white hover:border-art-orange hover:shadow-md'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="rounded-md bg-art-brown/10 px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase text-art-brown font-bold border border-art-brown/5">
                      {ing.category}
                    </span>
                    <div className={`h-6 w-6 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-art-orange border-art-orange text-white' : 'border-art-brown/20 text-art-brown/45 hover:border-art-orange/40'
                    }`}>
                      <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-art-brown uppercase tracking-wider">{ing.name}</h4>
                    <p className="text-[10px] text-art-orange font-bold font-mono tracking-widest uppercase">{ing.benefit}</p>
                    <p className="text-[11px] text-art-dark/80 line-clamp-2 pt-1 font-sans">{ing.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: The Virtual Mixing Beaker Stage */}
        <div id="ingredient-beaker-stage" className="lg:col-span-5 bg-white border border-art-brown/10 rounded-[36px] p-6 md:p-8 shadow-2xl flex flex-col justify-between min-h-[460px]">
          <div className="flex items-center justify-between border-b border-art-brown/10 pb-4">
            <span className="text-xs font-mono tracking-widest text-art-brown/40 uppercase font-bold">Beaker Reaction Chamber</span>
            {selectedIngredients.length > 0 && (
              <button
                id="btn-clear-lab"
                onClick={clearBeaker}
                className="text-[11px] font-mono text-art-brown/50 hover:text-red-600 flex items-center space-x-1 cursor-pointer font-bold"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Empty Beaker</span>
              </button>
            )}
          </div>

          {/* Mixing visual stage */}
          <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
            <AnimatePresence mode="wait">
              {isBrewing ? (
                <motion.div
                  key="brewing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-3"
                >
                  <Beaker className="h-16 w-16 text-art-orange animate-bounce" />
                  <div className="space-y-1">
                    <p className="text-xs font-mono text-art-orange font-bold animate-pulse">Fusing Molecules...</p>
                    <p className="text-[10px] text-art-brown/40 font-bold">Synthesizing UV absorption matrices...</p>
                  </div>
                  {/* Glowing bubble effects */}
                  <div className="absolute h-2 w-2 rounded-full bg-art-orange animate-ping top-1/3 left-1/3" />
                  <div className="absolute h-3.5 w-3.5 rounded-full bg-art-orange/30 animate-pulse bottom-1/3 right-1/4" />
                </motion.div>
              ) : brewResult ? (
                // Output results card
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full space-y-4"
                >
                  <div className="text-center space-y-1">
                    <span className="rounded bg-emerald-50 text-emerald-800 text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 border border-emerald-200 font-bold">
                      {brewResult.grade} Synergy
                    </span>
                    <h4 className="text-base font-serif font-bold text-art-brown pt-1.5">{brewResult.title}</h4>
                    <p className="text-xs text-art-dark/75 leading-relaxed max-w-sm mx-auto">{brewResult.description}</p>
                  </div>

                  <div className="rounded-2xl border border-art-brown/10 bg-art-bg/40 p-4 space-y-2 text-xs">
                    <span className="font-bold text-art-brown/40 block text-[10px] uppercase font-mono tracking-widest">Synergy suitability:</span>
                    <p className="text-art-brown font-bold">{brewResult.suitability}</p>
                    <div className="space-y-1.5 pt-1.5 border-t border-art-brown/10">
                      {brewResult.skinGoals.map((goal, i) => (
                        <div key={i} className="flex items-center space-x-2 text-[11px] text-art-dark/80 font-medium">
                          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                          <span>{goal}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                // Empty Beaker state
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-art-bg border border-art-brown/10 text-art-brown/40">
                    <Beaker className="h-10 w-10 text-art-brown/40" />
                    {selectedIngredients.length > 0 && (
                      <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-art-orange text-white text-[10px] font-bold flex items-center justify-center">
                        {selectedIngredients.length}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-1 max-w-xs">
                    <h4 className="text-xs font-bold text-art-brown uppercase tracking-widest">
                      {selectedIngredients.length === 0 ? 'Beaker is Empty' : 'Ingredients Added'}
                    </h4>
                    <p className="text-[11px] text-art-dark/60 leading-relaxed font-sans">
                      {selectedIngredients.length === 0 
                        ? 'Select up to 3 ingredients on the left to inject into the reaction chamber.' 
                        : `Combine ${selectedIngredients.length} active substance${selectedIngredients.length > 1 ? 's' : ''} to initiate the chemical synergy projection.`}
                    </p>
                  </div>

                  {/* List of currently floating molecules inside beaker */}
                  {selectedIngredients.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                      {selectedIngredients.map((i) => (
                        <span key={i.id} className="rounded-lg bg-art-cream text-[10px] font-mono text-art-brown px-2.5 py-1 border border-art-brown/10 font-bold shadow-sm">
                          {i.id}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action button */}
          <div id="lab-action-wrapper" className="border-t border-art-brown/10 pt-4">
            <button
              id="btn-mix-compounds"
              disabled={selectedIngredients.length === 0 || isBrewing}
              onClick={brewFormula}
              className={`w-full rounded-full py-4 text-xs font-bold tracking-[0.15em] uppercase text-white shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                selectedIngredients.length === 0 || isBrewing
                  ? 'bg-art-brown/20 cursor-not-allowed shadow-none'
                  : 'bg-art-brown hover:bg-art-orange hover:shadow-lg active:scale-95'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isBrewing ? 'Synthesizing...' : 'FUSE FORMULA SYNERGY'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
