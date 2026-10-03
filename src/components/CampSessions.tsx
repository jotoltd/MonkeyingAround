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
    id: 'mon19-oct-extended',
    type: 'Extended',
    date: 'Mon 19th Oct 2026',
    dayName: 'Monday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/06f1dee2-e73c-4237-923b-e73db4bff427'
  },
  {
    id: 'mon19-oct-full',
    type: 'Full Day',
    date: 'Mon 19th Oct 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/d3c04cb7-5916-4b2d-97e7-59536379c820'
  },
  {
    id: 'tue20-oct-extended',
    type: 'Extended',
    date: 'Tue 20th Oct 2026',
    dayName: 'Tuesday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/de21a744-aead-4bcf-987c-f4993c3471c9'
  },
  {
    id: 'tue20-oct-full',
    type: 'Full Day',
    date: 'Tue 20th Oct 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/8a8b4669-f485-415f-a4bf-2c1dfbcf9fe2'
  },
  {
    id: 'wed21-oct-extended',
    type: 'Extended',
    date: 'Wed 21st Oct 2026',
    dayName: 'Wednesday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/3b1d934f-b4d4-48c2-8efe-afdf9218b5e2'
  },
  {
    id: 'wed21-oct-full',
    type: 'Full Day',
    date: 'Wed 21st Oct 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/9ab5b2c6-d6e9-431f-b8f1-5f53e953332d'
  },
  {
    id: 'thu22-oct-extended',
    type: 'Extended',
    date: 'Thu 22nd Oct 2026',
    dayName: 'Thursday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/b8f2850c-070d-490a-bfcf-7f1dda296f18'
  },
  {
    id: 'thu22-oct-full',
    type: 'Full Day',
    date: 'Thu 22nd Oct 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/1d4f5d65-c834-4243-855a-7228739fb63f'
  },
  {
    id: 'mon26-oct-extended',
    type: 'Extended',
    date: 'Mon 26th Oct 2026',
    dayName: 'Monday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/9dedfd5d-f7a3-4425-bec4-9a4fa40f53cf'
  },
  {
    id: 'mon26-oct-full',
    type: 'Full Day',
    date: 'Mon 26th Oct 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/04d03869-11e8-43fb-b2fd-7d01e943e60b'
  },
  {
    id: 'tue27-oct-extended',
    type: 'Extended',
    date: 'Tue 27th Oct 2026',
    dayName: 'Tuesday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/1d3530f4-c800-491b-92f5-4ac3de0a827b'
  },
  {
    id: 'tue27-oct-full',
    type: 'Full Day',
    date: 'Tue 27th Oct 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/dd16ece6-afc1-4892-8d62-f0e22184a971'
  },
  {
    id: 'wed28-oct-extended',
    type: 'Extended',
    date: 'Wed 28th Oct 2026',
    dayName: 'Wednesday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/8609102e-6e7c-4319-8414-7afab9f6517e'
  },
  {
    id: 'wed28-oct-full',
    type: 'Full Day',
    date: 'Wed 28th Oct 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/33156ffd-7ea4-4682-ba8c-bc03e58ec1cd'
  },
  {
    id: 'thu29-oct-extended',
    type: 'Extended',
    date: 'Thu 29th Oct 2026',
    dayName: 'Thursday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/c2bc747b-a2dd-4f1f-90da-ffe1111ca00d'
  },
  {
    id: 'thu29-oct-full',
    type: 'Full Day',
    date: 'Thu 29th Oct 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/6f941076-d126-4fc8-9620-e097acad5965'
  }
];

export const CampSessions: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<'All' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('All');

  const filteredSessions = SESSION_DATA.filter(session => {
    if (selectedDay === 'All') return true;
    return session.dayName === selectedDay;
  });

  return (
    <div className="w-full">
      {/* Day Selector Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {(['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-6 py-3.5 rounded-2xl text-sm sm:text-base md:text-lg font-display font-extrabold transition-all border cursor-pointer ${
              selectedDay === day
                ? 'bg-[#ff00fc] text-white border-[#ff00fc] shadow-[0_4px_18px_rgba(255,0,252,0.4)] scale-[1.03]'
                : 'bg-[#16001e]/80 text-white/75 border-[#610f7f]/40 hover:text-white hover:border-[#ff00fc]/40'
            }`}
          >
            {day === 'All' ? '📅 Show All Days' : `🐒 ${day}`}
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
