import mongoose, { Document, Schema } from 'mongoose';

export interface ICryptoList extends Document {
  cryptoName: string;
}

const cryptoListSchema: Schema = new Schema({
  cryptoName: { type: String, required: true, unique: true }
});

export default mongoose.model<ICryptoList>('CryptoList', cryptoListSchema);
