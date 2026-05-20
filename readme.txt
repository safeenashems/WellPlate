npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
body call recipelist,recipelist calls cuisine carousel






// import { useState, useEffect } from "react";
// import { Box, TextField, CircularProgress, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import RecipeList from "../pages/RecipeList";
// import CuisineCarousel from "../pages/CuisineCarousel";
// import DietTypeSelector from "../pages/DietTypeSelector";

// function Body() {
//     const theme = useTheme();
    
//     const [data, setData] = useState([]); // Original API data
//     const [filteredRecipe, setFilteredRecipe] = useState([]); // Filtered recipes
//     const [searchText, setSearchText] = useState("");
//      const [selectedCuisine, setSelectedCuisine] = useState("all");
//     const [loading, setLoading] = useState(true);
//     const [selectedDiet, setSelectedDiet] = useState(null);
    
//     // ✅ Fetch recipes based on selected cuisine
//     useEffect(() => {
//         const fetchRecipes = async () => {
//             setLoading(true);
//             try {
//                 let url = "http://localhost:5000/api/cuisines";
//                 if (selectedCuisine !== "all") url += `/${selectedCuisine}`;

//                 const response = await fetch(url);
//                 const result = await response.json();
                
//               //  console.log("📌 API Response:", result);
                
//                 setData(result.recipes || []);
//                 setFilteredRecipe(result.recipes || []);
//             } catch (error) {
//                // console.error("❌ Error fetching recipes:", error);
//                 setData([]);
//                 setFilteredRecipe([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecipes();
//     }, [selectedCuisine]); // ✅ Fetch only when `selectedCuisine` changes

//     // ✅ Handle cuisine selection
//     const handleCuisineChange = (cuisine) => {
//         //console.log("🍽 Selected Cuisine:", cuisine);
//         setSelectedCuisine(cuisine);
//     };

//     // ✅ Handle diet type filtering
//     const handleDietChange = (diet) => {
//         setSelectedDiet(diet);
//         setFilteredRecipe(prevRecipes => prevRecipes.filter(recipe => recipe.dietary === diet));
//     };

//     // ✅ Handle search filtering
//     useEffect(() => {
//         if (!searchText) {
//             setFilteredRecipe(data);
//             return;
//         }

//         const searchedRecipes = data.filter(recipe =>
//             recipe.title.toLowerCase().includes(searchText.toLowerCase()) ||
//             recipe.category.toLowerCase().includes(searchText.toLowerCase()) ||
//             recipe.instructions.toLowerCase().includes(searchText.toLowerCase())
//         );

//       //  console.log("🔍 Search Results:", searchedRecipes);
//         setFilteredRecipe(searchedRecipes);
//     }, [searchText, data]); // ✅ Search when `searchText` or `data` changes

//     if (loading) {
//         return (
//             <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" sx={{ backgroundColor: theme.palette.background.default }}>
//                 <CircularProgress color="primary" />
//                 <Typography variant="body1" sx={{ marginTop: 2, color: theme.palette.text.primary }}>
//                     Loading ...
//                 </Typography>
//             </Box>
//         );
//     }

//    // console.log("📌 RecipeList Props:", filteredRecipe);

//     return (
//         <Box id="Body" p={2} sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
//             {/* Search Bar */}
//             <Box mb={2}>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     label="Search Recipes..."
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                     sx={{
//                         backgroundColor: theme.palette.background.paper,
//                         borderRadius: "8px",
//                         "& .MuiOutlinedInput-root": {
//                             "& fieldset": { borderColor: theme.palette.primary.main },
//                             "&:hover fieldset": { borderColor: theme.palette.secondary.main },
//                         },
//                     }}
//                 />
//             </Box>

//             {/* Cuisine Selection */}
//             <Box mb={2}>
//                 <CuisineCarousel selectedCuisine={selectedCuisine} onCuisineChange={setSelectedCuisine} />
               
//                 {selectedCuisine && (
//                 <DietTypeSelector
//                     selectedCuisine={selectedCuisine}
//                     onSelectDiet={setSelectedDiet}
//                 />
//                 )}
//                 </Box>

//             {/* Recipe List */}
//             {/* <RecipeList recipes={filteredRecipe} searchText={searchText} selectedCuisine={selectedCuisine} /> */}
//             <RecipeList selectedCuisine={selectedCuisine} />
//              </Box>
//     );
// }

// export default Body;