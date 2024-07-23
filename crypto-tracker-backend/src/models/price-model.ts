import { Schema, model, Document } from 'mongoose';

export interface IPriceData extends Document {
  name: string;
  symbol: string;
  rate: number;
  timestamp: Date;
  color: string;
  code: string;
}

const priceSchema: Schema = new Schema({
    name: { type: String },
    code: { type: String, required: true },
    symbol: { type: String, },
    rate: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    color: { type: String },
});

export default model<IPriceData>('PriceData', priceSchema);