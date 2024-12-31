import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  image?: string;
  createdBy: mongoose.Types.ObjectId;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [String],
    steps: [String],
    image: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IRecipe>("Recipe", recipeSchema);
