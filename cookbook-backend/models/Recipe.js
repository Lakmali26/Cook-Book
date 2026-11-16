
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    ingredients: {
        type: [String],
        required: true
    },

    cookingTime: {
        type: Number,
        required: true
    }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
