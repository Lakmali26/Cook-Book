
import express from "express";
import {
    getAllRecipes,
    matchRecipes
} from "../controllers/recipeController.js";

const router = express.Router();

// Route to get all recipes
router.get("/", getAllRecipes);

// Route to match recipes based on available ingredients
router.post("/match", matchRecipes);

export default router;
