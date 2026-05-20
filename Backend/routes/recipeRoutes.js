const express = require("express");
const Recipe = require("../models/RecipeSchema"); // Import Recipe model
const Ingredient = require("../models/IngredientSchema");
const multer = require("multer");
const path = require("path");
const { findOrCreateIngredientByName } = require("../utils/ingredientUtils");
const authMiddleware = require("../middlewares/authMiddleware"); // Import JWT middleware
const router = express.Router();

// ✅ Storage Configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to 'uploads/' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// ✅ POST Recipe (with image upload) - Only admin can create
router.post("/", authMiddleware, upload.single("mainImage"), async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin privileges required" });
    }

    const recipeData = req.body;

    if (req.file) {
      recipeData.mainImage = `/uploads/${req.file.filename}`; // Save filename in DB
    }

    // Convert ingredient names to IDs (trim & lowercase)
    recipeData.ingredients = await Promise.all(
      recipeData.ingredients.map(async (ingredientName) => {
        const ingredient = await findOrCreateIngredientByName({
          name: ingredientName,
          category: "Unknown"  // or default to something meaningful
        });
        return ingredient._id;
      })
    );

    // Create and save the recipe
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe posted successfully", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get all recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("ingredients");
    res.status(200).json({ message: `Fetched ${recipes.length} recipe(s) successfully`, recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get recipes with options to cuisine &/or dietary-wise filtering
router.get("/", async (req, res) => {
  console.log("✅ API Route Hit: /api/recipes", req.query);
  try {
    const { cuisine, dietary, search } = req.query;
    let filter = {};

    if (cuisine && cuisine !== "all") {
      filter.cuisine = { $in: [cuisine] };

      // Apply dietary filter only if cuisine is selected
      if (dietary && dietary !== "all") {
        filter.dietary = { $in: [dietary] };
      }
    }

    // Apply search filter (matches recipe name, category, or ingredients)
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },  // Case-insensitive title search
        { category: { $regex: search, $options: "i" } },  // Case-insensitive category search
        {
          ingredients: {
            $in: await Ingredient.find({ name: { $regex: search, $options: "i" } }).distinct("_id")
          }
        }  // Search ingredients by name
      ];
    }

    console.log("🔍 Applying Filters:", JSON.stringify(filter, null, 2));
    
    const recipes = await Recipe.find(filter).populate("ingredients");
    console.log(`✅ Filtered Recipes Found: ${recipes.length}`);

    res.status(200).json({
      message: `Fetched ${recipes.length} recipe(s) successfully`,
      recipes
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get a single recipe by ID
router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("ingredients", "name").lean(); // Only populate specific fields for clarity
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json({ message: "Fetched single recipe successfully", recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// ✅ Update a recipe - Only admin can update
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    console.log("🔵 Incoming request to update recipe:", req.originalUrl); // Log the full URL
    console.log("Request body:", req.body); // Log the request body (ensure ingredients and other fields are correct)
    console.log("Request params:", req.params); // Log request params (including the recipe ID)
  

    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin privileges required" });
    }

    const { ingredients, ...otherFields } = req.body;

    let ingredientIds = [];

    // ✅ Convert ingredient names to ObjectIds (via findOrCreate)
    if (Array.isArray(ingredients)) {
      const ingredientDocs = await Promise.all(
        ingredients.map(async (ingredient) => {
          const ingredientName = typeof ingredient === "string" ? ingredient : ingredient?.name;
          console.log("🔄 Processing ingredient:", ingredientName);
    
          if (!ingredientName) {
            console.warn("⚠️ Skipping invalid ingredient:", ingredient);
            return null;
          }
    
          const ingredientObj = await findOrCreateIngredientByName({ name: ingredientName });
    
          if (!ingredientObj) {
            console.error("❌ Failed to find or create ingredient:", ingredientName);
            return null;
          }
    
          console.log("✅ Ingredient object:", ingredientObj);
          return ingredientObj._id;
        })
      );
    
      // Filter out any nulls (in case some ingredients failed)
      ingredientIds = ingredientDocs.filter(id => id !== null);
    }
    // Update the recipe
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        ...otherFields,
        ingredients: ingredientIds.length ? ingredientIds : undefined, // keep original if nothing sent
      },
      { new: true }
    );
    console.log("Updated Recipe:", updatedRecipe); 
    if (!updatedRecipe) return res.status(404).json({ error: "Recipe not found" });

    res.status(200).json({ message: "Updated a recipe", updatedRecipe });

  } catch (error) {
    console.error("🔥 Error updating recipe:", error);
    res.status(500).json({ error: error.message });
  }
});


// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     // Check if user is an admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ error: "Access denied, admin privileges required" });
//     }
//     const { ingredients, ...otherFields } = req.body;

//     let ingredientIds = [];
    
//     const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedRecipe) return res.status(404).json({ error: "Recipe not found" });
//     res.status(200).json({ message: "Updated a recipe", updatedRecipe });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// ✅ Delete a recipe - Only admin can delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Check if user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied, admin privileges required" });
    }

    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) return res.status(404).json({ error: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;


















// // This file will handle adding, fetching, updating, and deleting recipes.
// const express = require("express");
// const Recipe = require("../models/RecipeSchema"); // Import Recipe model
// const Ingredient = require("../models/IngredientSchema");
// const multer = require("multer");
// const path = require("path");
// const { findOrCreateIngredientByName } = require("../utils/ingredientUtils");
// const router = express.Router();

// // ✅ Storage Configuration for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Save to 'uploads/' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   }
// });

// const upload = multer({ storage });


// // ✅ POST Recipe (with image upload)
// router.post("/",upload.single("mainImage"), async (req, res) => {
//     try {
//       const recipeData = req.body;
  
//       if (req.file) {
//         recipeData.mainImage = `/uploads/${req.file.filename}`; // Save filename in DB (img is avialble uploadit)
//       }

//       // // Convert ingredient names to IDs (trim & lowercase)
//       // recipeData.ingredients = await Promise.all(
//       //   recipeData.ingredients.map(async (ingredientName) => {
//       //     const formattedName = ingredientName.trim().toLowerCase(); // Trim & lowercase
  
//       //     let ingredient = await Ingredient.findOne({ name: formattedName });
  
//       //     if (!ingredient) {
//       //       // ✅ Automatically create ingredient if not found
//       //       ingredient = new Ingredient({ name: formattedName, category: "Unknown" });
//       //       await ingredient.save();
//       //     }
  
//       //     return ingredient._id;
//       //   })
//       // );const { findOrCreateIngredientByName } = require("../utils/ingredientUtils");
//       console.log("Ingredients coming in:", recipeData.ingredients);
// recipeData.ingredients = await Promise.all(
//   recipeData.ingredients.map(async (ingredientName) => {
//     const ingredient = await findOrCreateIngredientByName({
//       name: ingredientName,
//       category: "Unknown"  // or default to something meaningful
//     });
//     return ingredient._id;
//   })
// );



//   // Create and save the recipe
//   const newRecipe = new Recipe(recipeData);
//     await newRecipe.save();
//     res.status(201).json({ message: "Recipe posted successfully", recipe: newRecipe });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });




// // // ✅ Get all recipes
// // router.get("/", async (req, res) => {
// //   try {
// //     const recipes = await Recipe.find().populate("ingredients");
// //     res.status(200).json({ message: `Fetched ${recipes.length} recipe(s) successfully`, recipe:recipes});
// //   } catch (error) {
// //     res.status(500).json({ error: error.message });
// //   }
// // });

// // ✅ Get recipes with options to cuisine &/or dietary wise filtering

// router.get("/", async (req, res) => {
//   console.log("✅ API Route Hit: /api/recipes", req.query);
//   try {
//     const { cuisine, dietary, search  } = req.query;

//     let filter = {};

//     if (cuisine && cuisine !== "all") {
//       filter.cuisine = { $in:[cuisine]};

//       // Apply dietary filter only if cuisine is selected
//       if (dietary && dietary !== "all") {
//         filter.dietary = { $in: [dietary] };
//       }
//     }

//      // Apply search filter (matches recipe name, category, or ingredients)
//      if (search) {
//       filter.$or = [
//           { title: { $regex: search, $options: "i" } },  // Case-insensitive title search
//           { category: { $regex: search, $options: "i" } },  // Case-insensitive category search
//           { ingredients: { 
//               $in: await Ingredient.find({ name: { $regex: search, $options: "i" } }).distinct("_id") 
//           }}  // Search ingredients by name
//       ];
//   }

//     console.log("🔍 Applying Filters:",JSON.stringify(filter,null,2));
    
//     const recipes = await Recipe.find(filter).populate("ingredients");
//     console.log(`✅ Filtered Recipes Found: ${recipes.length}`);

//     res.status(200).json({
//       message: `Fetched ${recipes.length} recipe(s) successfully`,
//       recipe: recipes
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// // ✅ Get a single recipe by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id).populate("ingredients","name").lean();// Only populate specific fields for clarity
//     if (!recipe) return res.status(404).json({ error: "Recipe not found" });
//     res.status(200).json({ message: "Fetched single recipe successfully", recipe:recipe});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Update a recipe
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedRecipe) return res.status(404).json({ error: "Recipe not found" });
//     res.status(200).json({message:"Updated a recipe",updatedRecipe});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ Delete a recipe
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
//     if (!deletedRecipe) return res.status(404).json({ error: "Recipe not found" });
//     res.status(200).json({ message: "Recipe deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });



// module.exports = router;









//const express = require("express");
// const Recipe = require("../models/RecipeSchema");
// const Ingredient = require("../models/IngredientSchema");
// const multer = require("multer");
// const path = require("path");

// const router = express.Router();

// // ✅ Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Save to 'uploads/' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   }
// });

// const upload = multer({ storage });

// // ✅ Helper: Convert ingredient names to IDs
// const getIngredientIds = async (ingredients) => {
//   return await Promise.all(
//     ingredients.map(async (ingredientName) => {
//       const formattedName = ingredientName.trim().toLowerCase();

//       let ingredient = await Ingredient.findOne({ name: formattedName });

//       if (!ingredient) {
//         // ✅ Auto-create ingredient if not found
//         ingredient = new Ingredient({ name: formattedName, category: "Unknown" });
//         await ingredient.save();
//       }

//       return ingredient._id;
//     })
//   );
// };

// // ✅ POST: Add a new recipe
// router.post("/", upload.single("mainImage"), async (req, res) => {
//   try {
//     let recipeData = req.body;

//     // Attach image if uploaded
//     if (req.file) {
//       recipeData.mainImage = req.file.filename;
//     }

//     // Convert ingredient names to IDs
//     recipeData.ingredients = await getIngredientIds(recipeData.ingredients);

//     // Create and save the recipe
//     const newRecipe = new Recipe(recipeData);
//     await newRecipe.save();

//     res.status(201).json({ message: "Recipe added successfully", recipe: newRecipe });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ GET: All recipes (with optional filtering by cuisine and dietary type)
// router.get("/", async (req, res) => {
//   try {
//     const { cuisine, dietaryType } = req.query;
//     let filter = {};

//     if (cuisine ) {
//       filter.cuisine = { $eq: cuisine }; // Exact match for cuisine
//     }

//     if (dietaryType) {
//       filter.dietaryType = { $eq: dietaryType }; // Exact match for dietary type
//     }

//     const recipes = await Recipe.find(filter).populate("ingredients");
//     res.status(200).json({ message: `Fetched ${recipes.length} recipes`, recipes });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ GET: Single recipe by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id).populate("ingredients");
//     if (!recipe) return res.status(404).json({ error: "Recipe not found" });
//     res.status(200).json({ message: "Fetched recipe successfully", recipe });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ PUT: Update recipe (with image support)
// router.put("/:id", upload.single("mainImage"), async (req, res) => {
//   try {
//     let recipeData = req.body;

//     // Attach new image if uploaded
//     if (req.file) {
//       recipeData.mainImage = req.file.filename;
//     }

//     // Convert ingredient names to IDs if provided
//     if (recipeData.ingredients) {
//       recipeData.ingredients = await getIngredientIds(recipeData.ingredients);
//     }

//     const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, recipeData, { new: true });

//     if (!updatedRecipe) return res.status(404).json({ error: "Recipe not found" });

//     res.status(200).json({ message: "Recipe updated successfully", updatedRecipe });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // ✅ DELETE: Remove a recipe
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
//     if (!deletedRecipe) return res.status(404).json({ error: "Recipe not found" });

//     res.status(200).json({ message: "Recipe deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;