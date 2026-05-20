require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const recipeRoutes = require("./routes/recipeRoutes");
const cuisineRoutes = require("./routes/cuisineRoutes"); 
const ingredientRoutes = require("./routes/ingredientRoutes");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const authRoutes = require("./routes/authRoutes");
const favRecipeRoutes = require("./routes/favRecipeRoutes");
const prefRecipeRoutes = require("./routes/filterRecipeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected via Compass"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// ✅ Use Routes
app.use("/api/recipes", recipeRoutes);
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/users", userRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/diseases", diseaseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cuisines", cuisineRoutes);
// ✅ Serve images statically
app.use("/uploads", express.static("uploads"));

app.use("/api/favorites",favRecipeRoutes);
app.use("/api/preferred",prefRecipeRoutes)
app.use("/api/admin",dashboardRoutes);

// Base API route
app.get("/", (req, res) => {
    res.send("Welcome to Smart Recipe Generator API 🚀");
});


app.listen(5000, () => console.log("🚀 Server running on port 5000"));
