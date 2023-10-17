
const recipeToDTO = (recipe) => {
  let averageRating = 0
  if(recipe.rating.length !== 0) {
    const sum = recipe.ratings.reduce((total, rating) => total + rating, 0);
    averageRating = sum / recipe.ratings.length;
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
      type: recipe.type,  
      calories: recipe.calories,
      portions: recipe.portions,
      saved_count: recipe.saved_count,
      rating: averageRating,
      time: recipe.time
  }
}

module.exports = recipeToDTO;
/**
 * @swagger
 * tags:
 *  name: Recipes
 *  description: Recipes endpoints
 */
//TODO change ingredients and probably more
/**
*@swagger
*components:
*  schemas:
*    Recipe:
*      type: object
*      properties:
*        author:
*          type: string
*          description: The author of the recipe.
*        recipe_id:
*          type: string
*          description: The ID of the recipe.
*        name:
*          type: string
*          description: The name of the recipe.
*        tags:
*          type: array
*          items:
*            type: string
*          description: The tags associated with the recipe.
*        image:
*          type: string
*          description: The image URL of the recipe.
*        ingredients:
*          type: array
*          items:
*            type: string
*          description: The ingredients required for the recipe.
*        description:
*          type: string
*          description: The description of the recipe.
*        instructions:
*          type: string
*          description: The instructions for the recipe.
*        difficulty:
*          type: string
*          description: The difficulty level of the recipe.
*        type:
*          type: string
*          description: The type of the recipe.
*        calories:
*          type: integer
*          description: The calories in the recipe.
*        portions:
*          type: integer
*          description: The number of portions the recipe makes.
*        saved_count:
*          type: integer
*          description: The number of times the recipe has been saved.
*        rating:
*          type: number
*          format: float
*          description: The average rating of the recipe.
*        time:
*          type: string
*          description: The time required to prepare the recipe.
*/