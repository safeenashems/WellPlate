const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");
const authMiddleware = require("../middlewares/authMiddleware");

// Add to favorites
router.post("/:recipeId", authMiddleware, async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user.favorites.includes(recipeId)) {
      user.favorites.push(recipeId);
      await user.save();
    }
    res.status(200).json({ message: "Added to favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to favorites", error: err.message });
  }
});

// Remove from favorites
router.delete("/:recipeId", authMiddleware, async (req, res) => {
  const { recipeId } = req.params;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    user.favorites.pull(recipeId);
    await user.save();

    res.status(200).json({ message: "Removed from favorites", favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from favorites", error: err.message });
  }
});

// Get all favorites
router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).populate("favorites");
    res.status(200).json({ favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch favorites", error: err.message });
  }
});

module.exports = router;
