import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db';
import contestRoutes from './routes/contestRoutes';

import './models/Design'; 
// import './models/Contest';

import inspirationRoutes from './routes/inspiration';
// import contestRoutes from './routes/contest;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Use Routes
app.use('/api/inspiration', inspirationRoutes);
// app.use('/api/contest', contestRoutes);
app.use('/api/contests', contestRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('PostgreSQL Backend is running!');
});

// Function to Start Server and Database
const startServer = async () => {
  try {
    // 1. Check Database Connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully (PostgreSQL)!');

    // 2. Sync Models
    // Using { alter: true } updates columns without deleting data
    await sequelize.sync({ alter: true });
    console.log('✅ Tables created/updated!');
    
    // 3. Start the Server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

startServer();
