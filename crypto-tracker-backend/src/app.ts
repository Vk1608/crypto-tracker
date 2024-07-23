"use strict";
const util = require('util');
global.TextEncoder = util.TextEncoder;
global.TextDecoder = util.TextDecoder;

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cron from 'node-cron';
import { fetchDataAndStore } from './utils/cron';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import PriceData, { IPriceData } from './models/price-model';

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;
const server = createServer(app);
const io = new Server(server);


// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions)
.then(() => console.log('Crypto-rate DB connected'))
.catch(err => console.log(err));

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import dataRouter from './routes/data';
import cryptos from './routes/crypto';

app.use('/price', dataRouter);
app.use('/crypto', cryptos);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


io.on('connection', (socket: Socket) => {
  console.log('New client connected');
  setInterval(async () => {
    const data: IPriceData[] = await PriceData.find().sort({ timestamp: -1 }).limit(20);
    socket.emit('stockData', data);
  }, 2000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Cron job to fetch data every minute
fetchDataAndStore().catch(err => console.error('Error fetching data:', err));
cron.schedule('*/1 * * * *', () => {
  fetchDataAndStore().catch(err => console.error('Error fetching data:', err));
});
