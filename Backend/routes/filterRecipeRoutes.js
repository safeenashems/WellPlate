const express = require("express");
const router = express.Router();
const Recipe = require("../models/RecipeSchema");
const User = require("../models/UserSchema");
const authMiddleware = require("../middlewares/authMiddleware"); // Import JWT middleware

// @route    GET /api/recipes/:filterType
// @desc     Get recipes based on filter type (preferred, default, or favourites)
// @access   Private (except for default recipes, if needed)
router.get("/:filterType",authMiddleware, async (req, res) => {
  const { filterType } = req.params;

  try {
    let recipes = [];
    
    // If the filter type is 'preferred'
    if (filterType === 'preferred') {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const { includeIngredients, excludeIngredients } = user;
      const filter = {};

      if (includeIngredients && includeIngredients.length > 0) {
        filter.ingredients = { $in: includeIngredients };
      }
      if (excludeIngredients && excludeIngredients.length > 0) {
        filter.ingredients = { ...filter.ingredients, $nin: excludeIngredients };
      }

      recipes = await Recipe.find(filter);
    } 

    // If the filter type is 'default'
    else if (filterType === 'default') {
      recipes = await Recipe.find({ isDefault: true });
    }

    // If the filter type is 'favourites'
    else if (filterType === 'favourites') {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      recipes = await Recipe.find({ _id: { $in: user.favouriteRecipes } });
    }

    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ message: `No ${filterType} recipes found` });
    }

    res.json(recipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
