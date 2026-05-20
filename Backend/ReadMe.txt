🔹 Explanation of Packages
express → Web framework to create APIs.
mongoose → Helps interact with MongoDB.
cors → Enables cross-origin requests.
dotenv → Loads environment variables from a .env file.


put eg:http://localhost:5000/api/recipes/67d3e66b3411e98fffc211de

📌 What .populate() Does
In your UserSchema, you store references (ObjectId) to diseases and ingredients rather than the actual data. However, when you fetch user data, you don't want just the IDs—you want the full details of the related Disease and Ingredient documents.

💊🛑Should We Replace .flatMap() with .populate()?
No, because .populate() only fetches related documents but doesn’t automatically extract the list of avoidIngredients and includeIngredients.
We still need .flatMap() to get a flat list of ingredient IDs from the populated data.

npm install bcryptjs jsonwebtoken (express-validator→ Validates user input)

🔹 What Happens in authRoutes.js?
In authentication routes (authRoutes.js), we: ✅ Validate user credentials (email & password).
✅ Generate a JWT token upon successful login.
✅ Send the token back to the client.

ChatGPT said:
In authentication and authorization, we use JWT (JSON Web Token) to securely authenticate users. The reason we handle it separately in authMiddleware is that:

🔹 Why Do We Need authMiddleware When JWT is Already in authRoutes?
1️⃣ In authRoutes.js, JWT is created and sent when a user logs in or registers.
2️⃣ In authMiddleware.js, JWT is verified and used to protect routes that require authentication.

🔹 What Happens in authRoutes.js?
In authentication routes (authRoutes.js), we: ✅ Validate user credentials (email & password).
✅ Generate a JWT token upon successful login.
✅ Send the token back to the client.
