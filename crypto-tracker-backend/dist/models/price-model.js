"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const priceSchema = new mongoose_1.Schema({
    name: { type: String },
    code: { type: String, required: true },
    symbol: { type: String, },
    rate: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    color: { type: String },
});
exports.default = (0, mongoose_1.model)('PriceData', priceSchema);
