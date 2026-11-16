
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
