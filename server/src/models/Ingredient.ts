import mongoose, { Document, Schema, Model } from 'mongoose';

interface IngredientDocument extends Document {
    name: string;
}

const ingredientSchema = new Schema<IngredientDocument>({
    name: { type: String, required: true }
});

const Ingredient: Model<IngredientDocument> = mongoose.model<IngredientDocument>('Ingredient', ingredientSchema);

export {Ingredient, IngredientDocument, ingredientSchema};