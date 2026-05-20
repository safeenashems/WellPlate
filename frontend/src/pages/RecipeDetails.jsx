import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeById } from "../slices/recipeSlice";
import {
  Container,
  Typography,
  Card,
  Box,
  CardMedia,
  CardContent,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

const RecipeDetails = () => {
  const { id } = useParams();
  console.log("🔍 Recipe ID from URL:", id); 
  const dispatch = useDispatch();

  const { selectedRecipe, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !selectedRecipe) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        Recipe not found or failed to load.
      </Typography>
    );
  }

  const recipe = selectedRecipe;

  return (
    <Container sx={{ marginTop: 4, paddingBottom: 4 }}>
      <Card sx={{ maxWidth: 700, margin: "auto", boxShadow: 3, borderRadius: 3, padding: 2, backgroundColor: "#fff8e1" }}>
        <CardMedia
          component="img"
          image={recipe.mainImage ? `http://localhost:5000/uploads/${recipe.mainImage}` : "https://www.motherskitchennepal.com/wp-content/uploads/2018/06/default-food.png"}
          alt={recipe.title}
          sx={{ width: "100%", height: 250, objectFit: "contain", borderRadius: 2 }}
        />
        <CardContent>
          <Typography variant="h4" fontWeight="bold" color="primary">{recipe.title}</Typography>
          <Typography variant="body1"><strong>Category:</strong> {recipe.category}</Typography>
          <Typography variant="body1"><strong>Cuisine:</strong> {recipe.cuisine}</Typography>
          <Typography variant="body1"><strong>Difficulty:</strong> {recipe.difficulty}</Typography>
          <Typography variant="body1"><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</Typography>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>Ingredients:</Typography>
          <List sx={{ backgroundColor: "#fff", borderRadius: 2, p: 1 }}>
            {recipe.ingredients.map((ingredient, i) => (
              <ListItem key={i}>{ingredient.name}</ListItem>
            ))}
          </List>

          <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>Instructions:</Typography>
          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>{recipe.instructions}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default RecipeDetails;
