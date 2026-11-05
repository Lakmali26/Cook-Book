import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
    res.send("CookBook Backend Server is Running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`CookBook server running on port ${PORT}`);
});