const mongoose = require("mongoose");
//const pluralize = require("pluralize");

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique ingredient name
  normalizedName: { type: String, required: true, unique: true }, // Lowercase + singular name
  category: { type: String, required: true }, // Category like "Vegetable", "Dairy"
  image: { type: String, required: false }, // Optional ingredient image
  synonyms: [{ type: String }], // Alternative names like "Tamatar" for "Tomato"
  allergens: { type: [String], enum: ["Gluten", "Nuts", "Dairy", "Soy", "Eggs", "Shellfish"], default: [] }, // Allergy info
  nutrition: {
    calories: { type: Number, required: false },
    protein: { type: Number, required: false },
    fat: { type: Number, required: false },
    carbohydrates: { type: Number, required: false },
    fiber: { type: Number, required: false }
  },
  createdAt: { type: Date, default: Date.now }
});
//IngredientSchema.index({ normalizedName: 1 }, { unique: true });
//already coded in ingrr\edietUtils.js
// // **Middleware to Normalize Name Before Saving**
// IngredientSchema.pre("save", function (next) {
//   this.normalizedName = pluralize.singular(this.name.toLowerCase().trim());
//   next();
// });

module.exports = mongoose.model("Ingredient", IngredientSchema);





// const mongoose = require("mongoose");

// const IngredientSchema = new mongoose.Schema({
//   name: { type: String, required: true, unique: true }, // Unique ingredient name
//   category: { type: String, required: true }, // Category like "Vegetable", "Dairy"
//   // image: { type: String, required: false }, // Optional ingredient image
//   nutrition: {
//     calories: { type: Number, required: false },
//     protein: { type: Number, required: false },
//     fat: { type: Number, required: false },
//     carbohydrates: { type: Number, required: false },
//     fiber: { type: Number, required: false }
//   }
// });

// module.exports = mongoose.model("Ingredient", IngredientSchema);
