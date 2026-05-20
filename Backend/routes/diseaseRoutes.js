const express = require("express");
const Disease = require("../models/DiseaseSchema");
const authMiddleware = require("../middlewares/authMiddleware"); // Importing JWT authentication middleware

const router = express.Router();

// ✅ GET All Diseases with Ingredients
router.get("/", authMiddleware, async (req, res) => {
    try {
        const diseases = await Disease.find({ userId: req.user._id }) // Only fetch diseases related to the authenticated user
            .populate("avoidIngredients includeIngredients", "name"); // Populate only ingredient names
        
        res.json(diseases);
    } catch (error) {
        res.status(500).json({ error: "Error fetching diseases" });
    }
});

// POST route to add a new disease
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { diseaseName, avoidIngredients, includeIngredients } = req.body;
        const userId = req.user._id; // Get user ID from the authenticated user
        
        // Check for duplicates for the same user
        const existing = await Disease.findOne({ userId, diseaseName });
        if (existing) {
            return res.status(400).json({ error: "Disease already exists for this user." });
        }
        
        const newDisease = new Disease({
            userId,
            diseaseName,
            avoidIngredients,
            includeIngredients
        });

        await newDisease.save();
        res.status(201).json({ message: "Disease added successfully", disease: newDisease });
    } catch (error) {
        res.status(500).json({ error: "Error adding disease", details: error.message });
    }
});

// ✅ DELETE a Disease by ID
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the disease by ID
        const disease = await Disease.findById(id);

        if (!disease) {
            return res.status(404).json({ error: "Disease not found" });
        }

        // Ensure the disease belongs to the authenticated user
        if (disease.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "You are not authorized to delete this disease" });
        }

        await disease.remove();
        res.json({ message: "Disease deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting disease", details: error.message });
    }
});

module.exports = router;
