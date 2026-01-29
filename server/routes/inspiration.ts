// server/routes/inspiration.ts
import { Router } from 'express';
import InspirationDesign from '../models/InspirationDesign'; // Updated Import

const router = Router();

// GET /api/inspiration
router.get('/', async (req, res) => {
  try {
    const designs = await InspirationDesign.findAll({
      order: [['createdAt', 'DESC']] 
    });
    res.json(designs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch inspiration designs' });
  }
});

// POST /api/inspiration/:id/like
router.post('/:id/like', async (req, res) => {
  try {
    const designId = req.params.id;
    const design = await InspirationDesign.findByPk(designId); // Updated Model

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    await design.increment('likeCount');
    
    res.json({ success: true, message: 'Like added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like design' });
  }
});

export default router;
