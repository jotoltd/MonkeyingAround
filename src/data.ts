import { Activity, QuizQuestion, QuizResult } from './types';

export const CampDetails = {
  name: "MONKEYING AROUND",
  tagline: "The Ultimate Multi-Activity Holiday Camps for Kids!",
  ageRange: "Children Aged 5 to 11",
  locationName: "Waterfield Primary School",
  locationAddress: "Waterfield Gardens, Crawley RH11 8RA",
  bookingUrl: "https://bookaby.me/monkeying-around-ltd",
  primaryColors: {
    lavender: "8081ff",
    magenta: "ff00fc",
    white: "ffffff",
    darkGrape: "16001e",
    deepPurple: "610f7f",
  }
};

export const ACTIVITIES: Activity[] = [
  {
    id: "multi-sports",
    title: "Multi-Sports Madness",
    description: "Get moving and grooving! From football shootout challenges and dodgeball to capture-the-flag and custom fun obstacle courses, we emphasize active play, cooperation, and good sportmanship.",
    ageRange: "5 - 11 Years",
    iconName: "FlameKindling", // Handled directly in Component
    color: "#8081ff",
    bgGradient: "from-[#8081ff]/20 to-[#610f7f]/30",
    highlights: ["Interactive Skills Zones", "Team Relays & Tournaments", "High Energy & Fair Play focus"]
  },
  {
    id: "arts-crafts",
    title: "Arts & Crafts Jungle",
    description: "Unleash your inner Picasso! We paint, sculpt, construct clay monsters, paint camp t-shirts, and make wild jungle masks. Every child gets to create and bring home their gorgeous masterpieces.",
    ageRange: "5 - 11 Years",
    iconName: "Palette",
    color: "#ff00fc",
    bgGradient: "from-[#ff00fc]/20 to-[#610f7f]/30",
    highlights: ["Clay sculpting & painting", "DIY Custom Jungle Masks", "Collages & Tie-Dye Creations"]
  },
  {
    id: "cooking",
    title: "Cooking & Baking",
    description: "Young chefs assemble! Kids learn simple, fun, hands-on, and extremely safe cooking techniques. From making delicious jungle pizzas and decorator cupcakes to rolling fruit power-balls.",
    ageRange: "5 - 11 Years",
    iconName: "ChefHat",
    color: "#8081ff",
    bgGradient: "from-[#8081ff]/20 to-pink-500/20",
    highlights: ["Dough tossing & pizza making", "Lush cupcake decorating", "Nutrition and safety facts"]
  },
  {
    id: "dress-up",
    title: "Dress-Up & Drama",
    description: "Rule the stage! A box bursting with capes, crowns, pirate hats, and animal onesies. Children build self-confidence, tell epic funny stories, and roleplay as their absolute favorite characters.",
    ageRange: "5 - 11 Years",
    iconName: "Sparkles",
    color: "#ff00fc",
    bgGradient: "from-[#ff00fc]/20 to-[#8081ff]/20",
    highlights: ["Giant costume sandbox", "Improvisational fairy tales", "Super-hero roleplay clinics"]
  },
  {
    id: "nerf-wars",
    title: "Nerf Wars Arena",
    description: "Tactical, energetic, and completely safety-first! Armed with foam blasters, safety goggles, and inflatable bunkers, we run team missions like Capture the Flag and Save the Captain.",
    ageRange: "5 - 11 Years",
    iconName: "Shield",
    color: "#8081ff",
    bgGradient: "from-[#8081ff]/20 to-[#16001e]/40",
    highlights: ["Safe nerf foam gear & goggles", "Giant inflatable team barriers", "Fun tactical teamwork play"]
  },
  {
    id: "water-fights",
    title: "Splash Zone Water Fights",
    description: "Beat the summer heat! High-intensity splash showdowns with sponge bombs, pump water blasters, and water buckets. Pure laughter and absolutely dripping wet summer joy!",
    ageRange: "5 - 11 Years",
    iconName: "Waves",
    color: "#ff00fc",
    bgGradient: "from-[#ff00fc]/20 to-[#8081ff]/30",
    highlights: ["Super-soaker blaster zones", "Reusable giant sponge bombs", "Towel-dry safety rules"]
  },
  {
    id: "talent-competition",
    title: "Monkeys Got Talent",
    description: "The ultimate spotlight moment! Whether it operates as comedy, dance, magic tricks, gymnastics, or singing, we cheer on every single star. Complete with certificates, funny medals, and thunderous applause.",
    ageRange: "5 - 11 Years",
    iconName: "Mic",
    color: "#8081ff",
    bgGradient: "from-[#8081ff]/20 to-yellow-500/20",
    highlights: ["Friendly judge feedback", "Glow-stick dance options", "Everyone receives custom awards!"]
  },
  {
    id: "lego-building",
    title: "Lego Master Builders",
    description: "If they can dream it, they can build it! Over ten thousand bricks to build giant spaceships, castles, mega marble-runs, and custom gravity racetracks to test out. Stimulates problem-solving and fun design.",
    ageRange: "5 - 11 Years",
    iconName: "Blocks",
    color: "#ff00fc",
    bgGradient: "from-[#ff00fc]/20 to-sky-500/20",
    highlights: ["Ramp-testing engineering", "Collaborative mega-city", "Speed build challenges"]
  }
];

