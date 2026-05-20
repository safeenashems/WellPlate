const express = require("express");
const Ingredient = require("../models/IngredientSchema");
const { findOrCreateIngredientByName } = require("../utils/ingredientUtils");
const authMiddleware = require("../middlewares/authMiddleware"); // Import JWT middleware

const router = express.Router();

// ✅ GET all ingredients - Only accessible by admin
router.get("/", authMiddleware, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin privileges required" });
    }

    const ingredients = await Ingredient.find();
    res.status(200).json({ message: `${ingredients.length} ingredients fetched`, ingredients });
  } catch (error) {
    res.status(500).json({ error: "Error fetching ingredients" });
  }
});

// ✅ POST (Create) a new ingredient - Only accessible by admin
router.post("/", authMiddleware, async (req, res) => {
  try {
    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin privileges required" });
    }

    const { name, category, image, synonyms, allergens, nutrition } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }

    // 🔍 Check by normalized name or synonyms in utility
    const ingredient = await findOrCreateIngredientByName({ name, category, image, synonyms, allergens, nutrition });

    res.status(201).json({ message: "Ingredient created or returned successfully", ingredient });
  } catch (error) {
    res.status(400).json({ error: error.message || "Error creating ingredient" });
  }
});

module.exports = router;
