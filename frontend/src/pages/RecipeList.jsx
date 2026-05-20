import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../slices/recipeSlice";
import {
  Container, Typography, Card, CardMedia, CardContent, Button,
  CircularProgress, Box, Grid, IconButton
} from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { fetchFavorites,addFavorite,removeFavorite
}from "../slices/fav&prefRecipeSlice";

function RecipeList({ selectedCuisine, selectedDiet, recipes: externalRecipes, forceCustomList = false }) {
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const recipesFromStore = useSelector((state) => state.recipes.filteredRecipes);
  const loading = useSelector((state) => state.recipes.loadingRecipes);
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds); // Use Redux state for favoriteIds

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchFavorites()); // Fetch the user's favorite recipes when logged in
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (!forceCustomList) {
    dispatch(fetchRecipes({ cuisine: selectedCuisine, diet: selectedDiet }));
  }
}, [dispatch, selectedCuisine, selectedDiet, forceCustomList]);

const recipes = forceCustomList ? externalRecipes : recipesFromStore; 
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!Array.isArray(recipes)) {
    console.error("❌ recipes is NOT an array:", recipes);
    return <Typography color="error">Error: Invalid data format.</Typography>;
  }

  const handleFavoriteToggle = (recipeId) => {
    if (!isLoggedIn) {
      toast.warning("Please log in to save favorites!");
      return;
    }

    if (favoriteIds.includes(recipeId)) {
      dispatch(removeFavorite(recipeId));
      toast.info("Removed from favorites.");
    } else {
      dispatch(addFavorite(recipeId));
      toast.success("Added to favorites!");
    }
  };


  return (
    <Container id="RecipeList" sx={{ mt: 4, bgcolor: "#fff8e1", p: 3, borderRadius: 3 }}>
      <Typography variant="h4" color="warning" align="center" gutterBottom>
        Recipes
      </Typography>

      {recipes.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={3} key={recipe._id || recipe.id}>
              <Card
                sx={{
                  maxWidth: 360,
                  borderRadius: 3,
                  boxShadow: 3,
                  position: "relative", // 🟡 Needed for absolute positioning
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 6,
                  },
                }}
              >
                {/* ❤️ Heart Icon */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    zIndex: 1,
                  }}
                >
                  <IconButton
                    onClick={() => handleFavoriteToggle(recipe._id || recipe.id)}
                    title={isLoggedIn ? "Toggle Favorite" : "Please Login to save favorites"}
                  >
                   {favoriteIds.includes(recipe._id || recipe.id) ? (
                      <FavoriteIcon
                        sx={{
                          color: "red",
                          fontSize: 26,
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        sx={{
                          color: isLoggedIn ? "red" : "gray",
                          fontSize: 26,
                        }}
                      />
                    )} 
                    
                  </IconButton>
                </Box>

                {/* 📷 Recipe Image */}
                <Box sx={{  overflow: 'hidden',alignItems:"center",textAlign:"center"}}>
                <CardMedia
                  component="img"
                  image={
                    recipe.mainImage
                      ? `http://localhost:5000/uploads/${recipe.mainImage}`
                      : "https://www.motherskitchennepal.com/wp-content/uploads/2018/06/default-food.png"
                  }
                  alt={recipe.title}
                  sx={{ width: "90%",borderRadius: '50%', height: 200, objectFit: "contain",margin: "0 auto",padding:2 }}
                />
              </Box>

                {/* 📋 Recipe Details */}
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      fontSize: "1rem",
                      lineHeight: "1.2em",
                      minHeight: "2.4em",
                      maxHeight: "2.4em",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Category: {recipe.category || "N/A"} <br />
                    Difficulty: {recipe.difficulty || "N/A"}
                  </Typography>

                  {(recipe._id || recipe.id) ? (
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to={`/recipes/${recipe._id || recipe.id}`}
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      View Details
                    </Button>
                  ) : (
                    <Typography color="error" fontSize={12} mt={1}>
                      ⚠️ No ID found
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="40vh">
          <Typography variant="h6" color="textSecondary">
            No recipes found. Try a different cuisine or diet!
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default RecipeList;











// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRecipes } from "../slices/recipeSlice";

// function RecipeList({ selectedCuisine, selectedDiet }) {
//     const dispatch = useDispatch();
//     const recipes = useSelector((state) => state.recipes.filteredRecipes);
//     const loading = useSelector((state) => state.recipes.loadingRecipes);

//     useEffect(() => {
//         dispatch(fetchRecipes({ cuisine: selectedCuisine, diet: selectedDiet }));
//     }, [dispatch, selectedCuisine, selectedDiet]);

//     if (loading) return <p>Loading Recipes...</p>;

//     console.log("📜 Recipes Data:", recipes, "Type:", typeof recipes);
//     if (!Array.isArray(recipes)) {
//         console.error("❌ recipes is NOT an array:", recipes);
//         return <p>Error: Invalid data format.</p>;
//     }

//     return (
//         <div>
           
//             {recipes.map((recipe,index) => (
//                 <div key={recipe._id || index}>{recipe.title}</div>
//             ))}
//         </div>
//     );
// }
// export default RecipeList;









// import React, { useState, useEffect } from "react";
// import { Container, Typography, Card, CardMedia, CardContent, Button, CircularProgress, Box, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchRecipes } from "../slices/recipeSlice";

//   const RecipeList = () => {
//     const dispatch = useDispatch();

//     // Select required states from Redux store
//     const { filteredRecipes, loading, error } = useSelector((state) => state.recipes);

//     // Fetch recipes when the component mounts
//     useEffect(() => {
//       dispatch(fetchRecipes());
//     }, [dispatch]);

//   return (
//     <Container id="Recipes" sx={{ marginTop: 4, backgroundColor: "#fff8e1", padding: 3, borderRadius: 3 }}>
    
//       <Typography variant="h4" color="primary" align="center" gutterBottom>
//         Recipes
//       </Typography>

//       {/* Show loading spinner */}
//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
//           <CircularProgress color="primary" />
//         </Box>
//       ) : filteredRecipes.length > 0 ? (
//          // Display recipe cards
//         <Grid container spacing={3} justifyContent="center">
//           {filteredRecipes.map((recipe) => (
//             <Grid item xs={12} sm={6} md={4} key={recipe.id || recipe._id}>
//               <Card sx={{ maxWidth: 360, borderRadius: 3, boxShadow: 3 }}>
//                 <CardMedia
//                   component="img"
//                   image={recipe.mainImage ? `http://localhost:5000/uploads/${recipe.mainImage}` : "https://www.motherskitchennepal.com/wp-content/uploads/2018/06/default-food.png"}
//                   alt={recipe.title}
//                   sx={{ width: "100%", height: 200, objectFit: "cover" }}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" fontWeight="bold">{recipe.title}</Typography>
//                   <Typography variant="body2" color="textSecondary">Category: {recipe.category || "N/A"}</Typography>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     component={Link}
//                     to={`/recipes/${recipe.id || recipe._id}`}
//                     fullWidth
//                     sx={{ marginTop: 2 }}
//                   >
//                     View Details
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="40vh">
//           <Typography variant="h6" color="textSecondary">No recipes found. Try a different cuisine or diet!</Typography>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default RecipeList;











// // import React from "react";
// // import { Grid, Container, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";
// // import { Link } from "react-router-dom";

// // const RecipeList = ({ recipes, selectedCuisine, selectedDiet }) => {

// //   const filteredRecipes = recipes.filter((recipe) => {
// //     // Handle cuisine filtering
// //     const matchesCuisine = selectedCuisine === "all" || recipe.cuisine === selectedCuisine;

// //     // Handle dietary filtering
// //     const matchesDiet = selectedDiet === "all" || recipe.dietary === selectedDiet;

// //     // Filter recipes by both cuisine and diet if applicable
// //     return matchesCuisine && matchesDiet;
// //   });

// //   return (
// //     <Container id="Recipes" sx={{ marginTop: 4, backgroundColor: "#fff8e1", padding: 3, borderRadius: 3 }}>
// //       <Typography variant="h4" color="primary" align="center" gutterBottom>
// //         Recipes
// //       </Typography>

     
// //         <Grid container spacing={3} justifyContent="center">
// //           {(filteredRecipes || []).map((recipe) => (
// //             <Grid item xs={12} sm={6} md={4} key={recipe.id || recipe._id}>
// //               <Card sx={{ maxWidth: 360, borderRadius: 3, boxShadow: 3 }}>
// //                 <CardMedia
// //                   component="img"
// //                   image={recipe.mainImage ? `http://localhost:5000/uploads/${recipe.mainImage}` : "https://www.motherskitchennepal.com/wp-content/uploads/2018/06/default-food.png"}
// //                   alt={recipe.title}
// //                   sx={{ width: "100%", height: 200, objectFit: "cover" }}
// //                 />
// //                 <CardContent>
// //                   <Typography variant="h6" fontWeight="bold">{recipe.title}</Typography>
// //                   <Typography variant="body2" color="textSecondary">Category: {recipe.category || "N/A"}</Typography>
// //                   <Button
// //                     variant="contained" color="secondary"component={Link}
// //                     to={`/recipes/${recipe.id || recipe._id}`}
// //                     fullWidth sx={{ marginTop: 2 }}
// //                   >
// //                     View Details
// //                   </Button>
// //                 </CardContent>
// //               </Card>
// //             </Grid>
// //           ))}
// //         </Grid>
     
// //     </Container>
// //   );
// // };

// // export default RecipeList;










