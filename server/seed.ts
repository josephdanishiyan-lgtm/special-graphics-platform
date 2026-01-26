// server/seed.ts
import sequelize from './db';
import Contest from './models/Contest';
import dotenv from 'dotenv';

dotenv.config();

// Helper to get a future date
const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

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
    deadline: daysFromNow(3) // Ends in 3 days
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
    deadline: daysFromNow(-2) // Ended 2 days ago
  }
];

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // Force: true drops the table if it exists and creates a new one
    await sequelize.sync({ force: true });
    console.log('✅ Tables synced (Old data cleared).');
    
    await Contest.bulkCreate(sampleContests);
    
    console.log('✅ Success! 4 Contests added to the database.');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
