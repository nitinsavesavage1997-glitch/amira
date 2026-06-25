import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { quizQuestions, products } from '../data/sunscreenData';
import { QuizAnswers, Product } from '../types';
import { Check, Sparkles, RefreshCw, Star, HeartPulse, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

interface SkincareQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkincareQuiz({ isOpen, onClose }: SkincareQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    skinType: '',
    activity: '',
    finish: ''
  });
  const [matchingResult, setMatchingResult] = useState<Product | null>(null);
  const [matchScore, setMatchScore] = useState(95);

  const activeQuestion = quizQuestions[currentStep];

  const handleSelectOption = (value: string) => {
    const category = activeQuestion.category;
    setAnswers((prev) => ({
      ...prev,
      [category]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({
      skinType: '',
      activity: '',
      finish: ''
    });
    setMatchingResult(null);
  };

  const calculateResult = () => {
    // Basic scoring matching answers to products properties
    // product 1: hydrating-fluid (finish: 'Dewy/Glow', skinType: ['Dry', 'Combination', 'Sensitive'])
    // product 2: matte-mineral (finish: 'Velvet/Matte', skinType: ['Oily', 'Sensitive', 'Combination'])
    // product 3: active-gel (finish: 'Totally Invisible', skinType: ['Oily', 'Dry', 'Combination'])

    let bestProduct: Product = products[0]; // Default
    let highestScore = 0;

    products.forEach((prod) => {
      let score = 0;
      
      // Match skin type
      if (prod.skinType.includes(answers.skinType)) {
        score += 3;
      }
      
      // Match finish preference
      if (prod.finish === answers.finish) {
        score += 4;
      }

      // Match activity level to UV shield specs
      if (answers.activity === 'Beach/Swimming' && prod.id === 'active-gel') {
        score += 3; // Gel is water resistant
      } else if (answers.activity === 'Outdoor Sports' && prod.id === 'active-gel') {
        score += 2;
      } else if (answers.activity === 'Daily Commute' && prod.id === 'hydrating-fluid') {
        score += 2; // Hydrating fluid is excellent daily
      }

      if (score > highestScore) {
        highestScore = score;
        bestProduct = prod;
      }
    });

    // Generate dynamic matching score (92 - 99)
    const randomPercent = Math.floor(92 + (highestScore / 10) * 7);
    setMatchScore(Math.min(99, randomPercent));
    setMatchingResult(bestProduct);
  };

  if (!isOpen) return null;

  return (
    <div id="quiz-backdrop" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-art-brown/30 backdrop-blur-md">
      {/* Absolute dismiss click zone outside the container card */}
      <div id="quiz-dismiss" className="absolute inset-0" onClick={onClose} />

      <motion.div
        id="quiz-dialog-card"
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        className="relative bg-white rounded-[32px] shadow-2xl border border-art-brown/10 w-full max-w-2xl overflow-hidden min-h-[500px] flex flex-col justify-between z-10"
      >
        {/* Quiz Header */}
        <div id="quiz-header" className="p-6 md:p-8 bg-art-bg/40 border-b border-art-brown/10 flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-art-orange uppercase font-extrabold">Amira Lab Diagnosis</span>
            <h3 className="text-sm font-bold text-art-brown uppercase tracking-wider">SPF & Skincare Matcher</h3>
          </div>
          <button
            id="quiz-btn-close"
            onClick={onClose}
            className="text-art-brown/50 hover:text-art-brown p-2 hover:bg-art-bg/40 rounded-full transition-colors font-semibold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar (Visible while taking quiz) */}
        {!matchingResult && (
          <div id="quiz-progress-track" className="w-full h-1.5 bg-art-brown/10 relative">
            <div 
              id="quiz-progress-fill" 
              className="h-full bg-art-orange transition-all duration-300"
              style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        )}

        {/* Quiz Body */}
        <div id="quiz-body-content" className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!matchingResult ? (
              <motion.div
                key="currentStep"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Question */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-art-orange uppercase">
                    Step {currentStep + 1} of {quizQuestions.length}
                  </span>
                  <h4 className="text-lg md:text-xl font-serif font-bold text-art-brown tracking-tight">
                    {activeQuestion.question}
                  </h4>
                </div>

                {/* Grid of Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeQuestion.options.map((option) => {
                    const isSelected = answers[activeQuestion.category] === option.value;
                    return (
                      <button
                        key={option.value}
                        id={`quiz-option-${option.value.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => handleSelectOption(option.value)}
                        className={`text-left p-4 rounded-2xl border-2 transition-all duration-300 relative flex flex-col justify-between space-y-2.5 group cursor-pointer ${
                          isSelected
                            ? 'border-art-orange/30 bg-art-orange/5 shadow-sm'
                            : 'border-art-brown/10 bg-white hover:border-art-orange/45 hover:bg-art-bg/20'
                        }`}
                      >
                        <div className="flex justify-between items-start w-full">
                          <span className={`text-xs font-bold uppercase tracking-wider ${isSelected ? 'text-art-brown' : 'text-art-brown/80'}`}>
                            {option.label}
                          </span>
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'bg-art-orange border-art-orange text-white' : 'border-art-brown/25 text-transparent group-hover:border-art-orange/40'
                          }`}>
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        </div>
                        <p className="text-[11px] text-art-dark/75 leading-relaxed font-sans">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              // Recommendation Result screen
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-2"
              >
                {/* Result left column: Product visual card */}
                <div className="md:col-span-5 flex flex-col items-center p-4 bg-art-bg/40 rounded-[24px] border border-art-brown/10 relative">
                  <div className="absolute top-3 left-3 bg-art-brown text-white rounded-full px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                    {matchScore}% Match
                  </div>
                  
                  <img
                    id="quiz-result-product-image"
                    src={matchingResult.image}
                    alt={matchingResult.name}
                    referrerPolicy="no-referrer"
                    className="h-44 object-contain rounded-xl mt-4"
                  />

                  <div className="text-center space-y-1 mt-4">
                    <h5 className="text-xs font-serif font-bold text-art-brown line-clamp-1">{matchingResult.name}</h5>
                    <p className="text-[10px] font-mono text-art-orange uppercase font-bold">{matchingResult.subtitle}</p>
                  </div>
                </div>

                {/* Result right column: Customized cellular diagnosis summary */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-600 uppercase font-bold">Diagnosis Complete</span>
                    <h4 className="text-lg font-serif font-bold text-art-brown tracking-tight">Your Skin Shield Profile</h4>
                  </div>

                  <p className="text-xs text-art-dark/85 leading-relaxed font-sans">
                    Based on your <strong>{answers.skinType}</strong> skin type and <strong>{answers.activity}</strong> profile, your skin needs broad-spectrum protection that leaves a <strong>{matchingResult.finish}</strong> finish.
                  </p>

                  <div className="rounded-2xl border border-art-brown/10 bg-art-bg/40 p-4 space-y-2 text-xs text-art-brown">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-600 stroke-[2.5]" />
                      <span className="font-bold text-art-brown">Custom Shield recommendation:</span>
                    </div>
                    <ul className="space-y-1.5 pl-5 list-disc text-[11px] text-art-dark/85 font-sans">
                      <li>Maintains hydration balanced for {answers.skinType} epidermis.</li>
                      <li>Water/HEV blue-light protective factors aligned with active {answers.activity} level.</li>
                      <li>Pore-friendly, zero white-cast fluid leaves an elegant {answers.finish} skin texture.</li>
                    </ul>
                  </div>

                  {/* Tips box */}
                  <div className="text-[10px] font-mono text-art-brown/70 bg-art-bg/50 border border-art-brown/10 p-3 rounded-xl flex items-center space-x-2">
                    <Sparkles className="h-3.5 w-3.5 text-art-orange shrink-0" />
                    <span>Apply 15 minutes before light exposure. Perfect as a protective skin primer.</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quiz Footer Actions */}
        <div id="quiz-footer-actions" className="p-6 bg-art-bg/40 border-t border-art-brown/10 flex items-center justify-between">
          {!matchingResult ? (
            <>
              <button
                id="quiz-btn-prev"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 rounded-full border border-art-brown/10 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-art-brown/70 transition-colors cursor-pointer ${
                  currentStep === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-art-bg/25 hover:text-art-brown'
                }`}
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>

              <button
                id="quiz-btn-next"
                onClick={handleNextStep}
                disabled={!answers[activeQuestion.category]}
                className={`flex items-center space-x-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-md transition-all cursor-pointer ${
                  !answers[activeQuestion.category]
                    ? 'bg-art-brown/10 text-art-brown/30 cursor-not-allowed shadow-none'
                    : 'bg-art-brown hover:bg-art-orange hover:shadow-lg active:scale-95'
                }`}
              >
                <span>{currentStep === quizQuestions.length - 1 ? 'Analyze Results' : 'Next Step'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <>
              <button
                id="quiz-btn-retry"
                onClick={resetQuiz}
                className="flex items-center space-x-1.5 rounded-full border border-art-brown/10 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-art-brown/70 hover:bg-art-bg/25 hover:text-art-brown transition-all cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 animate-spin-slow" />
                <span>Re-diagnose</span>
              </button>

              <button
                id="quiz-btn-accept"
                onClick={onClose}
                className="rounded-full bg-art-brown px-8 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-md hover:bg-art-orange hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                Done
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
