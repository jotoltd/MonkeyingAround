import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Star, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Instagram,
  Facebook,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data imports
import { CampDetails, ACTIVITIES } from './data';

// Component imports
import { ActivityCard } from './components/ActivityCard';
import { MonkeyQuiz } from './components/MonkeyQuiz';
import { LocationSection } from './components/LocationSection';
import { CampSessions } from './components/CampSessions';
import { HomePageOld } from './components/HomePageOld';

// Image imports
import monkeyJungleHero from './assets/images/crawley_hero.png';
import monkeyMascot from './assets/images/ma_logo.png';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [splashAnimation, setSplashAnimation] = useState(true);
  const [showOldHomepage, setShowOldHomepage] = useState(false);

  // Auto-scroll anchor links safely
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Fun little jungle loading splash screen on mount to enhance premium visual identity
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashAnimation(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const FAQS = [
    {
      q: "What are the exact hours for drop-off and pickup?",
      a: "Drop-off is expected to open at 08:30 AM and run in a relaxed entry window until 09:15 AM. Activities wrap up around 16:15 PM, and pickups run until 16:30 PM. (Please note that all exact timings are currently to be confirmed is subject to final details)."
    },
    {
      q: "What age groups are accommodated at the camps?",
      a: "Our camps are expertly structured for children aged 5 to 11. To ensure all children have safe, age-appropriate fun, we divide campers into age sub-groups (e.g., 5–7 age group for sensory arts & basic sports; 8–11 age group for tactical nerf battles, advanced engineering and active relays)."
    },
    {
      q: "Are the instructors fully checked and certified?",
      a: "Absolutely! Safeguarding is our number one law. Every single team member undergoes an Enhanced DBS check, holds certified child protection training, and we maintain paediatric first-aiders on site at all times during core hours."
    },
    {
      q: "What is your bad weather backup policy?",
      a: "We are blessed with outstanding indoor facilities at Waterfield Primary School! If it rains, outdoor activities like water play are swapped for indoor sports tournaments, Lego building masterclasses, or dramatic dress-up play in the spacious multi-purpose school gymnasium."
    },
    {
      q: "My child has food allergies. Is cooking and eating safe?",
      a: "Yes. Monkeying Around is a strictly Nut-Free holiday camp. All cooking sessions utilize hypoallergenic ingredients, and our staff are fully briefed on dietary protocols. Parents can specify full allergy profiles during registration on the Bookaby portal."
    }
  ];

  return (
    <>
      {showOldHomepage ? (
        <HomePageOld onBack={() => setShowOldHomepage(false)} />
      ) : (
        <div className="min-h-screen bg-[#16001e] text-white font-sans selection:bg-[#ff00fc] selection:text-white relative overflow-x-hidden">
      
      {/* 1. Loading Splash overlay */}
      <AnimatePresence>
        {splashAnimation && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#16001e] z-50 flex flex-col items-center justify-center text-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: [0.8, 1.1, 1], rotate: [0, 15, 0] }}
              transition={{ duration: 0.8 }}
              className="w-56 h-56 border-3 border-[#ff00fc] bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,0,252,0.5)]"
            >
              <img 
                src={monkeyMascot} 
                alt="Monkeying Around Mascot" 
                className="w-52 h-52 object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background whimsical decorations */}
      <div className="absolute top-[20%] left-[-100px] w-60 h-60 bg-[#8081ff]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[50%] right-[-100px] w-65 h-65 bg-[#ff00fc]/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Floating Vine decorations in headers */}
      <div className="bg-gradient-to-r from-[#16001e] to-[#610f7f] text-white py-2 text-center text-xs font-display font-medium tracking-wide flex items-center justify-center gap-2 px-4 border-b border-[#610f7f] z-40 relative">
        <span className="animate-bounce">📣</span>
        <span>Summer Camps Live in Crawley! Ages 5 to 11. <strong>Limited slots remaining!</strong></span>
        <a 
          href="https://bookaby.me/monkeying-around-ltd"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono ml-2 hover:text-[#ff00fc] cursor-pointer"
        >
          Book Now
        </a>
      </div>

      {/* 2. MAIN HEADER (Sticky & Playful) */}
      <header className="sticky top-0 bg-[#16001e]/85 backdrop-blur-md border-b border-[#610f7f] z-30 transition-all duration-300 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo Group */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center text-left focus:outline-none group cursor-pointer"
            id="brand-logo-btn"
          >
            <img 
              src={monkeyMascot} 
              alt="Monkeying Around" 
              className="w-40 h-40 md:w-48 md:h-48 object-contain group-hover:rotate-12 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Nav anchors desktop */}
          <nav className="hidden lg:flex items-center gap-7">
          </nav>

          {/* Book button right desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="https://bookaby.me/monkeying-around-ltd"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#ff00fc] hover:bg-[#ff43fd] text-white font-display font-bold rounded-xl text-xs border border-white/20 tracking-wide transition-all hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(255,0,252,0.3)]"
              id="header-book-btn"
            >
              Book Sizzling Summer! 🚀
            </a>
          </div>

          </div>
      </header>

      {/* 3. HERO SHOWCASE INTRO */}
      <section className="px-4 md:px-8 pt-8 pb-16" id="welcome-section">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Left Block */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            

            <h2 className="text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[1.02] tracking-tight">
              Let's Start <br />
              <span className="text-[#ff00fc]">
                Monkeying Around!
              </span>
            </h2>

            <p className="text-xl md:text-2xl font-sans text-white/90 leading-relaxed mt-6 max-w-2xl">
              Keep your child entertained, safe, and absolutely happy all Summer long! Join our premium Multi-Activity Holiday Camps with our first in Crawley. Packed with endless laughter, physical games, creative arts, and splashing pools.
            </p>

            {/* Quick bullets of activities */}
            <div className="grid grid-cols-2 gap-4 my-8 font-sans text-base sm:text-lg font-extrabold max-w-xl">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#8081ff] flex items-center justify-center text-white text-xs shrink-0 font-bold">✓</span>
                <span>Multi-Sports</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ff00fc] flex items-center justify-center text-white text-xs shrink-0 font-bold">✓</span>
                <span>Arts & Crafts Hub</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#00d2ff] flex items-center justify-center text-white text-xs shrink-0 font-bold">✓</span>
                <span>Splash Water Fights</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs shrink-0 font-bold">✓</span>
                <span>Nerf War Arena</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-white text-xs shrink-0 font-bold">✓</span>
                <span>Baking & Cooking</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#610f7f] flex items-center justify-center text-white text-xs shrink-0 font-bold">✓</span>
                <span>Lego Master Builders</span>
              </div>
            </div>

            {/* CTA action group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://bookaby.me/monkeying-around-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#ff00fc] hover:bg-[#ff43fd] text-white font-display font-extrabold text-base rounded-2xl text-center border border-white/20 transition-transform hover:-translate-y-1 shadow-[0_4px_20px_rgba(255,0,252,0.4)]"
                id="hero-book-button-cta"
              >
                Secure Summer Spot Online! ☀️
              </a>
            </div>

            
          </div>

          {/* Majestic Hero Banner Right Art */}
          <div className="lg:col-span-6 justify-self-center w-full max-w-lg lg:max-w-none relative">
            {/* Whimsical absolute leaf elements */}
            <div className="absolute top-[-20px] left-[-20px] text-5xl jungle-item-float z-10">🌿</div>
            <div className="absolute bottom-[-20px] right-[-20px] text-5xl jungle-item-float z-10" style={{ animationDelay: '2s' }}>🌴</div>
            
            <div className="border-3 border-[#610f7f] rounded-[2.5rem] overflow-hidden bg-[#16001e]/80 p-4 shadow-[0_0_30px_rgba(255,0,252,0.15)] relative">
              
              {/* Image banner */}
              <img 
                src={monkeyJungleHero} 
                alt="Cheeky summer monkey swinging in jungle" 
                className="w-full h-auto rounded-[2rem] object-contain border border-[#610f7f]"
                referrerPolicy="no-referrer"
              />

              
            </div>
          </div>

        </div>
      </section>

      {/* 4. SEVEN SEALS / VALUES BAND */}
      <section className="bg-gradient-to-r from-[#16001e] via-[#610f7f]/30 to-[#16001e] text-white py-12 border-y border-[#610f7f]/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-3.5">
            <span className="text-4xl">🦸</span>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Safeguarding
              </h4>
              <p className="text-xs text-white/70 font-sans mt-1">
                All staff are under rigorous background checks and hold enhanced DBS certificates.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-4xl">🍕</span>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                All-In Nutrition Safety
              </h4>
              <p className="text-xs text-white/70 font-sans mt-1">
                100% Nut-Free zones holding meticulous, double-checked dietary logs for all allergy levels.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-4xl">🎯</span>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Age Segmented Play
              </h4>
              <p className="text-xs text-white/70 font-sans mt-1">
                Divided groups (5-7 and 8-11 years) guarantee age-relevant engineering and sporty games.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <span className="text-4xl">🥇</span>
            <div>
              <h4 className="font-display font-bold text-lg text-white">
                Daily Celebration
              </h4>
              <p className="text-xs text-white/70 font-sans mt-1">
                Every child can show off their skills and win awards!
              </p>
            </div>
          </div>

        </div>
      </section>

      
      {/* 6. SUMMER CAMP BOOKING SESSIONS */}
      <section className="bg-gradient-to-b from-[#16001e] via-[#610f7f]/10 to-[#16001e] py-20 border-y border-[#610f7f]/20" id="sessions-container">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white text-center tracking-tight">
              Sizzling Summer Sessions
            </h2>
            <p className="text-sm md:text-base text-white/80 text-center max-w-lg font-sans mt-3">
              Explore our active summer days! Choose between standard full-day schedules or extended play hours with instant booking processing.
            </p>
          </div>

          <CampSessions />
        </div>
      </section>



      
      
      
      {/* 10. HOW TO FIND WATERFIELD PRIMARY SCHOOL */}
      <section className="px-4 md:px-8 py-20 max-w-4xl mx-auto relative overflow-hidden" id="location-container">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8081ff]/10 via-transparent to-[#ff00fc]/10 pointer-events-none" />
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#8081ff]/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute bottom-[-30px] left-[-30px] w-24 h-24 bg-[#ff00fc]/20 rounded-full blur-[50px] pointer-events-none" />
        <div className="flex flex-col items-center mb-12 text-center relative z-10">
          <div className="p-3 bg-[#8081ff]/10 text-[#8081ff] rounded-full mb-3">
            📍
          </div>
          <h3 className="text-3xl font-display font-medium text-white">
            How to Find Waterfield Primary School
          </h3>
          <p className="text-sm font-sans text-white/70 mt-1 max-w-sm">
            Convenient drop-offs and secure access at our Crawley location.
          </p>
        </div>

        <div className="bg-[#16001e]/80 border border-[#610f7f]/40 rounded-3xl p-8 shadow-[0_4px_20px_rgba(255,0,252,0.06)] relative z-10">
          <div className="text-center mb-8">
            <h4 className="text-xl font-display font-bold text-white mb-3">
              Waterfield Primary School
            </h4>
            <p className="text-white/80 font-sans mb-6">
              Waterfield Gardens, Crawley RH11 8RA
            </p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Waterfield+Primary+School+Waterfield+Gardens+Crawley+RH11+8RA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8081ff] hover:bg-[#9b9bff] text-white font-display font-semibold rounded-xl transition-all hover:-translate-y-0.5 shadow-[0_4px_15px_rgba(128,129,255,0.3)]"
              id="google-maps-directions"
            >
              <ExternalLink size={18} />
              Get Directions on Google Maps
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚗</span>
              <div>
                <h5 className="font-display font-semibold text-white mb-1">By Car</h5>
                <p className="text-white/70 font-sans">
                  Free parking available on surrounding streets. Main entrance on Waterfield Gardens.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚌</span>
              <div>
                <h5 className="font-display font-semibold text-white mb-1">By Bus</h5>
                <p className="text-white/70 font-sans">
                  Routes 1, 2, and 3 stop nearby. Check local bus schedules for current times.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ ACCORDION */}
      <section className="px-4 md:px-8 py-20 max-w-4xl mx-auto" id="faq-container">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="p-3 bg-[#ff00fc]/10 text-[#ff00fc] rounded-full mb-3">
            <HelpCircle size={24} />
          </div>
          <h3 className="text-3xl font-display font-medium text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-sm font-sans text-white/70 mt-1 max-w-sm">
            Everything you need to worry-free send your little monkey to our campgrounds.
          </p>
        </div>

        {/* Dynamic FAQ list */}
        <div className="space-y-3.5">
          {FAQS.map((faq, idx) => {
            const isActive = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="border border-[#610f7f]/40 bg-[#16001e]/80 rounded-2xl overflow-hidden shadow-[0_2px_15px_rgba(255,0,252,0.04)]"
              >
                <button
                  onClick={() => setActiveFaq(isActive ? null : idx)}
                  className="w-full p-5 flex justify-between items-center text-left focus:outline-none transition-colors hover:bg-[#ff00fc]/5 cursor-pointer"
                  id={`faq-btn-toggle-${idx}`}
                >
                  <span className="font-display font-bold text-sm md:text-base text-white">
                    {faq.q}
                  </span>
                  <div className={`p-1 bg-[#8081ff]/10 text-[#8081ff] rounded-md transition-transform ${
                    isActive ? 'rotate-180 text-[#ff00fc]' : ''
                  }`}>
                    <ChevronDown size={16} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs md:text-sm font-sans text-white/80 leading-relaxed border-t border-[#610f7f]/20 bg-[#610f7f]/10">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 12. FINAL FOOTER JUNGLE */}
      <footer className="bg-[#16001e] text-white pt-20 pb-8 border-t border-[#610f7f]/30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          
          {/* Conversion banner card */}
          <div className="border border-[#ff00fc]/50 rounded-3xl bg-gradient-to-r from-[#16001e] via-[#610f7f]/60 to-[#16001e] p-8 md:p-10 shadow-[0_4px_30px_rgba(255,0,252,0.15)] flex flex-col md:flex-row justify-between items-center gap-8 mb-16 relative overflow-hidden">
            
            {/* Ambient bottom light */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#8081ff]/20 to-[#ff00fc]/20 pointer-events-none opacity-40" />

            <div className="relative max-w-xl text-center md:text-left">
              <h4 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight leading-none">
                Got any questions?
              </h4>
              <p className="text-sm font-sans text-white/95 mt-3 leading-relaxed">
                Drop us an email with any questions you might have, we will aim to get back to you within 42 hours.
              </p>
            </div>

            <div className="relative flex-shrink-0 w-full md:w-auto text-center">
              <a
                href="https://bookaby.me/monkeying-around-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#ff00fc] hover:bg-[#ff43fd] text-white font-display font-extrabold text-base rounded-2xl block text-center border border-white/20 shadow-[0_4px_20px_rgba(255,0,252,0.4)] transition-all hover:-translate-y-1 cursor-pointer"
                id="footer-action-btn-primary"
              >
                Register Online Instantly! 🐒
              </a>
              <p className="text-[10px] text-white/70 font-sans mt-2">
                Processed via secure portal on Bookaby
              </p>
            </div>
          </div>

          {/* Core Footer Link Directory */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12 mb-10">
            <div className="md:col-span-5">
              <div className="mb-3">
                <img src={monkeyMascot} alt="Monkey logo" className="w-20 h-20 object-contain" />
              </div>
              <p className="text-xs text-white/70 font-sans leading-relaxed max-w-sm">
                Holiday multi-activity camps built to elevate physical fitness, foster artistic self-confidence, and keep children aged 5 to 11 safe and happily engaged on school holidays.
              </p>
              <div className="flex gap-2.5 mt-5">
                <a href="https://facebook.com" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white transition-colors" aria-label="Facebook">
                  <Facebook size={16} />
                </a>
                <a href="https://instagram.com" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 text-white transition-colors" aria-label="Instagram">
                  <Instagram size={16} />
                </a>
              </div>
            </div>

            {/* Quick anchors */}
            <div className="md:col-span-3">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#8081ff] mb-3.5">
                SUMMER PROGRAMS
              </h5>
              <ul className="space-y-2 text-xs text-white/75 font-sans">
                <li>⚽ Multi-Sports Madness</li>
                <li>🎨 Arts & Crafts Studio</li>
                <li>🧁 Cold-Baking & Cooking</li>
                <li>🔫 Shield Nerf Arena</li>
                <li>💦 Wednesday Splash Zone</li>
                <li>🧱 Master Lego Builders</li>
              </ul>
            </div>

            {/* Venue & Details Info */}
            <div className="md:col-span-4 font-sans text-xs text-white/70">
              <h5 className="font-display font-bold text-xs uppercase tracking-wider text-[#8081ff] mb-3.5">
                CAMP HEADQUARTERS
              </h5>
              <p className="font-semibold text-white mb-1">Waterfield Primary School</p>
              <p>Waterfield Gardens, Crawley RH11 8RA</p>
              

              <p className="font-semibold text-white mt-4 mb-1">Secure Registration Page</p>
              <a 
                href="https://bookaby.me/monkeying-around-ltd"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff00fc] inline-flex items-center gap-1 font-bold text-white"
              >
                bookaby.me/monkeying-around-ltd <ExternalLink size={10} />
              </a>
            </div>

          </div>

          {/* Legal bottom row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-white/50 font-sans">
            <p>&copy; {new Date().getFullYear()} Monkeying Around Ltd. Company number 17281002. Registered in England & Wales. All rights reserved.</p>
            <p>
              Website created by{' '}
              <a 
                href="https://sitesthatslap.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                Sites That Slap
              </a>
              {' '}("sitesthatslap.com")
            </p>
          </div>

        </div>
      </footer>

    </div>
      )}
      </>
  );
}
