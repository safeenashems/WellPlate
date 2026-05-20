import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "./slices/recipeSlice";
import favRecipeReducer from "./slices/fav&prefRecipeSlice";

const store = configureStore({
    reducer: {
        recipes: recipeReducer, // ✅ Use the single optimized recipe slice
        favorites: favRecipeReducer, // ✅ Use the single optimized favorite slice
    },
});

export default store;