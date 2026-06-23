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
    time: '8am - 5:30pm',
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
    time: '8am - 5:30pm',
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
  },
  {
    id: 'wed-extended',
    type: 'Extended',
    date: 'Wed 29th Jul 2026',
    dayName: 'Wednesday',
    time: '8am - 5:30pm',
    price: '£37.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/7e6bc62a-9be0-42c6-a9d5-622e1cdc22cb'
  },
  {
    id: 'wed-full',
    type: 'Full Day',
    date: 'Wed 29th Jul 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/72a4d1b5-cd7f-4584-b42a-6326127dcd2d'
  },
  {
    id: 'thu-extended',
    type: 'Extended',
    date: 'Thu 30th Jul 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/4196c3b5-e08a-4089-95ed-2c21917d7164'
  },
  {
    id: 'thu-full',
    type: 'Full Day',
    date: 'Thu 30th Jul 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/8be7b252-010d-491b-9ef6-82dfa2b26ae5'
  },
  {
    id: 'fri-extended',
    type: 'Extended',
    date: 'Fri 31st Jul 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/58556769-718a-4bd7-a7a1-6518d6a53e3d'
  },
  {
    id: 'fri-full',
    type: 'Full Day',
    date: 'Fri 31st Jul 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/959883cf-8410-42fd-a208-cb4d7ca855a6'
  },
  {
    id: 'mon3-aug-extended',
    type: 'Extended',
    date: 'Mon 3rd Aug 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/bf7b6b2b-a52a-4d26-80f7-ab9a59c5e539'
  },
  {
    id: 'mon3-aug-full',
    type: 'Full Day',
    date: 'Mon 3rd Aug 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/ef65f038-7295-477e-af09-db0c294f081e'
  },
  {
    id: 'tue4-aug-extended',
    type: 'Extended',
    date: 'Tue 4th Aug 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/780ad0aa-7de2-432e-b46d-6a530467b61f'
  },
  {
    id: 'tue4-aug-full',
    type: 'Full Day',
    date: 'Tue 4th Aug 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/6f2772b9-aa0c-4ce8-8a46-dc132e101235'
  },
  {
    id: 'wed5-aug-extended',
    type: 'Extended',
    date: 'Wed 5th Aug 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/f1b1de91-bd52-4b89-9f95-2e7197826a12'
  },
  {
    id: 'wed5-aug-full',
    type: 'Full Day',
    date: 'Wed 5th Aug 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/d267eb99-028b-4948-8a30-787ef106813b'
  },
  {
    id: 'thu6-aug-extended',
    type: 'Extended',
    date: 'Thu 6th Aug 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/d7920393-c5ff-4d8b-bec8-2cd079019edf'
  },
  {
    id: 'thu6-aug-full',
    type: 'Full Day',
    date: 'Thu 6th Aug 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/63babd56-e9d4-4218-8afb-b56fb96d4202'
  },
  {
    id: 'fri7-aug-extended',
    type: 'Extended',
    date: 'Fri 7th Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/67ed034e-b171-420a-9cf8-62bd992f81a6'
  },
  {
    id: 'fri7-aug-full',
    type: 'Full Day',
    date: 'Fri 7th Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/def05ea5-8f38-45f6-935f-835682c0bad4'
  },
  {
    id: 'mon10-aug-extended',
    type: 'Extended',
    date: 'Mon 10th Aug 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/9a75637d-ead1-469f-a4fa-ce332e933c8b'
  },
  {
    id: 'mon10-aug-full',
    type: 'Full Day',
    date: 'Mon 10th Aug 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/1949dd07-2aea-4ea6-9a6a-942b721fb0ea'
  },
  {
    id: 'tue11-aug-extended',
    type: 'Extended',
    date: 'Tue 11th Aug 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/b16dd7fc-e195-467c-b422-b830ae9cc19b'
  },
  {
    id: 'tue11-aug-full',
    type: 'Full Day',
    date: 'Tue 11th Aug 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/f9fc625f-93bc-4fa7-b06b-84eb5c440699'
  },
  {
    id: 'wed12-aug-extended',
    type: 'Extended',
    date: 'Wed 12th Aug 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/df81cfad-88af-4a02-b310-ebf22246ff1a'
  },
  {
    id: 'wed12-aug-full',
    type: 'Full Day',
    date: 'Wed 12th Aug 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/d7927c31-4699-4e6a-9c3b-af764f9b2abe'
  },
  {
    id: 'thu13-aug-extended',
    type: 'Extended',
    date: 'Thu 13th Aug 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/e9618e60-7bcc-4668-b730-7f180160970a'
  },
  {
    id: 'thu13-aug-full',
    type: 'Full Day',
    date: 'Thu 13th Aug 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/662ef38f-5f4d-47ef-97d0-4d5f8deecd10'
  },
  {
    id: 'fri14-aug-extended',
    type: 'Extended',
    date: 'Fri 14th Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/4877879a-30f6-4d71-b33f-e2d8d8dae586'
  },
  {
    id: 'fri14-aug-full',
    type: 'Full Day',
    date: 'Fri 14th Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/6b6b82c3-3363-4555-9e6c-a958647744a2'
  },
  {
    id: 'fri21-aug-extended',
    type: 'Extended',
    date: 'Fri 21st Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/00c5527d-a68b-4843-ba35-3f06876f5d5c'
  },
  {
    id: 'fri21-aug-full',
    type: 'Full Day',
    date: 'Fri 21st Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/54c9a2f3-7ac4-48e2-b2fb-952a13e9c393'
  },
  {
    id: 'mon24-aug-extended',
    type: 'Extended',
    date: 'Mon 24th Aug 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/f40baa36-08f8-4335-a7cb-629162d85c51'
  },
  {
    id: 'mon24-aug-full',
    type: 'Full Day',
    date: 'Mon 24th Aug 2026',
    dayName: 'Monday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/5ee40045-869e-4572-8a14-232721921f51'
  },
  {
    id: 'tue25-aug-extended',
    type: 'Extended',
    date: 'Tue 25th Aug 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/469ebaa1-04fe-46c9-8ec1-5c14ef34618a'
  },
  {
    id: 'tue25-aug-full',
    type: 'Full Day',
    date: 'Tue 25th Aug 2026',
    dayName: 'Tuesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/fa5775e5-28a5-440c-93e8-6b06b9bbf751'
  },
  {
    id: 'wed26-aug-extended',
    type: 'Extended',
    date: 'Wed 26th Aug 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/09ea614a-24b1-4c4d-8c9c-9459871df924'
  },
  {
    id: 'wed26-aug-full',
    type: 'Full Day',
    date: 'Wed 26th Aug 2026',
    dayName: 'Wednesday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/eb9bd757-e550-4207-b210-10f5268adaa9'
  },
  {
    id: 'thu27-aug-extended',
    type: 'Extended',
    date: 'Thu 27th Aug 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/a5b8035b-e61b-4aa8-9641-9ce82f26ecaf'
  },
  {
    id: 'thu27-aug-full',
    type: 'Full Day',
    date: 'Thu 27th Aug 2026',
    dayName: 'Thursday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/907a66ed-e97b-4583-845f-9077e791d6bf'
  },
  {
    id: 'fri28-aug-extended',
    type: 'Extended',
    date: 'Fri 28th Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/6eb0a7db-7a10-4391-b692-61154ec0651b'
  },
  {
    id: 'fri28-aug-full',
    type: 'Full Day',
    date: 'Fri 28th Aug 2026',
    dayName: 'Friday',
    time: '9am - 4pm',
    price: '£29.50',
    url: 'https://bookaby.me/monkeying-around-ltd/whats-on/session/a1e7e147-2b23-47bd-a65a-955f32bc2999'
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
