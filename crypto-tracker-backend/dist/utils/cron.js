"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchDataAndStore = fetchDataAndStore;
const axios_1 = __importDefault(require("axios"));
const price_model_1 = __importDefault(require("../models/price-model"));
async function fetchDataAndStore() {
    try {
        const key = process.env.CRYPTO_KEY;
        const requestData = {
            codes: ["ETH", "GRIN", "BTC",],
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 0,
            meta: false
        };
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': key
            }
        };
        const response = await axios_1.default.post('https://api.livecoinwatch.com/coins/map', requestData, axiosConfig);
        const { name, code, symbol, rate, color } = response.data;
        const priceData = response.data;
        const timestamp = new Date();
        const priceDataDocs = priceData.map(({ name, code, symbol, rate, color }) => {
            return new price_model_1.default({
                name,
                code,
                symbol,
                rate,
                timestamp,
                color,
            });
        });
        console.log(response.data);
        await price_model_1.default.insertMany(priceDataDocs);
    }
    catch (error) {
        throw new Error(`Error fetching data: ${error.message}`);
    }
}
