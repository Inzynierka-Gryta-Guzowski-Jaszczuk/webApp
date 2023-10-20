
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
      calories: recipe.calories,
      portions: recipe.portions,
      saved_count: recipe.saved_count,
      rating: averageRating,
      time: recipe.time
  }
}

module.exports = recipeToDTO;