export const DAILY_TIMETABLE = [
  { time: "08:30 - 09:15", title: "Soft Check-in & Open Exploration", desc: "Campers settle in with Lego free play, coloring, board games, and quiet social areas." },
  { time: "09:15 - 09:45", title: "Great Monkey Gathering", desc: "Daily intro, funny warm-up games, safety briefing, and setting our goofy targets of the day." },
  { time: "09:45 - 11:00", title: "Morning Activity Session: Build & Move", desc: "Alternating days: Multi-Sports Competitions or Lego Engineering Ramps." },
  { time: "11:00 - 11:20", title: "Fruity Power Refuel", desc: "Healthy fruit snack break, high-hydration water coolers, and social chats." },
  { time: "11:20 - 12:30", title: "Minds-On Studio Spot", desc: "Alternating days: Arts & Crafts masterpieces or Safe Cooking and baking delicacies." },
  { time: "12:30 - 13:30", title: "Camp Nicnic & Picnic Lunch", desc: "Re-energise with lunch and supervised, fun playground outdoor activities." },
  { time: "13:30 - 15:00", title: "Splash 'N Strike Arena", desc: "High-adrenaline outdoor adventures: Splash Zone Water Fights or Nerf Team Tactics." },
  { time: "15:00 - 15:15", title: "Power Up Refuel", desc: "An afternoon snack to keep the smiles glowing and spirits high." },
  { time: "15:15 - 16:15", title: "Dress-Up Drama & Talent Extravaganza", desc: "Costume performances, comedic showcases, or collaborative plays on the carpet." },
  { time: "16:15 - 16:30", title: "Monkey Medal Awards & Cooldown", desc: "Daily awards presentation, highlight reviews, and sweet departures!" }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "How do you prefer to navigate the giant jungle tree branches?",
    options: [
      { text: "Swinging gracefully on vines with a colorful paintbrush in hand! 🎨", points: { creative: 3, sporty: 0, adventurous: 1, strategic: 0 } },
      { text: "Sprinting at top speed, performing flips, and high-fiving everyone! ⚡", points: { creative: 0, sporty: 3, adventurous: 1, strategic: 0 } },
      { text: "Blasting water launchers and leading a friendly surprise attack! 💦", points: { creative: 0, sporty: 1, adventurous: 3, strategic: 1 } },
      { text: "Mapping out the sturdiest branches and building a secret multi-story treehouse! 🏡", points: { creative: 1, sporty: 0, adventurous: 0, strategic: 3 } }
    ]
  },
  {
    id: 2,
    question: "What is your absolute dream monkey banana recipe to construct?",
    options: [
      { text: "A glitter-sprinkled master banana cupcake with neon frosting colors! 🎂", points: { creative: 3, sporty: 0, adventurous: 1, strategic: 1 } },
      { text: "High-energy banana power slices to sprint and win a relay race! 🍌", points: { creative: 0, sporty: 3, adventurous: 1, strategic: 0 } },
      { text: "An ice-cold banana smoothie booster after defending our Nerf outpost! 🥤", points: { creative: 1, sporty: 1, adventurous: 3, strategic: 0 } },
      { text: "A carefully configured, multi-tiered banana-stacking puzzle tower! 🗼", points: { creative: 1, sporty: 0, adventurous: 0, strategic: 3 } }
    ]
  },
  {
    id: 3,
    question: "Pick your legendary morning monkey superpower:",
    options: [
      { text: "Instant fancy dress-up transformation for goofy spotlight roleplay! 🎭", points: { creative: 3, sporty: 0, adventurous: 2, strategic: 0 } },
      { text: "Fast reflex-leap to catch and dodge flying balls with absolute ease! 🏃", points: { creative: 0, sporty: 3, adventurous: 1, strategic: 1 } },
      { text: "Splashtastic stealth skills to lead water fights and conquer safety arenas! 🛡️", points: { creative: 0, sporty: 1, adventurous: 3, strategic: 1 } },
      { text: "Amazing focus to build giant Lego spaceships or complete master craft layouts! 🧱", points: { creative: 1, sporty: 0, adventurous: 0, strategic: 3 } }
    ]
  }
];

export const QUIZ_RESULTS: QuizResult[] = [
  {
    title: "Creative Tamarin (The Artistic Dreamer)",
    description: "You see the entire holiday camp as a vibrant blank canvas! You love getting messy with clay modeling, designing master chef cupcakes, wearing playful costumes, and shining in the theatrical spotlight. Every day is a masterpiece for you!",
    badge: "🎨 Vivid Creator",
    color: "#ff00fc",
    recs: ["Arts & Crafts Jungle", "Dress-up & Drama", "Cooking & Baking", "Monkeys Got Talent"],
  },
  {
    title: "Cheeky Chimpanzee (The Energetic Playmaker)",
    description: "You have got pure lightning running through your feet! You love racing, jumping, climbing obstacles, and high-fiving your friends. Sports tournaments, dodgeball sprints, and non-stop active playground fun are where you belong!",
    badge: "⚡ High-Vibe Chaser",
    color: "#8081ff",
    recs: ["Multi-Sports Madness", "Splash Zone Water Fights", "Nerf Wars Arena"],
  },
  {
    title: "Bold Baboon (The Brave Captain)",
    description: "You are adventurous, courageous, and always ready for camp action! Armed with tactical focus, you excel at commanding safe foam dart outposts, making massive splash waves in water showdowns, and directing group activities.",
    badge: "🛡️ Brave Leader",
    color: "#ff00fc",
    recs: ["Nerf Wars Arena", "Splash Zone Water Fights", "Multi-Sports Madness"],
  },
  {
    title: "Wise Orangutan (The Master Builder)",
    description: "You are an amazing thinker, builder, and riddle solver! Give you a massive tub of Lego blocks, baking ingredients, or a stack of cardboard boxes, and you can map out and construct whole kingdoms, racetracks, or rocket ships.",
    badge: "🧱 Lego Architect",
    color: "#8081ff",
    recs: ["Lego Master Builders", "Cooking & Baking", "Arts & Crafts Jungle"],
  }
];
