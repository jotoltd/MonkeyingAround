import React, { useState } from 'react';
import { MapPin, Clock, Calendar, Compass, ShieldCheck } from 'lucide-react';

interface MapArea {
  id: string;
  name: string;
  icon: string;
  description: string;
  safetyTip: string;
}

const WATERFIELD_AREAS: MapArea[] = [
  {
    id: 'reception',
    name: 'Secure Intake Reception',
    icon: '🏫',
    description: 'Our centralized check-in & checkout gates. Equipped with strict physical register logs where parents match electronic barcodes to secure handovers.',
    safetyTip: 'Staffed at all times. Standard dropoff 08:30 - 09:15, pickup 16:15 - 16:30 (subject to final confirmation).'
  },
  {
    id: 'sports_field',
    name: 'Jungle Field & Rec',
    icon: '⚽',
    description: 'Safe, fully-hedged grassy green grounds of Waterfield School. Used for capture-the-flag, dodgeball, multi-sports, and tactical Nerf fortress play.',
    safetyTip: 'Delineated boundaries. Sunscreen checks and water bottles refilled before stepping out.'
  },
  {
    id: 'sports_hall',
    name: 'Indoor Sports Hall & Gym',
    icon: '🏀',
    description: 'Rain or shine, our giant high-ceiling gymnasium ensures games of soccer, relay sprints, gymnastics, and obstacle courses never halt.',
    safetyTip: 'Polished rubber flooring prevents slips. Cushioned safety mats placed around physical challenges.'
  },
  {
    id: 'art_hub',
    name: 'Creative Art & Lego Studio',
    icon: '🎨',
    description: 'Where our craft, dress-up, and mammoth Lego building cities take life. Flooded with natural daylight and structured tables for high focus.',
    safetyTip: 'Non-toxic washable craft paints. Safe rounded plastic scissors under supervisor direct eyes.'
  },
  {
    id: 'bake_lab',
    name: 'Safe Cooking & Pastry Lab',
    icon: '🧁',
    description: 'Equipped with cold-prep kitchen modules where raw baking ingredients, fruit mixtures, and pizza toppings are created and safely rolled.',
    safetyTip: 'Strict nut-free rules. No heat elements or sharp knives ever handled by children.'
  },
  {
    id: 'splash_deck',
    name: 'Secret Splash Water Field',
    icon: '💦',
    description: 'Specifically fenced outdoor courtyard activated solely for Wednesday Splash Zone battles. Safe spongy floors with zero hard obstacles.',
    safetyTip: 'Supervised changing stalls. Closed running trainers required to bypass any wet grass slides.'
  }
];

