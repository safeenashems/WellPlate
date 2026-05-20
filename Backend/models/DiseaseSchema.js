const mongoose = require("mongoose");

const DiseaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  diseaseName: { type: String, required: true },
  avoidIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  includeIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
}, { timestamps: true });

// Ensure unique diseaseName per user
DiseaseSchema.index({ userId: 1, diseaseName: 1 }, { unique: true });

module.exports = mongoose.model("Disease", DiseaseSchema);







// //used in userRoutes.js
//  const mongoose = require("mongoose");

// const DiseaseSchema = new mongoose.Schema({
//   diseaseName: { type: String, required: true, unique: true },
//   avoidIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }], // Ingredients to avoid
//   includeIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }] // Ingredients to include
// });

// module.exports = mongoose.model("Disease", DiseaseSchema);
