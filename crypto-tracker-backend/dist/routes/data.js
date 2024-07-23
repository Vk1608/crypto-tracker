"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const price_model_1 = __importDefault(require("../models/price-model"));
const router = express_1.default.Router();
// Example route to fetch all data
router.get('/data', async (req, res) => {
    try {
        const data = await price_model_1.default.find().sort({ timestamp: -1 }).limit(20);
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = router;
