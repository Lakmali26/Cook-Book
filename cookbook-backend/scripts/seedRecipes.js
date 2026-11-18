
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Recipe from "../models/Recipe.js";

dotenv.config();

// Sample recipes from our React frontend
const recipes = [
    {
        name: "Tomato Cheese Omelette",
        ingredients: ["Eggs", "Tomato", "Cheese"],
        cookingTime: 15
    },
    {
        name: "Tomato Cheese Pasta",
        ingredients: ["Tomato", "Cheese", "Onion", "Pasta"],
        cookingTime: 25
    },
    {
        name: "Chicken Salad",
        ingredients: ["Chicken", "Tomato", "Onion", "Lettuce"],
        cookingTime: 20
    },
    {
        name: "Potato Omelette",
        ingredients: ["Eggs", "Potato", "Onion"],
        cookingTime: 20
    }
];

// Insert recipes into MongoDB
const seedRecipes = async () => {
    try {
        await connectDB();

        await Recipe.deleteMany({});
        await Recipe.insertMany(recipes);

        console.log("Recipes added to MongoDB successfully!");

        process.exit();
    } catch (error) {
        console.error("Error adding recipes:", error.message);
        process.exit(1);
    }
};

seedRecipes();
