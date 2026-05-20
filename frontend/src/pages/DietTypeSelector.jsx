import React, { useEffect } from "react";
import { Button, Tooltip, Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchDiets, setDiet } from "../slices/recipeSlice";

const dietTooltips = {
    "Vegan": "No animal products, including dairy and eggs.",
    "Paleo": "Focuses on unprocessed, whole foods like meat, fish, and vegetables.",
    "Keto": "Low-carb, high-fat diet for ketosis.",
    "Diabetic-Friendly": "Balanced meals with controlled carbs and no added sugar.",
    "Low-Carb": "Restricts carbohydrates for weight management.",
    "Heart-Healthy": "Rich in fiber, lean proteins, and healthy fats.",
    "Gluten-Free": "Excludes wheat, barley, and rye.",
    "Nut-Free": "Avoids all types of nuts.",
    "Dairy-Free": "Excludes milk, cheese, and other dairy products.",
    "Vegetarian": "No meat, but allows dairy and eggs.",
    "Non-Vegetarian": "Includes all types of meats and seafood."
};

const DietTypeSelector = ({ selectedCuisine }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    
    // ✅ Get Redux state values
    const { diets, selectedDiet, loadingDiets } = useSelector((state) => state.recipes);

    // ✅ Fetch diets when selectedCuisine changes
    useEffect(() => {
        if (selectedCuisine) {
            dispatch(fetchDiets(selectedCuisine));  
        }
    }, [dispatch, selectedCuisine]);

    if (loadingDiets) {
        return <Typography sx={{ mt: 2, color: theme.palette.text.secondary }}>Loading Diets...</Typography>;
    }

    return (
        <Box sx={{ mt: 2, textAlign: "center" }}>
            {/* <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", color: theme.palette.text.primary }}>
                Select Diet Type
            </Typography> */}

            {diets.length > 0 ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
                    {diets.map((diet, index) => (
                        <Tooltip key={index} title={dietTooltips[diet] || "No description available"} arrow>
                            <Button
                                variant={selectedDiet === diet ? "contained" : "outlined"}
                                sx={{
                                    minWidth: "120px",
                                    fontWeight: "bold",
                                    borderWidth: "2px",
                                    borderColor: "#E3B93A", // ✅ Dark Yellow Border
                                    color: selectedDiet === diet ? "#000000" : theme.palette.text.primary, // ✅ Selected → Black Text, Default → Normal Text
                                    backgroundColor: selectedDiet === diet ? "#E3B93A" : "transparent", // ✅ Selected → Dark Yellow Background
                                    "&:hover": {
                                        backgroundColor: selectedDiet === diet ? "#D6A830" : theme.palette.action.hover,
                                    }
                                }}
                                onClick={() => dispatch(setDiet(diet))}
                            >
                                {diet}
                            </Button>
                        </Tooltip>
                    ))}
                </Box>
            ) : (
                <Typography sx={{ color: theme.palette.text.secondary }}>.</Typography>
            )}
        </Box>
    );
};

export default DietTypeSelector;













// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDiets } from "../slices/recipeSlice";

// function DietTypeSelector({ selectedCuisine, onSelectDiet }) {
//     const dispatch = useDispatch();
//     const diets = useSelector((state) => state.recipes.diets);
//     const loading = useSelector((state) => state.recipes.loadingDiets);

//     useEffect(() => {
//         dispatch(fetchDiets(selectedCuisine));  // Fetch diets for selected cuisine
//     }, [dispatch, selectedCuisine]);

//     if (loading) return <p>Loading Diets...</p>;

//     return (
//         <div>
//             {diets.map((diet) => (
//                 <button key={diet} onClick={() => onSelectDiet(diet)}>
//                     {diet}
//                 </button>
//             ))}
//         </div>
//     );
// }
// export default DietTypeSelector;













// import React, { useEffect, useState } from "react";
// import { Button, Tooltip, Box } from "@mui/material";
// import { setDiet } from "../slices/recipeSlice"; 
// import { useSelector, useDispatch } from "react-redux";


//     // ✅ Define tooltips for dietary types
// const dietTooltips = {
//     "Vegan": "No animal products, including dairy and eggs.",
//     "Paleo": "Focuses on unprocessed, whole foods like meat, fish, and vegetables.",
//     "Keto": "Low-carb, high-fat diet for ketosis.",
//     "Diabetic-Friendly": "Balanced meals with controlled carbs and no added sugar.",
//     "Low-Carb": "Restricts carbohydrates for weight management.",
//     "Heart-Healthy": "Rich in fiber, lean proteins, and healthy fats.",
//     "Gluten-Free": "Excludes wheat, barley, and rye.",
//     "Nut-Free": "Avoids all types of nuts.",
//     "Dairy-Free": "Excludes milk, cheese, and other dairy products.",
//     "Vegetarian": "No meat, but allows dairy and eggs.",
//     "Non-Vegetarian": "Includes all types of meats and seafood."
//   };

//   const DietTypeSelector = () => {
//     const dispatch = useDispatch();

//  // ✅ Use destructuring to get Redux state values
//  const { diets, selectedCuisine, selectedDiet } = useSelector((state) => state.recipes);
    
 
//  return (
           
//         <Box sx={{ mt: 2 }}>
//             <h2>Select Diet Type</h2>

//          {/* 🔴 Test if Tooltip Works
//             <Tooltip title="Test Tooltip" arrow  disableInteractive>
//                 <Button variant="contained" color="secondary">Test</Button>
//             </Tooltip> */}
// {diets.length > 0 && (
    
// <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, minHeight: "50px" }}>
//                 {dietTypes.map((diet,index) => (
//                    <Tooltip key={`${diet}-${index}`} title={dietTooltips[diet] } arrow>
//                    <Button
//                        variant="contained"
//                        color="secondary"
//                        onClick={() => dispatch(setDiet(diet))}
//                    >
//                        {diet}
//                    </Button>
//                </Tooltip>
//                 ))}
//             </Box>
// )}
//         </Box>
//     );
// };

// export default DietTypeSelector;
