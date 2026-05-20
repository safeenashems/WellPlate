const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Recipe name
  category: { 
    type: String, 
    required: true, 
    enum: ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"] 
  },
  cuisine: { 
    type: String, 
    required: true, 
    enum: [ "Indian","Italian", "Chinese", "Mexican", "French", "Mediterranean", "Middle Eastern", "Japanese"] 
  },
  difficulty: { 
    type: String, 
    required: true, 
    enum: ["Easy", "Medium", "Hard"] 
  },
  cookingTime: { type: Number, required: true }, // Time in minutes
  servings: { type: Number, required: true }, // Number of servings
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient", required: true }], 
  instructions: { type: String, required: true }, // Full written instructions
  steps: [
    {
      stepNumber: { type: Number, required: true },
      description: { type: String, required: true },
      image: { type: String, required: false } // Step-by-step image
    }
  ],
  dietary: { 
    type: [String], 
    enum: ["Vegan", "Paleo", "Keto", "Diabetic-Friendly", "Low-Carb", "Heart-Healthy", "Gluten-Free", "Nut-Free", "Dairy-Free", "Vegetarian", "Non-Vegetarian"], 
    default: [] 
  }, // Dietary preferences
  
//allergens added in ingredients
  // allergens: { 
  //   type: [String], 
  //   enum: ["Gluten", "Nuts", "Dairy", "Soy", "Eggs", "Shellfish"], 
  //   default: [] 
  // }, // Allergy-related info
  
  mainImage: { type: String, required: false }, // URL of the dish image
  video: { type: String, required: false }, // YouTube or video link (optional)

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true,
    default: new mongoose.Types.ObjectId("67de8d6d543b352da0bee6d9") }, // Admin who added
  
      createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Recipe", RecipeSchema);