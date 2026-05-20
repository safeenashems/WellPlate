const express = require("express");
const User = require("../models/UserSchema");
const Disease = require("../models/DiseaseSchema"); // Import Disease model
const authMiddleware = require("../middlewares/authMiddleware"); // Import auth middleware

const router = express.Router();

// ✅ GET all users(Admin Only - Optional)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const users = await User.find().populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

// ✅ GET logged-in user details (New /me route)
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user details" });
    }
});

// ✅ GET a specific user by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
});

// ✅ POST (Create) a new user (Signup)
router.post("/", async (req, res) => {
    try {
        const { name, mobile, password } = req.body;
        const newUser = new User({ name, mobile, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: "Error creating user" });
    }
});

// ✅ PUT (Update) User Preferences (Removes duplicates)
router.put("/:id/preferences", authMiddleware, async (req, res) => {
    try {
        const { diseases, customAvoid, customInclude } = req.body;
        const userId = req.params.id;

        // Fetch diseases with populated ingredients
        const selectedDiseases = await Disease.find({ _id: { $in: diseases } })
            .populate("avoidIngredients includeIngredients");

        // 🔹 Extract and flatten avoid/include ingredients from diseases
        const diseaseAvoidIngredients = selectedDiseases.flatMap(disease => disease.avoidIngredients.map(ing => ing._id));
        const diseaseIncludeIngredients = selectedDiseases.flatMap(disease => disease.includeIngredients.map(ing => ing._id));

        // 🔹 Merge disease-based and user-selected ingredients
        const finalAvoidIngredients = [...new Set([...diseaseAvoidIngredients, ...customAvoid])];
        const finalIncludeIngredients = [...new Set([...diseaseIncludeIngredients, ...customInclude])];

        // Update user document
        const updatedUser = await User.findByIdAndUpdate(userId, {
            "preferences.diseases": diseases,
            "preferences.avoidIngredients": finalAvoidIngredients,
            "preferences.includeIngredients": finalIncludeIngredients
        }, { new: true }).populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");

        if (!updatedUser) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User preferences updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: "Error updating preferences" });
    }
});

// ✅ DELETE a user by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});


// Promote user to admin
router.put("/promote",  authMiddleware , async (req, res) => {
    const { mobile  } = req.body;
  
    try {
      const user = await User.findOne({mobile  });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.role = "admin";
      await user.save();
  
      res.status(200).json({ message: "User promoted to admin successfully" });
    } catch (err) {
      console.error("Promotion error:", err);
      res.status(500).json({ message: "Server error during promotion" });
    }
  });


module.exports = router;





// const express = require("express");
// const User = require("../models/UserSchema");
// const Disease = require("../models/DiseaseSchema"); // Import Disease model
// const authMiddleware = require("../middlewares/authMiddleware"); // Import auth middleware

// const router = express.Router();

// // ✅ GET all users(Admin Only - Optional)
// router.get("/",authMiddleware, async (req, res) => {
//     try {
//         const users = await User.find().populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching users" });
//     }
// });


// // ✅ GET logged-in user details (New /me route)
// router.get("/me", authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id).populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");
//         if (!user) return res.status(404).json({ error: "User not found" });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching user details" });
//     }
// });

// // ✅ GET a specific user by ID
// router.get("/:id",authMiddleware, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id).populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");
//         if (!user) return res.status(404).json({ error: "User not found" });
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching user" });
//     }
// });

// // ✅ POST (Create) a new user (Signup)
// router.post("/", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         const newUser = new User({ name, email, password });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(400).json({ error: "Error creating user" });
//     }
// });

// // ✅ PUT (Update) User Preferences (Removes duplicates)
// router.put("/:id/preferences",authMiddleware, async (req, res) => {
//     try {
//         const { diseases, customAvoid, customInclude } = req.body;
//         const userId = req.params.id;

//         // Fetch diseases with populated ingredients
//         const selectedDiseases = await Disease.find({ _id: { $in: diseases } })
//             .populate("avoidIngredients includeIngredients");

//         // 🔹 Extract and flatten avoid/include ingredients from diseases(flat-map to remove nested array)
//         const diseaseAvoidIngredients = selectedDiseases.flatMap(disease => disease.avoidIngredients.map(ing => ing._id));
//         const diseaseIncludeIngredients = selectedDiseases.flatMap(disease => disease.includeIngredients.map(ing => ing._id));

//         // 🔹 Merge disease-based and user-selected ingredients(Set -aviods ingredients duplication)
//         const finalAvoidIngredients = [...new Set([...diseaseAvoidIngredients, ...customAvoid])];
//         const finalIncludeIngredients = [...new Set([...diseaseIncludeIngredients, ...customInclude])];

//         // Update user document
//         const updatedUser = await User.findByIdAndUpdate(userId, {
//             "preferences.diseases": diseases,
//             "preferences.avoidIngredients": finalAvoidIngredients,
//             "preferences.includeIngredients": finalIncludeIngredients
//         }, { new: true }).populate("preferences.diseases preferences.avoidIngredients preferences.includeIngredients");

//         if (!updatedUser) return res.status(404).json({ error: "User not found" });
//         res.json({ message: "User preferences updated successfully", user: updatedUser });
//     } catch (error) {
//         res.status(400).json({ error: "Error updating preferences" });
//     }
// });

// // ✅ DELETE a user by ID
// router.delete("/:id", async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) return res.status(404).json({ error: "User not found" });
//         res.json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ error: "Error deleting user" });
//     }
// });

// module.exports = router;
