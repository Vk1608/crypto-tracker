import axios, { AxiosRequestConfig } from 'axios';
import PriceData from '../models/price-model';

export async function fetchDataAndStore(): Promise<void> {
  try {
    const key = process.env.CRYPTO_KEY as string;
    const requestData = {
      codes: ["ETH", "GRIN", "BTC", ],
      currency: "USD",
      sort: "rank",
      order: "ascending",
      offset: 0,
      limit: 0,
      meta: false
    };
    const axiosConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key
      }
    };
    const response = await axios.post('https://api.livecoinwatch.com/coins/map', requestData, axiosConfig);
    
    const { name, code, symbol, rate, color } = response.data;
    const priceData = response.data;
    const timestamp = new Date();
    const priceDataDocs = priceData.map(({ name, code, symbol, rate, color }: any) => {
      return new PriceData({
        name,
        code,
        symbol,
        rate,
        timestamp,
        color,
      });
    });
    console.log(response.data);
    await PriceData.insertMany(priceDataDocs);

  } catch (error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}
