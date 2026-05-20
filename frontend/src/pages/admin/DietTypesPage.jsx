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
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DietTypesPage = () => {
  const [dietTypes, setDietTypes] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [newDietTypeName, setNewDietTypeName] = useState("");

  const fetchDietTypes = async () => {
    try {
      const res = await axios.get("/api/diet-types");
      setDietTypes(res.data);
    } catch (err) {
      console.error("Failed to fetch diet types", err);
    }
  };

  useEffect(() => {
    fetchDietTypes();
  }, []);

  const handleAddDietType = async () => {
    try {
      await axios.post("/api/diet-types", { name: newDietTypeName });
      setOpenForm(false);
      setNewDietTypeName("");
      fetchDietTypes();
    } catch (err) {
      console.error("Error adding diet type", err);
    }
  };

  const handleDeleteDietType = async (id) => {
    if (!window.confirm("Are you sure you want to delete this diet type?")) return;

    try {
      await axios.delete(`/api/diet-types/${id}`);
      fetchDietTypes();
    } catch (err) {
      console.error("Error deleting diet type", err);
    }
  };

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h5">All Diet Types</Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Diet Type
        </Button>
      </Box>

      <Grid container spacing={3}>
        {dietTypes.map((type) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={type._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{type.name}</Typography>
                <IconButton onClick={() => handleDeleteDietType(type._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add New Diet Type</DialogTitle>
        <DialogContent>
          <TextField
            label="Diet Type Name"
            fullWidth
            value={newDietTypeName}
            onChange={(e) => setNewDietTypeName(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddDietType}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DietTypesPage;