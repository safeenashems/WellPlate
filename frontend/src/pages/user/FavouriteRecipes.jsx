// src/pages/User/Favourites.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../slices/recipeSlice";
import { fetchFavorites } from "../../slices/fav&prefRecipeSlice";
import RecipeList from "../../pages/RecipeList";
import { Typography, Box } from "@mui/material";

const Favourites = () => {
  const dispatch = useDispatch();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const allRecipes = useSelector((state) => state.recipes.filteredRecipes);
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

  useEffect(() => {
    dispatch(fetchRecipes({})); // Fetch all recipes
    if (isLoggedIn) dispatch(fetchFavorites()); // Fetch user's favourites
  }, [dispatch, isLoggedIn]);

  const favouriteRecipes = allRecipes?.filter((recipe) =>
    favoriteIds.includes(recipe._id || recipe.id)
  );

  return (
    <Box>
      <Typography variant="h5" color="primary" gutterBottom>
        Your Favourite Recipes
      </Typography>

      {favouriteRecipes?.length > 0 ? (
        <RecipeList
          selectedCuisine={null}
          selectedDiet={null}
          recipes={favouriteRecipes}
          forceCustomList
        />
      ) : (
        <Typography color="textSecondary">
          You haven’t saved any favourites yet.
        </Typography>
      )}
    </Box>
  );
};

export default Favourites;











// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addFavorite,removeFavorite } from "../slices/fav&prefRecipeSlice.jsx";
// import { Container, Box, Button, Typography, CircularProgress } from "@mui/material";
// import RecipeList from "../pages/RecipeList";

// function FilterRecipes() {
//   const dispatch = useDispatch();
//   const [filter, setFilter] = useState("all"); // Default filter is 'all' (all recipes)

//   const isLoggedIn = Boolean(localStorage.getItem("token"));
//   const { selectedCuisine, selectedDiet } = useSelector((state) => state.recipes);
//   const { filteredRecipes, loading } = useSelector((state) => state.recipes);
  
//   // Fetch recipes based on the selected filter
//   useEffect(() => {
//     if (filter === "all") {
//       dispatch(fetchRecipes({ cuisine: selectedCuisine, diet: selectedDiet }));
//     } else if (filter === "favorites") {
//       dispatch(fetchFavorites()); // Fetch favorites for logged-in user
//     } else if (filter === "preferred") {
//       dispatch(fetchPreferredRecipes()); // Fetch recipes based on user's preferences
//     }
//   }, [dispatch, filter, selectedCuisine, selectedDiet]);

//   const handleFilterChange = (newFilter) => {
//     setFilter(newFilter); // Change the filter type
//   };

//   // If data is still loading, show a spinner
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
//         <CircularProgress color="primary" />
//       </Box>
//     );
//   }

//   return (
//     <Container sx={{ mt: 4, p: 3 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Recipes
//       </Typography>

//       {/* Filter buttons */}
//       <Box display="flex" justifyContent="center" gap={2} mb={3}>
//         <Button variant="outlined" onClick={() => handleFilterChange("all")}>All Recipes</Button>
//         <Button variant="outlined" onClick={() => handleFilterChange("favorites")}>Favorites</Button>
//         <Button variant="outlined" onClick={() => handleFilterChange("preferred")}>Preferred Recipes</Button>
//       </Box>

//       {/* Render the filtered recipe list */}
//       {filteredRecipes && <RecipeList recipes={filteredRecipes} />}
//     </Container>
//   );
// }

// export default FilterRecipes;
