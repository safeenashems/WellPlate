// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Select,
//   MenuItem,
//   Checkbox,
//   ListItemText,
//   InputLabel,
//   FormControl,
//   OutlinedInput,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const UserDiseases = () => {
//   const [diseases, setDiseases] = useState([]);
//   const [ingredients, setIngredients] = useState([]);

//   const [openForm, setOpenForm] = useState(false);
//   const [diseaseName, setDiseaseName] = useState("");
//   const [avoidIngredients, setAvoidIngredients] = useState([]);
//   const [includeIngredients, setIncludeIngredients] = useState([]);

//   const fetchData = async () => {
//     try {
//       const [diseaseRes, ingredientRes] = await Promise.all([
//         axios.get("/api/diseases"),
//         axios.get("/api/ingredients"),
//       ]);
//       setDiseases(diseaseRes.data);
//       setIngredients(ingredientRes.data);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const resetForm = () => {
//     setDiseaseName("");
//     setAvoidIngredients([]);
//     setIncludeIngredients([]);
//   };

//   const handleSave = async () => {
//     try {
//       await axios.post("/api/diseases", {
//         diseaseName,
//         avoidIngredients,
//         includeIngredients,
//       });
//       fetchData();
//       resetForm();
//       setOpenForm(false);
//     } catch (error) {
//       console.error("Error saving disease", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/diseases/${id}`);
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting disease", error);
//     }
//   };

//   return (
//     <Box p={4}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//         <Typography variant="h5">Manage Diseases</Typography>
//         <Button variant="contained" onClick={() => setOpenForm(true)}>
//           Add New Disease
//         </Button>
//       </Box>

//       <Grid container spacing={3}>
//         {diseases.map((disease) => (
//           <Grid item xs={12} sm={6} md={4} key={disease._id}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h6">{disease.diseaseName}</Typography>
//                 <Typography variant="body2" mt={1}>
//                   Avoid:{" "}
//                   {ingredients
//                     .filter((ing) => disease.avoidIngredients.includes(ing._id))
//                     .map((i) => i.name)
//                     .join(", ")}
//                 </Typography>
//                 <Typography variant="body2" mt={1}>
//                   Include:{" "}
//                   {ingredients
//                     .filter((ing) => disease.includeIngredients.includes(ing._id))
//                     .map((i) => i.name)
//                     .join(", ")}
//                 </Typography>
//                 <IconButton onClick={() => handleDelete(disease._id)} color="error">
//                   <DeleteIcon />
//                 </IconButton>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       <Dialog open={openForm} onClose={() => setOpenForm(false)}>
//         <DialogTitle>Add New Disease</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Disease Name"
//             fullWidth
//             value={diseaseName}
//             onChange={(e) => setDiseaseName(e.target.value)}
//             sx={{ mt: 2 }}
//           />

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Avoid Ingredients</InputLabel>
//             <Select
//               multiple
//               value={avoidIngredients}
//               onChange={(e) => setAvoidIngredients(e.target.value)}
//               input={<OutlinedInput label="Avoid Ingredients" />}
//               renderValue={(selected) =>
//                 ingredients.filter((i) => selected.includes(i._id)).map((i) => i.name).join(", ")
//               }
//             >
//               {ingredients.map((ing) => (
//                 <MenuItem key={ing._id} value={ing._id}>
//                   <Checkbox checked={avoidIngredients.includes(ing._id)} />
//                   <ListItemText primary={ing.name} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Include Ingredients</InputLabel>
//             <Select
//               multiple
//               value={includeIngredients}
//               onChange={(e) => setIncludeIngredients(e.target.value)}
//               input={<OutlinedInput label="Include Ingredients" />}
//               renderValue={(selected) =>
//                 ingredients.filter((i) => selected.includes(i._id)).map((i) => i.name).join(", ")
//               }
//             >
//               {ingredients.map((ing) => (
//                 <MenuItem key={ing._id} value={ing._id}>
//                   <Checkbox checked={includeIngredients.includes(ing._id)} />
//                   <ListItemText primary={ing.name} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => { setOpenForm(false); resetForm(); }}>Cancel</Button>
//           <Button variant="contained" onClick={handleSave}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default UserDiseases;
