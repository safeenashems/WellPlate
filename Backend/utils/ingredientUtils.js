const Ingredient = require("../models/IngredientSchema");
const pluralize = require("pluralize");

async function findOrCreateIngredientByName({
  name,
  category,
  image,
  synonyms = [],
  allergens = [],
  nutrition = {},
}) {
  const normalized = pluralize.singular(name.toLowerCase().trim());

  let ingredient;

  try {
    // First try: Find by normalizedName
    ingredient = await Ingredient.findOne({ normalizedName: normalized });

    // Second try: Check normalized synonyms
    if (!ingredient) {
      const normalizedSynonyms = synonyms.map(s => pluralize.singular(s.toLowerCase().trim()));
      ingredient = await Ingredient.findOne({ normalizedName: { $in: normalizedSynonyms } });

      // Also try directly matching against synonyms array
      if (!ingredient) {
        ingredient = await Ingredient.findOne({ synonyms: { $in: [normalized, ...normalizedSynonyms] } });
      }
    }

    // If still not found, create
    if (!ingredient) {
      ingredient = new Ingredient({
        name: name.trim(),
        normalizedName: normalized,
        category: category || "Miscellaneous",
        image: image || "",
        synonyms: synonyms.map(s => s.trim()),
        allergens,
        nutrition,
      });

      await ingredient.save(); // Might throw E11000
    }
  } catch (err) {
    if (err.code === 11000) {
      // Handle race condition or parallel insert attempt
      ingredient = await Ingredient.findOne({ normalizedName: normalized });
      if (!ingredient) {
        console.warn(`⚠️ Duplicate error, but still couldn't find ingredient for: ${name}`);
      }
    } else {
      console.error(`❌ Error creating/finding ingredient "${name}":`, err);
      throw err;
    }
  }

  return ingredient;
}

module.exports = { findOrCreateIngredientByName };
