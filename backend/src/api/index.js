const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");
const authRoutes = require("../routes/auth.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Database connection error",
            details: error.message,
        });
    }
});

app.get("/", (req, res) => {
    res.send("Cheap Trip Foods API is running...");
});
app.use("/api/auth", authRoutes);

module.exports = app;
