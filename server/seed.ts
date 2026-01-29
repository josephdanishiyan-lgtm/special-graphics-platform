// server/seed.ts
import sequelize from './db';
import Contest from './models/Contest';
import StudioWork from './models/StudioWork';
import InspirationDesign from './models/InspirationDesign'; // Updated Import
import dotenv from 'dotenv';

dotenv.config();

const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

// 1. Data for "Find a Contest" Page
const sampleContests = [
  {
    title: "Retro Volleyball Club Shirt",
    description: "We need a cool, retro-style t-shirt design for our local volleyball club 'Rush'. Think 80s vibes.",
    author: "TIM98",
    category: "Clothing & merchandise",
    industry: "Sports",
    price: 175,
    isGuaranteed: true,
    isBlind: false,
    status: 'Open',
    level: 'Gold',
    deadline: daysFromNow(3)
  },
  {
    title: "Nostalgic Puzzle Book Cover for Seniors",
    description: "Primary audience: American seniors ages 65+ and Baby Boomers. Needs to feel warm and nostalgic.",
    author: "ADAM9808",
    category: "Book & magazine",
    industry: "Entertainment & The Arts",
    price: 200,
    isGuaranteed: true,
    isBlind: false,
    status: 'Open',
    level: 'Base',
    deadline: daysFromNow(4)
  },
  {
    title: "Slice of Life Country Love Body Cream Rendering",
    description: "Hydrating body cream. We need a 3D rendering of the bottle for our Amazon listing.",
    author: "SARAHDESIGNS",
    category: "Packaging & label",
    industry: "Cosmetics & Beauty",
    price: 350,
    isGuaranteed: false,
    isBlind: true,
    status: 'Open',
    level: 'Platinum',
    deadline: daysFromNow(1)
  },
  {
    title: "Modern Tech Startup Logo",
    description: "Looking for a clean, minimalist logo for our AI startup.",
    author: "TECH_GURU",
    category: "Logo & identity",
    industry: "Computer",
    price: 450,
    isGuaranteed: true,
    isBlind: true,
    status: 'Finished',
    level: 'Gold',
    deadline: daysFromNow(-2)
  }
];

// 2. Data for "Special Studio" Page
const sampleStudioWorks = [
  { title: 'Pink Brand', color: 'bg-pink-600', category: 'Branding', image: '/images/studio/work-pink-brand.jpg' },
  { title: 'Orange Box', color: 'bg-orange-500', category: 'Packaging', image: '/images/studio/work-orange-box.jpg' },
  { title: 'Beige Tag', color: 'bg-[#D2B48C]', category: 'Label Design', image: '/images/studio/work-beige-tag.jpg' },
  { title: 'Green Pattern', color: 'bg-emerald-800', category: 'Pattern', image: '/images/studio/work-green-pattern.jpg' },
  { title: 'Red Festive', color: 'bg-red-600', category: 'Holiday', image: '/images/studio/work-red-festive.jpg' },
  { title: 'Dark Neon', color: 'bg-slate-900', category: 'Digital', image: '/images/studio/work-dark-neon.jpg' },
  { title: 'Blue Abstract', color: 'bg-blue-900', category: 'Abstract', image: '/images/studio/work-blue-abstract.jpg' },
  { title: 'Night Lights', color: 'bg-black', category: 'Photography', image: '/images/studio/work-night-lights.jpg' }
];

// 3. Data for "Inspiration" Page (Using InspirationDesign Model)
const sampleInspirationDesigns = [
  { 
    title: "Minimal Coffee Brand", 
    designerName: "AlexDesign", 
    likeCount: 120, 
    toolsUsed: "Illustrator", 
    imageUrl: "/images/inspiration/inspiration-1.jpg", 
    tags: ["Branding", "Logo"], 
    description: "A clean and minimal logo concept for a modern coffee shop.",
    status: "active"
  },
  { 
    title: "Neon City Poster", 
    designerName: "SarahArts", 
    likeCount: 85, 
    toolsUsed: "Photoshop", 
    imageUrl: "/images/inspiration/inspiration-2.jpg", 
    tags: ["Poster", "Art"], 
    description: "Cyberpunk inspired poster design with neon colors.",
    status: "active"
  },
  { 
    title: "Eco Friendly Pack", 
    designerName: "GreenStudio", 
    likeCount: 200, 
    toolsUsed: "Blender", 
    imageUrl: "/images/inspiration/inspiration-3.jpg", 
    tags: ["Packaging", "3D"], 
    description: "Sustainable packaging design 3D render.",
    status: "active"
  },
  { 
    title: "Tech App UI", 
    designerName: "PixelMaster", 
    likeCount: 45, 
    toolsUsed: "Figma", 
    imageUrl: "/images/inspiration/inspiration-4.jpg", 
    tags: ["UI/UX", "Web"], 
    description: "Modern dashboard interface for a SaaS platform.",
    status: "active"
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    await sequelize.sync({ force: true });
    console.log('✅ Tables synced (Old data cleared).');
    
    // Seed Contests
    await Contest.bulkCreate(sampleContests);
    console.log('✅ Contests seeded.');

    // Seed Studio Works
    await StudioWork.bulkCreate(sampleStudioWorks);
    console.log('✅ Studio Works seeded.');
    
    // Seed Inspiration Designs (Updated)
    await InspirationDesign.bulkCreate(sampleInspirationDesigns);
    console.log('✅ Inspiration Designs seeded.');

    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
