const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Cheap Trip Foods API is running...");
});

module.exports = app;
