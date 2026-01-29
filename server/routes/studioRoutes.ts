// server/routes/studioRoutes.ts
import express from 'express';
import StudioWork from '../models/StudioWork';

const router = express.Router();

// GET /api/special-studio
router.get('/', async (req, res) => {
  try {
    const works = await StudioWork.findAll();
    res.json(works);
  } catch (error) {
    console.error('Error fetching studio works:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
