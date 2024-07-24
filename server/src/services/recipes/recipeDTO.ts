import { HydratedDocument, ObjectId } from 'mongoose';
import { RecipeDocument } from './../../models/Recipe';

interface RecipeDTO {
  author: ObjectId;
  recipe_id: string;
  name: string;
  tags?: string[];
  image: string;
  ingredients: any[]; // Adjust this type based on your Ingredient model
  description?: string;
  instructions: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  calories?: number;
  portions?: number;
  saved_count: number;
  rating: number | null;
  time?: number;
}

const recipeToDTO = (recipe: HydratedDocument<RecipeDocument>): RecipeDTO => {
  let averageRating: number | null = 0
  const rating = recipe.rating
  if(rating.length !== 0) {
    const sum = rating.reduce((total, rating) => total + rating.rate, 0);
    averageRating = sum / rating.length;
  }else {
    averageRating = null
  }
  return {
      author: recipe.author,
      recipe_id: recipe._id,
      name: recipe.name,
      tags: recipe.tags,
      image: recipe.image,
      ingredients: recipe.ingredients,
      description: recipe.description,
      instructions: recipe.instructions,
      difficulty: recipe.difficulty,
      calories: recipe.calories,
      portions: recipe.portions,
      saved_count: recipe.saved_count,
      rating: averageRating,
      time: recipe.time
  }
}

module.exports = recipeToDTO;