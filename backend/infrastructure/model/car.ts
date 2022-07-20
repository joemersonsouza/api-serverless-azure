import { Schema, Document } from "mongoose"
import mongoose = require('mongoose');

export interface ICar extends Document {
  id: string;
  maker: string;
  model_name: string;
  year: number;
  color: string;
  monthlyPrice: number;
  availableDate: Date;
}

const CarSchema: Schema<ICar> = new Schema<ICar>({
  id: {
    type: String,
    required: true
  },
  maker: {
    type: String,
    required: true
  },
  model_name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  monthlyPrice: {
    type: Number,
    required: true
  },
  availableDate: {
    type: Date,
    required: true
  }
})

export default mongoose.model<ICar>("CarSchema", CarSchema)