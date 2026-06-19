import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

interface Session {
  id: string;
  type: 'Extended' | 'Full Day';
  date: string;
  dayName: string;
  time: string;
  price: string;
  url: string;
  badge?: string;
}

const SESSION_DATA: Session[] = [
  {
    id: 'mon-extended',
    type: 'Extended',
    date: 'Mon 27th Jul 2026',
    dayName: 'Monday',
    time: '8am - 5pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/05f647c5-800f-4246-949f-88edca955f0b'
  },
  {
    id: 'mon-full',
    type: 'Full Day',
    date: 'Mon 27th Jul 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/44a28524-8cca-4d87-81b9-ce89bd133299'
  },
  {
    id: 'tue-extended',
    type: 'Extended',
    date: 'Tue 28th Jul 2026',
    dayName: 'Tuesday',
    time: '8am - 5pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/7fcd5162-5a9a-4c3d-890a-edc2a7ab1296'
  },
  {
    id: 'tue-full',
    type: 'Full Day',
    date: 'Tue 28th Jul 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/c781eb9e-0a22-44cc-901e-fad0bfada793'
  }
];

export const CampSessions: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'All' | 'Monday' | 'Tuesday'>('All');

  const filteredSessions = SESSION_DATA.filter(session => {
    if (selectedDay === 'All') return true;
    return session.dayName === selectedDay;
  });

  return (
    <div className="w-full">
      {/* Day Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {(['All', 'Monday', 'Tuesday'] as const).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3.5 rounded-2xl text-sm sm:text-base md:text-lg font-display font-extrabold transition-all border cursor-pointer ${
              selectedDay === day
                ? 'bg-[#ff00fc] text-white border-[#ff00fc] shadow-[0_4px_18px_rgba(255,0,252,0.4)] scale-[1.03]'
                : 'bg-[#16001e]/80 text-white/75 border-[#610f7f]/40 hover:text-white hover:border-[#ff00fc]/40'
            }`}
          >
            {day === 'All' ? '📅 Show All Days' : day === 'Monday' ? '🐒 Monday 27th Jul' : '🍌 Tuesday 28th Jul'}
          </button>
        ))}
      </div>

      {/* Grid of Sessions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {filteredSessions.map((session) => (
          <motion.div
            layout
            key={session.id}
            className="relative overflow-hidden rounded-3xl border-2 border-[#610f7f]/60 bg-[#16001e]/90 p-8 shadow-lg transition-all hover:border-[#ff00fc]/80 hover:shadow-[0_4px_25px_rgba(255,0,252,0.15)] flex flex-col justify-between group"
          >
            {/* Top design background shape */}
            <div className="absolute top-[-40px] right-[-40px] w-28 h-28 bg-[#ff00fc]/5 rounded-full blur-xl group-hover:bg-[#ff00fc]/10 transition-colors duration-300" />
            
            <div>
              {/* Card Badge & Type Header */}
              <div className="flex justify-between items-center mb-5">
                <span className={`px-4 py-1.5 text-xs font-mono font-extrabold uppercase rounded-full tracking-wider border ${
                  session.type === 'Extended'
                    ? 'bg-[#ff00fc]/15 text-[#ff00fc] border-[#ff00fc]/40'
                    : 'bg-[#8081ff]/15 text-[#8081ff] border-[#8081ff]/40'
                }`}>
                  ⚡ {session.type} Day
                </span>
              </div>

              {/* Day & Date info */}
              <h3 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight flex items-center gap-3.5 mb-2">
                <Calendar className="text-[#ff00fc] shrink-0" size={26} />
                {session.date}
              </h3>

              {/* Row: Details */}
              <div className="flex flex-col gap-3 mt-5 text-white/95 font-sans text-base sm:text-lg border-t border-white/5 pt-5 mb-8">
                <div className="flex items-center gap-3">
                  <Clock size={20} className="text-[#8081ff] shrink-0" />
                  <span>Time: <strong className="text-white text-lg sm:text-xl">{session.time}</strong></span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-extrabold shrink-0 text-2xl">£</span>
                  <span>Price: <strong className="text-white text-xl sm:text-2xl">{session.price}</strong> <span className="text-xs text-white/60 font-semibold">per child</span></span>
                </div>
              </div>
            </div>

            {/* Bookaby Call To Action Button (Real URL) */}
            <div>
              <a
                href={session.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-[#ff00fc] to-[#a100ff] hover:from-[#ff43fd] hover:to-[#bd33ff] text-white font-display font-black rounded-2xl text-base md:text-lg border border-white/20 tracking-wide transition-all shadow-[0_4px_18px_rgba(255,0,252,0.4)] hover:scale-[1.01] cursor-pointer"
              >
                Book This Session <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        ))}

        {/* Informative placeholder card indicating "more dates tbc" */}
        {selectedDay === 'All' && (
          <motion.div
            layout
            className="relative overflow-hidden rounded-3xl border-2 border-[#610f7f]/30 bg-gradient-to-b from-[#16001e]/80 to-[#16001e]/20 p-8 flex flex-col justify-center items-center text-center group border-dashed"
          >
            <div className="w-14 h-14 rounded-full bg-[#8081ff]/10 flex items-center justify-center text-[#8081ff] mb-4">
              <Sparkles size={28} className="animate-[pulse_2s_infinite]" />
            </div>
            
            <h4 className="text-2xl font-display font-extrabold text-white tracking-tight mb-2">
              Future Dates & Sessions
            </h4>
            
            <p className="text-sm sm:text-base text-white/70 font-sans max-w-xs leading-relaxed mb-5">
              Stay tuned! More wild jungle camp dates are currently to be confirmed (TBC) for the rest of the holiday term.
            </p>
            
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#8081ff]/15 text-[#8081ff] text-xs font-mono font-extrabold uppercase rounded-full border border-[#8081ff]/20">
              ⚡ MORE DATES TBC
            </span>
          </motion.div>
        )}
      </div>

      {/* Trust banner */}
      <div className="flex items-center justify-center gap-3 p-5 bg-[#610f7f]/15 border border-[#610f7f]/30 rounded-2xl text-center max-w-2xl mx-auto sm:text-left text-sm sm:text-base text-white/80">
        <AlertCircle size={22} className="text-[#ff00fc] shrink-0" />
        <span>Our secure online registrations are seamlessly processed through Bookaby. Secure your spots early!</span>
      </div>
    </div>
  );
};
