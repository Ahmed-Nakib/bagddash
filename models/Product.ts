import mongoose, { Schema, Document, models } from "mongoose";

export interface IProduct extends Document {
  title: string;
  subtitle: string;
  price: number;
  details: string;
  image: string;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: String,
    subtitle: String,
    price: Number,
    details: String,
    image: String,
  },
  { timestamps: true }
);

export default models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
