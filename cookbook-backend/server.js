
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("CookBook Backend Server is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`CookBook server running on port ${PORT}`);
});
