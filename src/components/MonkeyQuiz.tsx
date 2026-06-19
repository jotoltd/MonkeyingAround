import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from '../data';
import { QuizResult } from '../types';
import { Sparkles, RefreshCw, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MonkeyQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scores, setScores] = useState({ creative: 0, sporty: 0, adventurous: 0, strategic: 0 });
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Handle option picking
  const handleAnswerPick = (points: { creative: number; sporty: number; adventurous: number; strategic: number }) => {
    const newScores = {
      creative: scores.creative + points.creative,
      sporty: scores.sporty + points.sporty,
      adventurous: scores.adventurous + points.adventurous,
      strategic: scores.strategic + points.strategic,
    };

    setScores(newScores);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate winner
      finishQuiz(newScores);
    }
  };

  // Compute final archetype
  const finishQuiz = (finalScores: { creative: number; sporty: number; adventurous: number; strategic: number }) => {
    let highestTrait: string = 'creative';
    let maxVal = -1;

    const entries = Object.entries(finalScores) as [string, number][];
    entries.forEach(([trait, val]) => {
      if (val > maxVal) {
        maxVal = val;
        highestTrait = trait;
      }
    });

    // Match index corresponding to: Chimp Picasso (0), Gymnestic Gorilla (1), Rampage Captain (2), Orangutan (3)
    let matchedResult = QUIZ_RESULTS[0];
    if (highestTrait === 'sporty') matchedResult = QUIZ_RESULTS[1];
    else if (highestTrait === 'adventurous') matchedResult = QUIZ_RESULTS[2];
    else if (highestTrait === 'strategic') matchedResult = QUIZ_RESULTS[3];

    setResult(matchedResult);
    setQuizFinished(true);
  };

  // Reset quiz
  const handleReset = () => {
    setCurrentStep(0);
    setScores({ creative: 0, sporty: 0, adventurous: 0, strategic: 0 });
    setQuizFinished(false);
    setResult(null);
  };

  return (
    <div className="border-3 border-[#610f7f] bg-[#16001e] text-white rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_rgba(255,0,252,0.15)] relative overflow-hidden" id="monkey-style-quiz">
      {/* Dynamic background lighting */}
      <div className="absolute top-0 left-12 w-48 h-48 bg-[#ff00fc] opacity-10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-12 w-48 h-48 bg-[#8081ff] opacity-10 blur-3xl pointer-events-none" />

      {!quizFinished ? (
        <div>
          {/* Header Progress info */}
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#ff00fc]">
                Activity Matchmaker
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-medium text-white">
                Find Your Inner Monkey! 🐵
              </h3>
            </div>
            <div className="text-right">
              <span className="font-display text-sm text-[#8081ff] font-bold">
                Question {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="w-24 bg-white/10 h-2.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-[#ff00fc] h-full rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <h4 className="text-lg md:text-2xl font-display font-medium text-white leading-snug">
                {QUIZ_QUESTIONS[currentStep].question}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerPick(option.points)}
                    className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-[#ff00fc] transition-all text-sm md:text-base font-sans text-white/90 focus:outline-none flex justify-between items-center group custom-quiz-option shadow-sm"
                    id={`quiz-btn-step-${currentStep}-opt-${idx}`}
                  >
                    <span>{option.text}</span>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all text-[#ff00fc]" />
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="text-[10px] font-sans text-white/40 mt-6 text-center">
            Designed for kids & parents to enjoy together. Discover your ideal timetable items!
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-4"
        >
          {/* Confetti element */}
          <span className="text-5xl inline-block mb-3 jungle-item-float">🏆</span>
          
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff00fc] block mb-2">
            YOUR CAMP ARCHETYPE MATCH IS:
          </span>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
            {result?.title}
          </h3>

          <span className="inline-block py-1 px-4 text-xs font-display font-bold uppercase tracking-wider rounded-full bg-[#610f7f] border border-[#ff00fc] text-white mb-4">
            {result?.badge}
          </span>

          <div className="max-w-xl mx-auto bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
            <p className="text-sm font-sans text-white/80 leading-relaxed">
              {result?.description}
            </p>
          </div>

          <div className="max-w-lg mx-auto text-left mb-8">
            <h4 className="font-display text-sm font-bold text-[#8081ff] uppercase mb-3 tracking-wider text-center">
              Our suggested camp activities for you:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result?.recs.map((rec, idx) => (
                <div 
                  key={idx} 
                  className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-sans font-medium text-white flex items-center gap-2"
                >
                  <span className="text-sm">🐒</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-[#ff00fc] hover:bg-[#ff43fd] text-white text-sm font-display font-extrabold rounded-xl border border-white/20 transition-all focus:outline-none flex items-center gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-[0_4px_15px_rgba(255,0,252,0.4)]"
              id="quiz-btn-reset"
            >
              <RefreshCw size={14} className="animate-spin-slow" /> Play Again! 🐒
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
