import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CuisinesPage = () => {
  const [cuisines, setCuisines] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newCuisineName, setNewCuisineName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const fetchCuisines = async () => {
    try {
      const res = await axios.get("/api/cuisines");
      setCuisines(res.data);
    } catch (err) {
      console.error("Failed to fetch cuisines", err);
    }
  };

  useEffect(() => {
    fetchCuisines();
  }, []);

  const handleAddCuisine = async () => {
    const formData = new FormData();
    formData.append("name", newCuisineName);
    if (imageFile) formData.append("image", imageFile);

    try {
      await axios.post("/api/cuisines", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOpenForm(false);
      setNewCuisineName("");
      setImageFile(null);
      fetchCuisines();
    } catch (err) {
      console.error("Error adding cuisine", err);
    }
  };

  const handleDeleteCuisine = async (id) => {
    if (!window.confirm("Are you sure you want to delete this cuisine?")) return;

    try {
      await axios.delete(`/api/cuisines/${id}`);
      fetchCuisines();
    } catch (err) {
      console.error("Error deleting cuisine", err);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">All Cuisines</Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Cuisine
        </Button>
      </Box>

      <Grid container spacing={3}>
        {cuisines.map((cuisine) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={cuisine._id}>
            <Card>
              {cuisine.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={cuisine.image}
                  alt={cuisine.name}
                />
              )}
              <CardContent>
                <Typography variant="h6">{cuisine.name}</Typography>
                <IconButton onClick={() => handleDeleteCuisine(cuisine._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add New Cuisine</DialogTitle>
        <DialogContent>
          <TextField
            label="Cuisine Name"
            fullWidth
            value={newCuisineName}
            onChange={(e) => setNewCuisineName(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Choose Image
            <input type="file" hidden onChange={(e) => setImageFile(e.target.files[0])} />
          </Button>
          {imageFile && <Typography mt={1}>{imageFile.name}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCuisine}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CuisinesPage;
