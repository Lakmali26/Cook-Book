
import Recipe from "../models/Recipe.js";

// Get all recipes from MongoDB
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving recipes",
            error: error.message
        });
    }
};

// Match recipes based on available ingredients
export const matchRecipes = async (req, res) => {
    try {
        const { ingredients, maxCookingTime } = req.body;

        // Check that ingredients are provided as an array
        if (!Array.isArray(ingredients)) {
            return res.status(400).json({
                message: "Please provide ingredients as an array."
            });
        }

        // Get all recipes from MongoDB
        const recipes = await Recipe.find();

        // Find recipes that match the selected ingredients
        const matchingRecipes = recipes
            .map((recipe) => {
                const matchedIngredients = recipe.ingredients.filter(
                    (ingredient) =>
                        ingredients.some(
                            (available) =>
                                available.toLowerCase() === ingredient.toLowerCase()
                        )
                );

                const missingIngredients = recipe.ingredients.filter(
                    (ingredient) =>
                        !ingredients.some(
                            (available) =>
                                available.toLowerCase() === ingredient.toLowerCase()
                        )
                );

                const matchPercentage = Math.round(
                    (matchedIngredients.length / recipe.ingredients.length) * 100
                );

                return {
                    ...recipe.toObject(),
                    matchedIngredients,
                    missingIngredients,
                    matchPercentage
                };
            })
            .filter((recipe) => recipe.matchPercentage > 0)
            .filter((recipe) =>
                !maxCookingTime ||
                maxCookingTime === "any" ||
                recipe.cookingTime <= Number(maxCookingTime)
            )
            .sort((a, b) => b.matchPercentage - a.matchPercentage);

        res.status(200).json(matchingRecipes);

    } catch (error) {
        res.status(500).json({
            message: "Error matching recipes",
            error: error.message
        });
    }
};
