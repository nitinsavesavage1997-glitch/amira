import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from '../data/sunscreenData';
import { Product } from '../types';
import { Star, ShieldCheck, ShoppingBag, Droplet, ArrowLeft, ArrowRight, Eye, Check, RefreshCw, Sparkles } from 'lucide-react';

export default function Product3DShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'benefits' | 'texture' | 'usage'>('benefits');
  const [sampleDrawerOpen, setSampleDrawerOpen] = useState(false);
  const [sampleQuantity, setSampleQuantity] = useState(1);
  const [sampleOrdered, setSampleOrdered] = useState(false);
  const [viscosityProgress, setViscosityProgress] = useState(50); // Texture simulator

  const activeProduct = products[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  // Viscosity levels for texture simulator based on active product
  const getViscosityParams = (prodId: string) => {
    switch (prodId) {
      case 'hydrating-fluid':
        return { name: 'Fluid Water Cream', spread: 85, weight: 'Ultra-light', absorption: 'Instant (10s)' };
      case 'matte-mineral':
        return { name: 'Whipped Lotion Cream', spread: 60, weight: 'Weightless Velvet', absorption: 'Fast (30s)' };
      case 'active-gel':
        return { name: 'Invisible Clear Gel', spread: 95, weight: 'Barely-there Gel', absorption: 'Instantaneous (5s)' };
      default:
        return { name: 'Fluid Cream', spread: 70, weight: 'Lightweight', absorption: 'Fast' };
    }
  };

  const textureParams = getViscosityParams(activeProduct.id);

  return (
    <section 
      id="product-showcase-section" 
      className="relative min-h-screen bg-art-bg/40 py-16 md:py-24 border-t border-b border-art-brown/10"
    >
      <div id="showcase-header" className="mx-auto max-w-4xl px-6 text-center space-y-3 mb-16 relative z-10">
        <span id="showcase-category" className="text-xs font-bold tracking-[0.2em] uppercase text-art-orange">
          The Amira Collection
        </span>
        <h2 id="showcase-title" className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-art-brown tracking-tight">
          Select Your Protective Finish
        </h2>
        <p id="showcase-desc" className="text-sm text-art-dark/80 max-w-xl mx-auto">
          Every Amira product represents a specific aesthetic finish tailored to your lifestyle and skin type. Rotate the shelf below.
        </p>
      </div>

      {/* 3D Perspective Rotation Zone */}
      <div id="carousel-outer-container" className="relative mx-auto max-w-6xl px-6 flex flex-col items-center z-10">
        <div 
          id="carousel-3d-stage" 
          className="relative w-full h-[380px] md:h-[420px] flex items-center justify-center overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {products.map((product, index) => {
            const diff = index - activeIndex;
            // Let's loop around for continuous 3D carousel effect
            let relativeDiff = diff;
            if (diff < -1) relativeDiff = diff + products.length;
            if (diff > 1) relativeDiff = diff - products.length;

            const isActive = relativeDiff === 0;
            const isLeft = relativeDiff === -1 || relativeDiff === 2;
            const isRight = relativeDiff === 1 || relativeDiff === -2;

            let rotateY = 0;
            let translateZ = -220;
            let translateX = 0;
            let opacity = 0;
            let zIndex = 10;

            if (isActive) {
              rotateY = 0;
              translateZ = 0;
              translateX = 0;
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              rotateY = 35;
              translateZ = -180;
              translateX = -280;
              opacity = 0.6;
              zIndex = 20;
            } else if (isRight) {
              rotateY = -35;
              translateZ = -180;
              translateX = 280;
              opacity = 0.6;
              zIndex = 20;
            }

            return (
              <motion.div
                key={product.id}
                id={`carousel-card-${product.id}`}
                className={`absolute w-[240px] md:w-[280px] aspect-[4/5] rounded-[32px] bg-white p-5 border shadow-xl flex flex-col justify-between cursor-pointer transition-all duration-700 select-none ${
                  isActive ? 'border-art-orange/30 shadow-2xl' : 'border-art-brown/10 shadow-md'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex,
                }}
                onClick={() => setActiveIndex(index)}
              >
                {/* Product Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-art-brown uppercase">
                    {product.type} SPF{product.spf}
                  </span>
                  <div className="flex items-center space-x-1 rounded-full bg-art-cream/40 px-2.5 py-1 text-[9px] font-bold text-art-brown">
                    <Star className="h-2.5 w-2.5 fill-current text-art-orange" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* Product Image Area */}
                <div className="relative flex-1 flex items-center justify-center p-2 group overflow-hidden mt-2">
                  <img
                    id={`carousel-image-${product.id}`}
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="h-full object-contain rounded-xl max-h-[160px] transition-transform duration-500 group-hover:scale-105"
                  />
                  {isActive && (
                    <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-art-orange text-white shadow-md animate-bounce">
                      <Eye className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>

                {/* Info summary */}
                <div className="space-y-1 pt-2 border-t border-art-brown/10">
                  <h3 className="text-xs font-bold tracking-wide text-art-brown line-clamp-1">{product.name}</h3>
                  <p className="text-[10px] text-art-orange tracking-wider font-mono uppercase">{product.finish}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Orbit controllers */}
        <div id="carousel-controls" className="flex items-center space-x-6 mt-4">
          <button
            id="btn-carousel-prev"
            onClick={handlePrev}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-art-brown/10 text-art-brown shadow-md transition-all duration-300 hover:border-art-orange hover:text-art-orange hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous Product"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-xs font-mono font-bold tracking-widest text-art-brown">
            {activeIndex + 1} / {products.length} Formulas
          </span>
          <button
            id="btn-carousel-next"
            onClick={handleNext}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-art-brown/10 text-art-brown shadow-md transition-all duration-300 hover:border-art-orange hover:text-art-orange hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next Product"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Selected Product Detail Panel (Below Carousel) */}
      <div id="product-detail-container" className="mx-auto max-w-5xl px-6 mt-16 relative z-10">
        <div id="detail-card-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch rounded-[36px] border border-art-brown/10 bg-white shadow-2xl overflow-hidden">
          {/* Accent Color Strip based on active formula */}
          <div 
            id="detail-color-strip" 
            className="lg:col-span-1 hidden lg:block"
            style={{ backgroundColor: activeProduct.colorHex }}
          />

          {/* Product Details Area */}
          <div id="detail-text-area" className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-art-brown/10 px-3.5 py-1 text-[10px] font-mono tracking-widest uppercase text-art-brown border border-art-brown/15">
                  {activeProduct.type} Block
                </span>
                <span className="rounded-full bg-art-cream px-3.5 py-1 text-[10px] font-mono tracking-widest uppercase text-art-brown border border-art-brown/10">
                  {activeProduct.finish} Finish
                </span>
                <span className="text-xs text-art-brown/60 font-medium">({activeProduct.volume})</span>
              </div>

              <h3 id="active-product-name" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light tracking-tight text-art-brown leading-tight">
                {activeProduct.name}
              </h3>
              
              <p className="text-sm text-art-dark/80 leading-relaxed font-sans">
                {activeProduct.longDescription}
              </p>
            </div>

            {/* Interactive Detail Tabs */}
            <div className="space-y-5">
              <div className="flex border-b border-art-brown/10">
                {(['benefits', 'texture', 'usage'] as const).map((tab) => (
                  <button
                    key={tab}
                    id={`btn-detail-tab-${tab}`}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-xs font-bold tracking-widest uppercase mr-6 transition-all duration-300 relative ${
                      activeTab === tab ? 'text-art-orange' : 'text-art-brown/50 hover:text-art-brown'
                    }`}
                  >
                    {tab === 'benefits' ? 'Key Benefits' : tab === 'texture' ? 'Viscosity Lab' : 'Skin Application'}
                    {activeTab === tab && (
                      <motion.span 
                        id="tab-active-indicator"
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-art-orange rounded-full" 
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="min-h-[140px] flex items-center">
                <AnimatePresence mode="wait">
                  {activeTab === 'benefits' && (
                    <motion.ul
                      key="benefits"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-2.5 w-full"
                    >
                      {activeProduct.keyBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-xs text-art-dark/80">
                          <Check className="h-4 w-4 text-art-orange shrink-0 mr-2.5 mt-0.5 stroke-[2.5]" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </motion.ul>
                  )}

                  {activeTab === 'texture' && (
                    <motion.div
                      key="texture"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-4 w-full"
                    >
                      <div className="rounded-2xl bg-art-bg border border-art-brown/10 p-4 flex flex-col sm:flex-row justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                          <span className="text-[10px] font-mono tracking-widest text-art-brown/50 uppercase font-bold">Texture Type</span>
                          <p className="text-xs font-bold text-art-brown">{textureParams.name}</p>
                          <p className="text-[11px] text-art-dark/75">{activeProduct.textureDescription}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <span className="text-art-brown/50 font-medium">Weight:</span>
                          <span className="font-bold text-art-brown">{textureParams.weight}</span>
                          <span className="text-art-brown/50 font-medium">Absorbs:</span>
                          <span className="font-bold text-art-brown">{textureParams.absorption}</span>
                        </div>
                      </div>

                      {/* Interactive Cream Viscosity Spreading Simulator */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[10px] text-art-brown/70 uppercase tracking-widest font-bold">
                          <span>Simulated Viscosity Spread</span>
                          <span>{viscosityProgress}% Fluidity</span>
                        </div>
                        <input
                          id="texture-viscosity-slider"
                          type="range"
                          min="10"
                          max="100"
                          value={viscosityProgress}
                          onChange={(e) => setViscosityProgress(Number(e.target.value))}
                          className="w-full h-1.5 bg-art-brown/10 rounded-lg appearance-none cursor-pointer accent-art-orange"
                        />
                        <div className="relative h-12 w-full bg-art-bg rounded-2xl overflow-hidden border border-art-brown/10 flex items-center justify-center">
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-art-orange/10 border-r-2 border-art-orange/30 transition-all duration-300"
                            style={{ width: `${(viscosityProgress / 100) * textureParams.spread}%` }}
                          />
                          <span className="text-[11px] text-art-brown font-semibold relative z-10">
                            {viscosityProgress < 30 ? 'Viscous droplet' : viscosityProgress < 75 ? 'Optimal application spread' : 'Watery, immediate melt'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'usage' && (
                    <motion.div
                      key="usage"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-4 w-full"
                    >
                      <p className="text-xs text-art-brown italic font-serif">
                        "{activeProduct.usage}"
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div className="rounded-2xl border border-art-brown/10 p-3.5 flex items-start space-x-3 bg-art-bg/30">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-art-cream text-[10px] font-bold text-art-brown border border-art-brown/10">1</span>
                          <span className="text-[11px] text-art-dark/80 leading-relaxed">Apply two finger-lengths generously onto facial points and back of ears.</span>
                        </div>
                        <div className="rounded-2xl border border-art-brown/10 p-3.5 flex items-start space-x-3 bg-art-bg/30">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-art-cream text-[10px] font-bold text-art-brown border border-art-brown/10">2</span>
                          <span className="text-[11px] text-art-dark/80 leading-relaxed">Reapply every 2 hours under intense sun or after towel drying.</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Checkout & Actions Area */}
          <div id="detail-checkout-area" className="lg:col-span-4 bg-art-bg/80 p-8 md:p-12 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-art-brown/10">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-art-brown/50 uppercase font-bold">Ingredients Lab Form</span>
                <p className="text-xs text-art-dark/75">
                  Formulated with zero synthetics. Key organic active substances:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProduct.ingredients.map((ing) => (
                    <span 
                      key={ing} 
                      className="rounded-lg bg-white border border-art-brown/10 px-2.5 py-1 text-[10px] font-mono text-art-brown font-semibold shadow-sm"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-art-brown/10">
                <span className="text-xs font-mono tracking-widest text-art-brown/50 uppercase font-bold">Interactive Preview</span>
                <div className="p-3.5 rounded-2xl border border-art-orange/20 bg-art-orange/5 flex items-start space-x-2.5">
                  <ShieldCheck className="h-5 w-5 text-art-orange shrink-0 mt-0.5" />
                  <p className="text-[11px] text-art-brown/90 leading-relaxed font-medium">
                    Designed for active cellular photoprotection. Shield is verified for broad-spectrum defense up to 400nm.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 lg:pt-0">
              <button
                id="btn-showcase-order-sample"
                onClick={() => {
                  setSampleOrdered(false);
                  setSampleDrawerOpen(true);
                }}
                className="w-full rounded-full bg-art-brown py-4 text-xs font-bold tracking-[0.15em] uppercase text-white shadow-md transition-all duration-300 hover:bg-art-orange hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Order Free Trial Sample
              </button>
              <p className="text-[10px] text-center text-art-brown/50 font-bold uppercase tracking-widest">
                Free 5ml trial • Only pay $2.99 shipping
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SAMPLE ORDER SIDE DRAWER MODAL */}
      <AnimatePresence>
        {sampleDrawerOpen && (
          <div id="sample-drawer-overlay" className="fixed inset-0 z-50 flex justify-end bg-art-brown/30 backdrop-blur-sm">
            {/* Click outside target */}
            <div 
              id="drawer-dismiss-zone" 
              className="absolute inset-0" 
              onClick={() => setSampleDrawerOpen(false)} 
            />

            <motion.div
              id="sample-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md h-full bg-art-bg shadow-2xl border-l border-art-brown/10 flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div id="drawer-header" className="p-6 border-b border-art-brown/10 flex justify-between items-center bg-white">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono tracking-widest text-art-orange uppercase font-bold">Client Demonstration</span>
                  <h3 className="text-sm font-bold text-art-brown uppercase tracking-[0.15em]">Amira Discovery Order</h3>
                </div>
                <button
                  id="btn-close-drawer"
                  onClick={() => setSampleDrawerOpen(false)}
                  className="text-art-brown/50 hover:text-art-brown p-1.5 hover:bg-art-cream rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Content */}
              <div id="drawer-content" className="flex-1 overflow-y-auto p-6 space-y-6">
                {!sampleOrdered ? (
                  <>
                    <div className="flex items-start space-x-4 p-4 rounded-2xl bg-white border border-art-brown/10 shadow-sm">
                      <img
                        id="drawer-sample-img"
                        src={activeProduct.image}
                        alt="Discovery Sample Tube"
                        referrerPolicy="no-referrer"
                        className="h-16 w-16 object-cover rounded-xl bg-art-bg border border-art-brown/5 p-1"
                      />
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono tracking-widest text-art-orange uppercase font-bold">Trial Edition</span>
                        <h4 className="text-xs font-bold text-art-brown">{activeProduct.name} - 5ml</h4>
                        <p className="text-[11px] text-art-dark/70">Broad-spectrum mineral matrix protective sample tube.</p>
                      </div>
                    </div>

                    {/* Order summary calculations */}
                    <div className="space-y-3.5 border-t border-b border-art-brown/10 py-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-art-brown">Demo Order Pricing</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-art-dark/60 font-medium">Sample Tube (5ml)</span>
                        <span className="font-mono text-art-brown font-bold">FREE</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-art-dark/60 font-medium">Flat-Rate Shipping</span>
                        <span className="font-mono text-art-brown font-bold">$2.99</span>
                      </div>
                      <div className="flex justify-between text-xs font-bold pt-2 border-t border-art-brown/10">
                        <span className="text-art-brown">Total Demo Charge</span>
                        <span className="font-mono text-art-orange">$2.99</span>
                      </div>
                    </div>

                    {/* Simulation checkout fields */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-art-brown">Simulated Address</h4>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] font-mono tracking-widest uppercase text-art-brown/50 mb-1 font-bold">Full Name</label>
                          <input 
                            id="checkout-name" 
                            type="text" 
                            defaultValue="Jane Doe" 
                            className="w-full rounded-xl border border-art-brown/15 bg-white px-3.5 py-2.5 text-xs text-art-brown focus:border-art-orange focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono tracking-widest uppercase text-art-brown/50 mb-1 font-bold">Shipping Destination</label>
                          <input 
                            id="checkout-address" 
                            type="text" 
                            defaultValue="123 Serene Sands Ave, Malibu, CA 90265" 
                            className="w-full rounded-xl border border-art-brown/15 bg-white px-3.5 py-2.5 text-xs text-art-brown focus:border-art-orange focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-art-orange/5 p-4 border border-art-orange/20 flex items-start gap-2 text-art-brown text-xs font-medium">
                      <Sparkles className="h-5 w-5 text-art-orange shrink-0 mt-0.5" />
                      <p>This is an interactive frontend concept. No real credit card is required. Click submit to simulate transaction success.</p>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="flex flex-col items-center justify-center text-center space-y-4 py-8"
                  >
                    <div className="h-16 w-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                      <Check className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-art-brown uppercase tracking-widest">Order Completed</h4>
                      <p className="text-xs text-art-dark/70">Your mock order was processed successfully.</p>
                    </div>
                    <div className="rounded-2xl border border-art-brown/10 bg-white p-4 text-left w-full space-y-2 shadow-sm">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-art-brown/50 font-bold">Order Ref:</span>
                        <span className="font-bold text-art-brown">#AMR-{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-art-brown/50 font-bold">Shipment Status:</span>
                        <span className="font-bold text-art-orange">Pre-authorized</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Drawer Footer */}
              <div id="drawer-footer" className="p-6 border-t border-art-brown/10 bg-white">
                {!sampleOrdered ? (
                  <button
                    id="btn-submit-order"
                    onClick={() => setSampleOrdered(true)}
                    className="w-full rounded-full bg-art-brown py-4 text-xs font-bold tracking-[0.15em] uppercase text-white shadow-md hover:bg-art-orange transition-colors cursor-pointer"
                  >
                    Confirm Order & Pay $2.99
                  </button>
                ) : (
                  <button
                    id="btn-finish-checkout"
                    onClick={() => setSampleDrawerOpen(false)}
                    className="w-full rounded-full bg-art-brown py-4 text-xs font-bold tracking-[0.15em] uppercase text-white shadow-md hover:bg-art-orange transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
