const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const authMiddleware = async (req, res, next) => {
  console.log("🔐 Auth Middleware triggered");

  // Extract token from the Authorization header
  const token = req.header("Authorization");
  console.log("🔑 Token received:", token);
  if (!token) {
    console.log("⛔ No token provided");
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    // Verify the token and decode the payload to get the user ID
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    console.log("🔑 Token decoded, user ID:", decoded.userId);

    // Fetch the user based on decoded ID
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("⛔ User not found");
      return res.status(404).json({ error: "User not found" });
    }

    // Successfully authenticated, attaching the user to the request
    req.user = user;
    console.log("✅ Authenticated user:", { id: user._id, mobile: user.mobile, role: user.role });

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log("⛔ Token verification failed:", error.message);
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;






// //export to userroutes
// const jwt = require("jsonwebtoken");
// const User = require("../models/UserSchema");

// const authMiddleware = async(req, res, next) => {
//   console.log("Auth Middleware triggered");
//   const token = req.header("Authorization");
//   if (!token) {
//     return res.status(401).json({ error: "Access denied, no token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password"); // Attach user object without password
   
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// module.exports = authMiddleware;
