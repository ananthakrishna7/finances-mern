// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const redisClient = require('./config/redis'); 
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Database connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Your test API route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the Express backend with MongoDB!" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
