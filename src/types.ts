export interface Activity {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  iconName: string; // Lucide icon identifier
  color: string; // Accent color hex
  bgGradient: string; // Tailwind gradient classes
  highlights: string[];
}

export interface DayActivity {
  time: string;
  title: string;
  description: string;
  activityType: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: {
      creative: number;
      sporty: number;
      adventurous: number;
      strategic: number;
    };
  }[];
}

export interface QuizResult {
  title: string;
  description: string;
  badge: string;
  recs: string[];
  color: string;
}
