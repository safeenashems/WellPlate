const express = require("express");
const Recipe = require("../models/RecipeSchema"); // Import the Recipe model
const router = express.Router();

// ✅ for displaying cuisines and diettypes as per schema-enum order 
const cuisineOrder = Recipe.schema.path("cuisine").enumValues;//fetching order from recipe schema cuisines- enum
const dietOrder = Recipe.schema.path("dietary").caster.enumValues;

// Route 1:Get all unique cuisines(for cuisine-carousel display)
router.get("/", async (req, res) => {
    try {
        const cuisines = await Recipe.distinct("cuisine"); // Fetch unique cuisines
        const sortedCuisines = cuisines.sort((a, b) => cuisineOrder.indexOf(a) - cuisineOrder.indexOf(b));
        
        res.json(sortedCuisines);
    } catch (error) {
        console.error("Error fetching cuisines:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


//   // ✅ Route to get dietary types with tooltips
// router.get("/dietary", (req, res) => {
//     const sortedDietary = dietOrder.map(diet => ({
//         type: diet,
//         tooltip: dietTooltips[diet] || ""
//     }));
//     res.json(sortedDietary);
// });

// ✅ Route 2: Get available dietary types for a selected cuisine (To show options)
router.get("/:cuisine/dietary", async (req, res) => {
    try {
        const { cuisine } = req.params;

        // Fetch available dietary options for the selected cuisine
        const availableDietaryTypes = await Recipe.distinct("dietary", { cuisine });

        // Sort dietary options in the predefined order
        const sortedDietaryTypes = availableDietaryTypes
            .sort((a, b) => dietOrder.indexOf(a) - dietOrder.indexOf(b))
            // .map(diet => ({
            //     type: diet,
            //     tooltip: dietTooltips[diet] || ""
            // }));

        res.json(sortedDietaryTypes);
    } catch (error) {
        console.error("Error fetching dietary types:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ✅ 3:Get recipes by cuisine ( and diettype if user selected)
router.get("/:cuisine", async (req, res) => {
    try {
        const { cuisine } = req.params;
        const { dietaryType } = req.query; // Get dietaryType from query params
       
        console.log("Fetching recipes for cuisine:", cuisine); // Log cuisine
        console.log("Received dietaryType:", dietaryType); 
        
        let filter = { cuisine }; // Default filter based on selected cuisine

        
        if (dietaryType) {
            filter.dietaryType = dietaryType;
        }
        console.log("Filter Query:", filter); // Log filter query before fetching

        // Fetch filtered recipes
        const recipes = await Recipe.find(filter).populate("ingredients");

         // Fetch available dietary options for the selected cuisine
         const availableDietaryTypes = await Recipe.distinct("dietary", { cuisine });
         const sortedDietaryTypes = availableDietaryTypes.sort((a, b) => dietOrder.indexOf(a) - dietOrder.indexOf(b));
 
        res.status(200).json({ message: `Fetched ${recipes.length} recipes`, recipes });
    } catch (error) {
     //  console.error("Error fetching recipes:", error); 
        res.status(500).json({ error: error.message });
    }
});


  module.exports = router;