export const LocationSection: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<MapArea>(WATERFIELD_AREAS[0]);

  return (
    <div id="location-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
      
      {/* Venue Information card */}
      <div className="lg:col-span-5 border-3 border-[#610f7f] bg-[#16001e]/80 text-white rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_-5px_rgba(255,0,252,0.15)] flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#8081ff] block mb-2">
            CONVENIENT CRAWLEY BASE
          </span>
          <h3 className="text-3xl font-display font-medium text-white mb-4">
            Our Summer Location 🌴
          </h3>
          
          <p className="text-sm font-sans text-white/80 leading-relaxed mb-6 font-medium">
            We are fully based at <strong>Waterfield Primary School</strong> for our Summer camps. This excellent school venue features secure physical perimeters, outstanding sports infrastructure, and modern indoor halls designed to keep kids safe in any elements.
          </p>

          {/* Quick detail items */}
          <div className="space-y-4">
            <div className="flex gap-3 items-start">
              <div className="p-2.5 rounded-xl bg-[#610f7f]/30 text-[#8081ff] border-2 border-white/10">
                <MapPin size={18} />
              </div>
              <div className="font-sans">
                <p className="text-xs font-mono font-bold text-[#8081ff] uppercase tracking-wider">
                  Camp Address
                </p>
                <p className="text-sm text-white font-semibold mt-0.5">
                  Waterfield Primary School
                </p>
                <p className="text-xs text-white/70">
                  Waterfield Gardens, Crawley RH11 8RA
                </p>
                <a 
                  href="https://maps.google.com/?q=Waterfield+Gardens,+Crawley+RH11+8RA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#ff00fc] hover:underline mt-1 inline-block"
                >
                  📍 Open driving directions in Google Maps
                </a>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2.5 rounded-xl bg-green-950/40 text-green-400 border-2 border-white/10">
                <Clock size={18} />
              </div>
              <div className="font-sans">
                <p className="text-xs font-mono font-bold text-green-400 uppercase tracking-wider">
                  Times & Handovers
                </p>
                <p className="text-sm text-white font-semibold mt-0.5 flex flex-wrap items-center gap-1.5">
                  08:30 AM – 16:30 PM <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-[#610f7f] text-[#ff00fc] rounded font-bold border border-[#ff00fc]/30">TBC</span>
                </p>
                <p className="text-xs text-white/70">
                  Late pickup options and secure early drops to be confirmed.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2.5 rounded-xl bg-orange-950/40 text-orange-400 border-2 border-white/10">
                <Calendar size={18} />
              </div>
              <div className="font-sans">
                <p className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                  Upcoming Camps
                </p>
                <p className="text-sm text-white font-semibold mt-0.5">
                  Summer Holiday Bookings Active!
                </p>
                <p className="text-xs text-white/70 leading-tight">
                  More school venues to be announced in Crawley and surrounding regions soon!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Local authority approval badge */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff00fc]/15 flex items-center justify-center text-[#ff00fc]">
            <ShieldCheck size={20} className="text-[#ff00fc]" />
          </div>
          <p className="text-[11px] font-sans text-white/80 leading-normal">
            <strong>Ofsted Standard Safeguarding:</strong> Waterfield Primary is a completely enclosed, modern school campus. All entrance gates locked during core camp operations.
          </p>
        </div>
      </div>

      {/* Whimsical School Site Map */}
      <div className="lg:col-span-7 border-3 border-[#610f7f] bg-gradient-to-b from-[#16001e] to-[#610f7f]/60 text-white rounded-3xl p-6 md:p-8 shadow-[0_4px_25px_-5px_rgba(255,0,252,0.15)] relative flex flex-col justify-between">
        <div className="mb-4">
          <span className="text-[9px] font-mono tracking-widest text-[#ff00fc] uppercase block mb-1">
            EXPLORE THE CAMPGROUNDS
          </span>
          <h4 className="text-xl font-display font-medium text-white flex items-center gap-2">
            <Compass size={20} className="text-[#8081ff]" /> Interactive School Camp Map
          </h4>
          <p className="text-xs font-sans text-white/85 mt-1">
            Click on any camp zone below to explore where your children spend their days and review our specific environment-focused safety procedures.
          </p>
        </div>

        {/* Visual Map Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
          {WATERFIELD_AREAS.map(area => {
            const isSelected = selectedArea.id === area.id;
            return (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area)}
                className={`p-3 rounded-2xl border-2 transition-all text-left focus:outline-none flex flex-col justify-between relative overflow-hidden group h-24 ${
                  isSelected
                    ? 'bg-[#ff00fc] border-white shadow-[0_0_15px_rgba(255,0,252,0.45)] text-white'
                    : 'bg-[#16001e]/70 border-[#610f7f] hover:border-[#8081ff]/50 text-white/90'
                }`}
                id={`map-btn-area-${area.id}`}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform origin-left">{area.icon}</span>
                <div>
                  <p className="text-xs font-display font-bold leading-tight">
                    {area.name}
                  </p>
                </div>
                {isSelected && (
                  <div className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Zone Details Card */}
        <div className="bg-[#16001e]/90 text-white rounded-2xl p-4 md:p-5 border-2 border-[#610f7f] shadow-lg">
          <div className="flex justify-between items-start gap-2 mb-2">
            <div>
              <span className="text-[10px] font-mono text-[#8081ff] uppercase font-bold tracking-wider leading-none">
                Active Zone Profile
              </span>
              <p className="text-base font-display font-bold text-white mt-0.5 flex items-center gap-1.5">
                <span>{selectedArea.icon}</span> {selectedArea.name}
              </p>
            </div>
            <span className="text-xs py-0.5 px-2 bg-[#ff00fc] text-white rounded-md font-mono font-bold tracking-tight uppercase">
              Secure Zone
            </span>
          </div>

          <p className="text-xs font-sans text-white/80 leading-relaxed mb-3">
            {selectedArea.description}
          </p>

          <div className="pt-2.5 border-t border-white/10 flex items-start gap-2 text-[11px] font-sans text-white">
            <span className="text-sm select-none">🛡️</span>
            <div>
              <span className="font-bold text-[#8081ff] uppercase text-[9px] tracking-wider block font-mono">
                Staff Supervision Protocols
              </span>
              <p className="text-white/90 mt-0.5">
                {selectedArea.safetyTip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
