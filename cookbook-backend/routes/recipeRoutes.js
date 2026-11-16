
import express from "express";
import { getAllRecipes } from "../controllers/recipeController.js";

const router = express.Router();

// Route to get all recipes
router.get("/", getAllRecipes);

export default router;
