import { Box, TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, setSearchText, resetFilters } from "../slices/recipeSlice";
import CuisineCarousel from "../pages/CuisineCarousel";
import DietTypeSelector from "../pages/DietTypeSelector";
import RecipeList from "../pages/RecipeList";

function Body({ carouselRef }) {
   // console.log("🔄 Body Component Re-rendered");

    const theme = useTheme();
    const dispatch = useDispatch();
    const selectedCuisine = useSelector((state) => state.recipes.selectedCuisine);
    const selectedDiet = useSelector((state) => state.recipes.selectedDiet);

    // Local state for search input
    const [searchInput, setSearchInput] = useState("");

    // Function to handle search on button click
    const handleSearch = () => {
        const trimmedSearch = searchInput.trim();
        console.log("🔍 Search triggered with:", trimmedSearch);
    
        dispatch(resetFilters()); // Reset cuisine & diet filters
        dispatch(setSearchText(trimmedSearch)); // Update search text in Redux
    
        // Prepare request payload
        const requestPayload = trimmedSearch 
            ? { search: trimmedSearch }  // Search only when there’s input
            : { cuisine: "all", diet: "all" }; // Default fetch when empty
    
        console.log("🚀 Sending API Request with:", requestPayload);
        dispatch(fetchRecipes(requestPayload)); 
    };
    

    return (
        <Box id="Body" p={2} sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
            <Box mb={2} sx={{ display: "flex", gap: 1, justifyContent: "center"  }}>
                <TextField
                     sx={{
                        width: { xs: "80%", sm: "60%", md: "50%", lg: "40%" }, // Responsive width
                        borderRadius: "24px", // Rounded input field
                        "& fieldset": {
                            borderRadius: "24px", // Apply rounding to the border
                            borderColor: "green !important", // Always green border
                        }
                    }}
                    variant="outlined"
                    label="Search Recipes..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} // Update local state
                />
                <Button variant="contained" color="primary"
                 sx={{
                    borderRadius: "24px", // Same rounded border as input
                   padding: "8px 20px", // Adjust padding for better fit
                    backgroundColor: theme.palette.primary.main, // Green button
                   // "&:hover": { backgroundColor:  theme.palette.success.main } // Darker green on hover
                }} onClick={handleSearch}>

                    Search
                </Button>
            </Box>
            <div ref={carouselRef}>
            <CuisineCarousel />
            </div>
            {selectedCuisine && <DietTypeSelector selectedCuisine={selectedCuisine} />}
            <RecipeList selectedCuisine={selectedCuisine} selectedDiet={selectedDiet} />
        </Box>
    );
}

export default Body;













// import { Box, TextField } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import CuisineCarousel from "../pages/CuisineCarousel";
// import DietTypeSelector from "../pages/DietTypeSelector";
// import RecipeList from "../pages/RecipeList";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchText } from "../slices/recipeSlice";

// function Body() {
//     console.log("🔄 Body Component Re-rendered");

//     const theme = useTheme();
//     const dispatch = useDispatch();
//     const searchText = useSelector((state) => state.recipes.searchText);
//     const selectedCuisine = useSelector((state) => state.recipes.selectedCuisine);
//     const selectedDiet = useSelector((state) => state.recipes.selectedDiet);

//     return (
//         <Box id="Body" p={2} sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
//             <Box mb={2}>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     label="Search Recipes..."
//                     value={searchText}
//                     onChange={(e) => dispatch(setSearchText(e.target.value))}
//                 />
//             </Box> 

//             <CuisineCarousel />
//             {selectedCuisine && <DietTypeSelector selectedCuisine={selectedCuisine} />}
//             <RecipeList selectedCuisine={selectedCuisine} selectedDiet={selectedDiet} />
//         </Box>
//     );
// }

// export default Body;












// import { useState, useEffect, useCallback } from "react";
// import { Box, TextField, CircularProgress, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import RecipeList from "../pages/RecipeList";
// import CuisineCarousel from "../pages/CuisineCarousel";
// import DietTypeSelector from "../pages/DietTypeSelector";
// import { useDispatch, useSelector } from "react-redux";
// import { setSearchText, fetchRecipes, setCuisine, setDiet, resetFilters } from "../slices/recipeSlice"; 
// import { useRef } from "react";
// function Body() {
//     const renderCount = useRef(0);
//     renderCount.current += 1;
//     console.log(`🔄 Body Component Re-rendered: ${renderCount.current} times`);
    
