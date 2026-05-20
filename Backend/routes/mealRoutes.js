const express = require("express");
const Recipe = require("../models/RecipeSchema");
const User = require("../models/UserSchema");
const Disease = require("../models/DiseaseSchema");

const router = express.Router();

// ✅ GET Meal Recommendations for a User
router.get("/:userId/mealRecommendations", async (req, res) => {
    try {
        // ✅ Fetch user with populated diseases
        const user = await User.findById(req.params.userId).populate("preferences.diseases");
        if (!user) return res.status(404).json({ error: "User not found" });

        // ✅ Extract disease IDs
        const userDiseases = user.preferences.diseases.map(disease => disease._id);

        // ✅ Fetch diseases and get ingredients to avoid
        const diseases = await Disease.find({ _id: { $in: userDiseases } }).populate("avoidIngredients");
        const avoidIngredients = diseases.flatMap(disease => disease.avoidIngredients.map(ing => ing._id));

        let recommendedRecipes;

        if (avoidIngredients.length > 0) {
            // ✅ Fetch recipes that do NOT contain avoidIngredients
            recommendedRecipes = await Recipe.find({ ingredients: { $nin: avoidIngredients } });
        } else {
            // ✅ If no disease is specified, show all recipes
            recommendedRecipes = await Recipe.find();
        }

        res.json(recommendedRecipes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching meal recommendations" });
    }
});

module.exports = router;
