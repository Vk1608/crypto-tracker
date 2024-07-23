import express, { Router, Request, Response } from 'express';
import CryptoList, { ICryptoList } from '../models/crypto-list';

const router: Router = express.Router();

// Route to fetch available cryptocurrencies
router.get('/cryptos', async (req: Request, res: Response) => {
  try {
    const cryptos: ICryptoList[] = await CryptoList.find().select('cryptoName');
    const cryptoNames: string[] = cryptos.map(crypto => crypto.cryptoName);
    res.json(cryptoNames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
