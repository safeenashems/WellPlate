import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, fetchRecipeById, updateRecipe, deleteRecipe, addRecipe } from "../../slices/recipeSlice.jsx";
import { useNavigate } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, TextField, Box, FormControl, Select, MenuItem, InputLabel, Checkbox, ListItemText } from "@mui/material";

const ManageRecipes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { filteredRecipes, allIngredients } = useSelector((state) => state.recipes);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editRecipeData, setEditRecipeData] = useState(null);
  const [deleteRecipeTitle, setDeleteRecipeTitle] = useState("");
  const [deleteRecipeId, setDeleteRecipeId] = useState("");

  const [ingredient, setIngredient] = useState("");
  const [confirmationText, setConfirmationText] = useState("");

  useEffect(() => {
    dispatch(fetchRecipes({}));
  }, [dispatch]);

  // const handleView = (id) => {
  //   dispatch(fetchRecipeById(id));
  // };

  const handleEdit = (recipe) => {
    setEditRecipeData({ ...recipe });
    setOpenEditDialog(true);
  };

 
  const handleDeleteOpen = (id, title) => {
    setDeleteRecipeId(id);
    setDeleteRecipeTitle(title);
    setConfirmationText("");
    setOpenDeleteDialog(true);
  };
  
  // const handleDeleteConfirm = (id) => {
  //   const recipe = filteredRecipes.find((r) => r._id === id);
  //   if (!recipe) {
  //     alert("Recipe not found.");
  //     return;
  //   }
  //   if (deleteRecipeTitle === recipe.title) {
  //     dispatch(deleteRecipe(id));
  //     setOpenDeleteDialog(false); // Close dialog after delete
  //   } else {
  //     alert("Recipe title does not match. Deletion canceled.");
  //   }
  // };
  const handleDeleteConfirm = () => {
    if (confirmationText.trim() !== deleteRecipeTitle) {
      alert("Recipe title does not match. Deletion canceled.");
      return;
    }
    dispatch(deleteRecipe(deleteRecipeId));
    setOpenDeleteDialog(false);
  };
  
 
  

  // const handleDeleteConfirm = (id) => {
  //   if (deleteRecipeTitle === filteredRecipes.find((r) => r._id === id).title) {
  //     dispatch(deleteRecipe(id));
  //     setOpenDeleteDialog(false);
  //   } else {
  //     alert("Recipe title does not match. Deletion canceled.");
  //   }
  // };

  const handleAddRecipe = () => {
    setEditRecipeData({
      title: "",
      category: "Breakfast",
      cuisine: "Indian",
      difficulty: "Easy",
      cookingTime: 0,
      servings: 1,
      ingredients: [],
      instructions: "",
      dietary: [],
      mainImage: "",
      video: "",
    });
    setOpenEditDialog(true);
  };

  // const handleEditSubmit = () => {
  //   if (!editRecipeData._id) {
  //     console.error("Recipe ID is missing");
  //     return; // Prevent dispatch if ID is missing
  //   }
  //   dispatch(updateRecipe({ id: editRecipeData._id, updatedData: editRecipeData }));
  //   setOpenEditDialog(false);
  // };
  const handleEditSubmit = () => {
    if (!editRecipeData._id) {
      console.error("Recipe ID is missing");
      return;
    }
    const updatedData = {
      ...editRecipeData,
      ingredients: editRecipeData.ingredients.map((ing) => ing.name),
    };
    console.log("✅ Final data sent to backend:", updatedData);
    dispatch(updateRecipe({ id: editRecipeData._id, updatedData }));
    setOpenEditDialog(false);
  };
  
  const handleAddRecipeSubmit = () => {
    dispatch(addRecipe(editRecipeData));
    setOpenEditDialog(false);
  };

 



  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Button variant="contained" color="secondary" onClick={handleAddRecipe}  className="mb-4">
          Add Recipe
        </Button>
      </div>

      <TableContainer component={Paper}  sx={{ marginTop: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Cuisine</TableCell>
              <TableCell>Cooking Time</TableCell>
              <TableCell>Servings</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecipes.map((recipe) => (
              <TableRow key={recipe._id}>
                <TableCell>{recipe.title}</TableCell>
                <TableCell>{recipe.category}</TableCell>
                <TableCell>{recipe.cuisine}</TableCell>
                <TableCell>{recipe.cookingTime} mins</TableCell>
                <TableCell>{recipe.servings}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ margin: 1 }}
                      onClick={() => handleEdit(recipe)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      sx={{ margin: 1 }}
                      onClick={() => handleDeleteOpen(recipe._id, recipe.title)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Recipe Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>{editRecipeData ? "Edit Recipe" : "Add Recipe"}</DialogTitle>
        <DialogContent>
          {editRecipeData && (
            <Box component="form">
              <TextField
                fullWidth
                label="Title"
                value={editRecipeData.title}
                onChange={(e) => setEditRecipeData({ ...editRecipeData, title: e.target.value })}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={editRecipeData.category}
                  onChange={(e) => setEditRecipeData({ ...editRecipeData, category: e.target.value })}
                >
                  <MenuItem value="Breakfast">Breakfast</MenuItem>
                  <MenuItem value="Lunch">Lunch</MenuItem>
                  <MenuItem value="Dinner">Dinner</MenuItem>
                  <MenuItem value="Snacks">Snacks</MenuItem>
                  <MenuItem value="Desserts">Desserts</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Cuisine</InputLabel>
                <Select
                  value={editRecipeData.cuisine}
                  onChange={(e) => setEditRecipeData({ ...editRecipeData, cuisine: e.target.value })}
                >
                  <MenuItem value="Indian">Indian</MenuItem>
                  <MenuItem value="Italian">Italian</MenuItem>
                  <MenuItem value="Chinese">Chinese</MenuItem>
                  <MenuItem value="Mexican">Mexican</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                  <MenuItem value="Mediterranean">Mediterranean</MenuItem>
                  <MenuItem value="Middle Eastern">Middle Eastern</MenuItem>
                  <MenuItem value="Japanese">Japanese</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Difficulty</InputLabel>
                <Select
                  value={editRecipeData.difficulty}
                  onChange={(e) => setEditRecipeData({ ...editRecipeData, difficulty: e.target.value })}
                >
                  <MenuItem value="Easy">Easy</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Hard">Hard</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Cooking Time (mins)"
                type="number"
                value={editRecipeData.cookingTime}
                onChange={(e) => setEditRecipeData({ ...editRecipeData, cookingTime: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Servings"
                type="number"
                value={editRecipeData.servings}
                onChange={(e) => setEditRecipeData({ ...editRecipeData, servings: e.target.value })}
                margin="normal"
              />

              {/* Ingredients Section */}
              {/* <TextField
                fullWidth
                label="Ingredient"
                value={editRecipeData.ingredients}
                onChange={(e) => setEditRecipeData({ ...editRecipeData, ingredients: e.target.value })}
                margin="normal"
              />
               */}

<TextField
  fullWidth
  label="Ingredients"
  value={
    editRecipeData.ingredients && editRecipeData.ingredients.length > 0
      ? editRecipeData.ingredients.map(ingredient => ingredient.name).join(", ") // Access 'name' property and join as a string
      : ""
  }
  onChange={(e) => {
    setEditRecipeData({
      ...editRecipeData,
      ingredients: e.target.value
        .split(",") // Split the input string by commas
        .map((ingredient) => ingredient.trim()) // Trim extra spaces
        .map((ingredientName) => ({ name: ingredientName })) // Convert each ingredient into an object with a 'name' field
    });
  }}
  margin="normal"
/>



              {/* <Box mt={2}>
                <strong>Ingredients:</strong>
                <ul>
                  {getIngredientNames().split(", ").map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </Box> */}

              {/* Instructions Section */}
              <TextField
                fullWidth
                label="Instructions"
                value={editRecipeData.instructions}
                onChange={(e) => setEditRecipeData({ ...editRecipeData, instructions: e.target.value })}
                margin="normal"
                multiline
                rows={4}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Dietary Preferences</InputLabel>
                <Select
                  multiple
                  value={editRecipeData.dietary}
                  onChange={(e) => setEditRecipeData({ ...editRecipeData, dietary: e.target.value })}
                  renderValue={(selected) => selected.join(", ")}
                >
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Paleo">Paleo</MenuItem>
                  <MenuItem value="Keto">Keto</MenuItem>
                  <MenuItem value="Diabetic-Friendly">Diabetic-Friendly</MenuItem>
                  <MenuItem value="Low-Carb">Low-Carb</MenuItem>
                  <MenuItem value="Heart-Healthy">Heart-Healthy</MenuItem>
                  <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
                  <MenuItem value="Nut-Free">Nut-Free</MenuItem>
                  <MenuItem value="Dairy-Free">Dairy-Free</MenuItem>
                  <MenuItem value="Halal">Halal</MenuItem>
                  <MenuItem value="Kosher">Kosher</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          {editRecipeData?._id ? (
            <Button onClick={handleEditSubmit} color="primary">
              Save
            </Button>
          ) : (
            <Button onClick={handleAddRecipeSubmit} color="primary">
              Add
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Recipe Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To confirm, please type the recipe title: <strong>{deleteRecipeTitle}</strong> in the field below:
          </DialogContentText>
          <TextField
            fullWidth
            label="Type Recipe Title to Confirm"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteConfirm(deleteRecipeTitle)} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageRecipes;
