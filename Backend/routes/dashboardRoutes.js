const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware"); 

const Recipe = require("../models/RecipeSchema");
const User = require("../models/UserSchema");

router.get("/dashboard-summary",authMiddleware , async (req, res) => {
  console.log("📊 Dashboard Summary route triggered");
  try {
    const totalRecipes = await Recipe.countDocuments();
    const totalUsers = await User.countDocuments();

    const recipesPerCuisineArr = await Recipe.aggregate([
      { $group: { _id: "$cuisine", count: { $sum: 1 } } }
    ]);
    const recipesPerCuisine = {};
    recipesPerCuisineArr.forEach(item => {
      recipesPerCuisine[item._id] = item.count;
    });

    // Get favorite stats by aggregating User data
    const favouriteStatsArr = await User.aggregate([
      { $unwind: "$favorites" }, // Unwind the favorites array
      { $group: { _id: "$favorites", count: { $sum: 1 } } }
    ]);
    const favouriteStats = {};
    favouriteStatsArr.forEach(item => {
      favouriteStats[item._id] = item.count;
    });

    console.log("Total Recipes:", totalRecipes);
    console.log("Total Users:", totalUsers);
    console.log("Recipes Per Cuisine:", recipesPerCuisine);
    console.log("Favourite Stats:", favouriteStats);



    res.json({
      totalRecipes,
      totalUsers,
      recipesPerCuisine,
      favouriteStats,
    });
  } catch (error) {
    console.error("Error in dashboard summary:", error);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;