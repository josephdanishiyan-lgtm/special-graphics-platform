import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db';

// Routes
import contestRoutes from './routes/contestRoutes';
import studioRoutes from './routes/studioRoutes';
import inspirationRoutes from './routes/inspiration'; // This loads routes/inspiration.ts

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Contest Page Routes
app.use('/api/contests', contestRoutes);

// 2. Special Studio Page Routes
app.use('/api/special-studio', studioRoutes);

// 3. Inspiration Page Routes
app.use('/api/inspiration', inspirationRoutes);

// Basic Health Check
app.get('/', (req, res) => {
  res.send('Special Graphics API is Running ✅');
});

// Start Server
const startServer = async () => {
  try {
    // Connect to Database
    await sequelize.authenticate();
    console.log('✅ Database connected.');
    
    // Sync models (Safe mode: doesn't delete data)
    await sequelize.sync(); 
    console.log('✅ Tables synced.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// Only run the server if we are NOT in production (Vercel handles this automatically)
if (process.env.NODE_ENV !== 'production') {
    startServer();
}

export default app;
