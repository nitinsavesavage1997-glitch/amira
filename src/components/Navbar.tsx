import React from 'react';
import { Sun, Sparkles, Shield, Compass, Beaker, HelpCircle } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  openQuiz: () => void;
}

export default function Navbar({ activeSection, setActiveSection, openQuiz }: NavbarProps) {
  const navItems = [
    { id: 'showcase', label: 'Showcase', icon: Compass },
    { id: 'uv-shield', label: 'UV Shield Simulator', icon: Shield },
    { id: 'alchemist', label: 'Ingredient Lab', icon: Beaker },
  ];

  return (
    <header 
      id="main-header" 
      className="sticky top-0 z-50 w-full border-b border-art-brown/10 bg-art-bg/85 backdrop-blur-md transition-all duration-300 shadow-sm"
    >
      <div id="header-container" className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand Logo */}
        <div 
          id="brand-logo-container" 
          className="flex cursor-pointer items-center space-x-3 group"
          onClick={() => setActiveSection('hero')}
        >
          <div id="brand-icon-wrapper" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-art-brown/10 text-art-brown transition-transform duration-500 group-hover:rotate-180">
            <Sun id="brand-icon-sun" className="h-5 w-5" />
            <Sparkles id="brand-icon-sparkle" className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 text-art-orange" />
          </div>
          <span 
            id="brand-name-text" 
            className="font-serif text-3xl font-bold tracking-[0.2em] text-art-brown uppercase"
          >
            Amira
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden md:flex items-center space-x-12">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center space-x-2 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 relative py-2 ${
                  isActive 
                    ? 'text-art-brown' 
                    : 'text-art-dark/60 hover:text-art-orange'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="font-sans">{item.label}</span>
                {isActive && (
                  <span 
                    id={`active-indicator-${item.id}`}
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-art-brown rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button */}
        <div id="header-actions" className="flex items-center space-x-4">
          <button
            id="nav-btn-find-spf"
            onClick={openQuiz}
            className="flex items-center space-x-2 rounded-full bg-art-brown px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase text-white shadow-md transition-all duration-300 hover:bg-art-orange hover:shadow-lg active:scale-95"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Find your SPF</span>
          </button>
        </div>
      </div>
    </header>
  );
}
