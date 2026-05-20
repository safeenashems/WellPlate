const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, unique: true, required: true }, // ✅ Replaced email with mobile
  password: { type: String, required: true }, // Hashed password
  role: { type: String, default: "user", enum: ["admin", "user"] }, // Support for normal users
  createdAt: { type: Date, default: Date.now },

  // 🔹 User Preferences for Diet Restrictions
  preferences: {
    diseases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disease" }],
    avoidIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
    includeIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }]
  },

  // User's Favorite Recipes
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }]
});

module.exports = mongoose.model("User", UserSchema);






// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true }, // Hashed password
//   role: { type: String, default: "user", enum: ["admin", "user"] }, // Support for normal users
//   createdAt: { type: Date, default: Date.now },

//   // 🔹 User Preferences for Diet Restrictions(updates later)
//   preferences: {
//     diseases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Disease" }], // Selected diseases
//     avoidIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }], // Custom avoid list
//     includeIngredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }] // Preferred ingredients
//   }
// });

// module.exports = mongoose.model("User", UserSchema);