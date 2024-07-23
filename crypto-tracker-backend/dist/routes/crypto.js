"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_list_1 = __importDefault(require("../models/crypto-list"));
const router = express_1.default.Router();
// Route to fetch available cryptocurrencies
router.get('/cryptos', async (req, res) => {
    try {
        const cryptos = await crypto_list_1.default.find().select('cryptoName');
        const cryptoNames = cryptos.map(crypto => crypto.cryptoName);
        res.json(cryptoNames);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
