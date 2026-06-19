import React from 'react';
import { Activity } from '../types';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Palette, 
  ChefHat, 
  Crown, 
  Target, 
  Droplets, 
  Mic, 
  Puzzle, 
  Sparkles
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

// Map string name to reliable Lucide icon component
const getIcon = (name: string, size: number = 36) => {
  switch (name) {
    case 'FlameKindling': return <Trophy size={size} className="text-brand-lavender" />;
    case 'Palette': return <Palette size={size} className="text-brand-magenta" />;
    case 'ChefHat': return <ChefHat size={size} className="text-brand-lavender" />;
    case 'Sparkles': return <Crown size={size} className="text-brand-magenta" />;
    case 'Shield': return <Target size={size} className="text-brand-lavender" />;
    case 'Waves': return <Droplets size={size} className="text-brand-magenta" />;
    case 'Mic': return <Mic size={size} className="text-brand-lavender" />;
    case 'Blocks': return <Puzzle size={size} className="text-brand-magenta" />;
    default: return <Sparkles size={size} />;
  }
};

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="border-3 border-[#610f7f] bg-[#16001e]/80 hover:bg-[#610f7f]/40 rounded-3xl p-8 shadow-[0_4px_25px_-5px_rgba(255,0,252,0.15)] relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_30px_rgba(128,129,255,0.25)]"
      id={`activity-card-${activity.id}`}
    >
      {/* Dynamic top corner color accent badge */}
      <div 
        className="absolute top-0 right-0 w-28 h-28 rounded-full -mr-8 -mt-8 opacity-25 blur-xl transition-transform group-hover:scale-125"
        style={{ backgroundColor: activity.color }}
      />
      
      <div>
        {/* Header section with icon and title */}
        <div className="flex items-center mb-5">
          <div 
            className="w-18 h-18 rounded-2xl border-2 border-[#fff0fc]/30 flex items-center justify-center bg-brand-grape shadow-md group-hover:rotate-6 transition-transform"
          >
            {getIcon(activity.iconName)}
          </div>
        </div>

        <h3 className="text-3xl font-display font-extrabold text-white tracking-tight group-hover:text-[#ff00fc] transition-colors mb-2">
          {activity.title}
        </h3>

        <p className="text-base sm:text-lg font-sans text-white/90 leading-relaxed font-medium">
          {activity.description}
        </p>
      </div>
    </motion.div>
  );
};
