import { Router } from 'express';
import Design from '../models/Design'; 

const router = Router();

// GET /api/inspiration
// Fetch all designs sorted by newest
router.get('/', async (req, res) => {
  try {
    const designs = await Design.findAll({
      order: [['createdAt', 'DESC']] 
    });
    res.json(designs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch designs' });
  }
});

// POST /api/inspiration/:id/like
// Increment the like count for a specific design
router.post('/:id/like', async (req, res) => {
  try {
    const designId = req.params.id;
    const design = await Design.findByPk(designId);

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    // Safely add 1 to the like count in the database
    await design.increment('likeCount');
    
    res.json({ success: true, message: 'Like added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to like design' });
  }
});

export default router;