//     const theme = useTheme();
//     const dispatch = useDispatch();

//     const reduxState = useSelector((state) => state.recipes);
//     useEffect(() => {
//         console.log("🛠 Redux State Updated:", reduxState);
//     }, [reduxState]);
    
//    // const { searchText, searchResults, allRecipes, filteredRecipes, cuisines, diets, selectedCuisine, selectedDiet, loading } = useSelector((state) => state.recipes);
//     // ✅ Select only required properties from Redux
//     const searchText = useSelector((state) => state.recipes.searchText);
//     const searchResults = useSelector((state) => state.recipes.searchResults);
//     const allRecipes = useSelector((state) => state.recipes.allRecipes);
//     const filteredRecipes = useSelector((state) => state.recipes.filteredRecipes);
//     const cuisines = useSelector((state) => state.recipes.cuisines);
//     const selectedCuisine = useSelector((state) => state.recipes.selectedCuisine);
//     const selectedDiet = useSelector((state) => state.recipes.selectedDiet);
//     const loading = useSelector((state) => state.recipes.loading);


//     // ✅ Prevent multiple fetch calls
//     const [fetched, setFetched] = useState(false);

//     // ✅ Fetch recipes only ONCE
//     useEffect(() => {
//         if (!loading && allRecipes.length === 0 && !fetched) {
//             console.log("📢 Dispatching fetchRecipes.");
//             dispatch(fetchRecipes());
//             setFetched(true);
//         }
//     }, [dispatch, loading, fetched]);  // ✅ Added `fetched` to dependencies

//     // ✅ Log API response
//     useEffect(() => {
//         if (allRecipes.length) {
//             console.log("✅ Recipes Fetched:", allRecipes);
//         }
//     }, [allRecipes]);

//     // ✅ Handle cuisine selection
//     const handleCuisineChange = (cuisine) => {
//         console.log("🍽️ Selected Cuisine:", cuisine);
//         dispatch(setCuisine(cuisine));
//     };

//     // ✅ Handle diet selection
//     const handleDietChange = (diet) => {
//         console.log("🥗 Selected Diet:", diet);
//         dispatch(setDiet(diet));
//     };

//     // ✅ Handle search (Only filters when Enter is pressed)
//     const handleSearchChange = useCallback((e) => {
//         if (e.key === "Enter") {  
//             console.log("🔍 Searching for:", e.target.value);
//             dispatch(setSearchText(e.target.value));

//             if (selectedCuisine !== "all" || selectedDiet !== null) { 
//                 dispatch(resetFilters());  
//             }
//         }
//     }, [dispatch, selectedCuisine, selectedDiet]);

//     // ✅ Determine what to display
//     const recipesToDisplay = searchText ? searchResults : filteredRecipes;
//     console.log("📜 Recipes to Display:", recipesToDisplay);

//     // ✅ Show loading state
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

//     return (
//         <Box id="Body" p={2} sx={{ backgroundColor: theme.palette.background.default, minHeight: "100vh" }}>
          
//             {/* Search Bar */}
//             <Box mb={2}>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     label="Search Recipes..."
//                     value={searchText}
//                     onChange={(e) => dispatch(setSearchText(e.target.value))}  // ✅ Live update searchText
//                     onKeyDown={handleSearchChange}  // ✅ Filters only on Enter key press
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
//                 <CuisineCarousel selectedCuisine={selectedCuisine} onCuisineChange={handleCuisineChange} cuisines={cuisines} />
//                 {selectedCuisine && (
//                     <DietTypeSelector selectedCuisine={selectedCuisine} onSelectDiet={handleDietChange} />
//                 )}
//             </Box>

//             {/* Recipe List */}
//             <RecipeList recipes={recipesToDisplay} selectedCuisine={selectedCuisine} selectedDiet={selectedDiet} />
//         </Box>
//     );
// }

// export default Body;





