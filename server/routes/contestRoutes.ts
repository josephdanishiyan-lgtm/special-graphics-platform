// server/routes/contestRoutes.ts
import express from 'express';
import { Op } from 'sequelize';
import Contest from '../models/Contest';

const router = express.Router();

// GET /api/contests
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      industry, 
      keyword, 
      status, 
      minPrice, 
      maxPrice, 
      level, 
      type, // 'Blind' or 'Guaranteed'
      sort 
    } = req.query;

    // 1. Build the "Where" clause (The Filters)
    const whereClause: any = {};

    // Category Filter
    if (category && category !== 'All categories') {
      whereClause.category = category;
    }

    // Industry Filter
    if (industry && industry !== 'All industries') {
      whereClause.industry = industry;
    }

    // Status Filter
    if (status) {
      whereClause.status = status;
    }

    // Level Filter (handling multiple levels if sent as array, or single)
    if (level) {
      // If passing multiple levels (e.g. ?level=Gold&level=Platinum), express makes it an array
      // If single, it's a string. Sequelize handles both with Op.in usually, 
      // but simple equality works for single. Let's assume single for now or match array:
      whereClause.level = Array.isArray(level) ? { [Op.in]: level } : level;
    }

    // Keyword Search (Title OR Description)
    if (keyword) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${keyword}%` } }, // iLike = case insensitive (Postgres)
        { description: { [Op.iLike]: `%${keyword}%` } }
      ];
    }

    // Price Filter
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price[Op.gte] = Number(minPrice);
      if (maxPrice) whereClause.price[Op.lte] = Number(maxPrice);
    }

    // Type Filters (Blind / Guaranteed)
    if (type) {
      const types = Array.isArray(type) ? type : [type];
      if (types.includes('Blind')) whereClause.isBlind = true;
      if (types.includes('Guaranteed')) whereClause.isGuaranteed = true;
    }

    // 2. Build Sorting Order
    let order: any = [['createdAt', 'DESC']]; // Default: Newest first

    if (sort === 'oldest') order = [['createdAt', 'ASC']];
    if (sort === 'price_desc') order = [['price', 'DESC']];
    if (sort === 'price_asc') order = [['price', 'ASC']];

    // 3. Query Database
    const contests = await Contest.findAll({
      where: whereClause,
      order: order,
    });

    res.json(contests);

  } catch (error) {
    console.error('Error fetching contests:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
