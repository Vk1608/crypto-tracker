import express, { Router, Request, Response } from 'express';
import PriceData, { IPriceData } from '../models/price-model';

const router: Router = express.Router();

// Example route to fetch all data
router.get('/data', async (req: Request, res: Response) => {
  try {
    const data: IPriceData[] = await PriceData.find().sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
