import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import { Box, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchCuisines,setCuisine} from "../slices/recipeSlice"; // Redux actions

const CuisineCarousel = ({ recipeRef }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  // ✅ Fetch cuisines from Redux store
  const { cuisines, selectedCuisine, loadingCuisines } = useSelector((state) => state.recipes);

  // Sample images for cuisines (You can update these with real URLs)
  const cuisineImageArray = [
        "https://rolandfoods.com/assets/news/GettyImages-1227198304.jpg",
        "https://cbx-prod.b-cdn.net/COLOURBOX36473881.jpg?width=800&height=800&quality=70",
        "https://assets.epicurious.com/photos/624d9590857fa7e509238b59/3:2/w_6948,h_4632,c_limit/RegionalChinese_HERO_033122_31320.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3xHeazHuC_nZPxa6DfzVaouuigLyZ-TvoHQ&s",
        "https://www.foodandwine.com/thmb/5y241b3tPLTCO8KHunVOMw7evBI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201104-HD-hot-nicoise-salad-094d96d207e2424181064571ff4fbc7d.jpg",
        "https://c7.alamy.com/comp/TR8MY8/traditional-italian-food-mediterranean-cuisine-top-view-flat-lay-TR8MY8.jpg",
        "https://theculinarytravelguide.com/wp-content/uploads/2019/03/Depositphotos_55682347_l-2015.jpg",
        "https://i.ndtvimg.com/i/2016-04/japanese-food-625_625x406_81461928658.jpg",
      ];

  // Carousel settings
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed:1500, // Decrease this for faster auto-sliding
    speed: 800,
    slidesToShow: Math.min(cuisines.length, 7),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1048, settings: { slidesToShow: Math.min(cuisines.length, 6) } },
      { breakpoint: 960, settings: { slidesToShow: Math.min(cuisines.length, 5) } },
      { breakpoint: 600, settings: { slidesToShow: Math.min(cuisines.length, 4) } },
      { breakpoint: 480, settings: { slidesToShow: Math.min(cuisines.length, 3) } },
    ],
  };

  // Fetch cuisines on mount
  React.useEffect(() => {
    dispatch(fetchCuisines());  
  }, [dispatch]);

  if (loadingCuisines) return <Typography>Loading cuisines...</Typography>;

  return (
    <Box id="Recipes" sx={{ width: "100%", textAlign: "center", py: 1, bgcolor: theme.palette.background.default }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: theme.palette.text.primary }}>
       Cuisines
      </Typography>

      <Slider {...settings}>
        {cuisines.map((cuisine, index) => (
          <Box
            key={index}
            onClick={() => dispatch(setCuisine(cuisine))} // ✅ Update Redux
            sx={{
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",

              padding: "10px",
              width: "250px",
              mx: "auto",
              transition: "transform 0.3s",
            //   border: selectedCuisine === cuisine 
            //     ? `3px solid ${theme.palette.secondary.main}` // ✅ Border when selected
            //     : "3px solid transparent",  // ✅ Default transparent border to prevent layout shift
   
              "&:hover": { transform: "scale(1.1)" }, // Smooth hover effect
            border:"none",
            outline: "none", // ✅ Remove focus outline
            "&:focus": { outline: "none" }, // ✅ Prevent focus-based border
            }}
          >
            {/* Cuisine Image */}
            <img
              src={cuisineImageArray[index] || "https://dummyimage.com/150x150"} // Fallback image
              alt={cuisine}
              style={{
                width: "150px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                display: "block",
                margin: "0 auto",
              //  boxShadow: selectedCuisine === cuisine ? `0px 0px 20px 5px ${theme.palette.primary.main}` : "none",
             
            }}
            />

            {/* Cuisine Name */}
            <Typography sx={{ marginTop: "8px", fontWeight: "bold", color: selectedCuisine === cuisine
                                    ? "#D32F2F" // ✅ Highlight selected text in **Red**
                                    : theme.palette.text.primary, // Default text color
                                    transition: "color 0.3s ease",
                                }}
                            >
              {cuisine}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default CuisineCarousel;











// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCuisines } from "../slices/recipeSlice";

// function CuisineCarousel({ selectedCuisine, onCuisineChange }) {
//     const dispatch = useDispatch();
//     const cuisines = useSelector((state) => state.recipes.cuisines);
//     const loading = useSelector((state) => state.recipes.loadingCuisines);

//     useEffect(() => {
//         dispatch(fetchCuisines());  // Fetch only cuisines
//     }, [dispatch]);

//     if (loading) return <p>Loading Cuisines...</p>;

//     return (
//         <div>
//             {cuisines.map((cuisine) => (
//                 <button key={cuisine} onClick={() => onCuisineChange(cuisine)}>
//                     {cuisine}
//                 </button>
//             ))}
//         </div>
//     );
// }
// export default CuisineCarousel;














// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import React from "react";
// import Slider from "react-slick";
// import { Box, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
//  import { setCuisine } from "../slices/recipeSlice";

// const CuisineCarousel = () => {
//   const theme = useTheme();
//   const dispatch = useDispatch();

  
//     // ✅ Get cuisines from Redux
//     const { cuisines, selectedCuisine } = useSelector((state) => state.recipes);

//   const cuisineImageArray = [
//     "https://rolandfoods.com/assets/news/GettyImages-1227198304.jpg",
//     "https://cbx-prod.b-cdn.net/COLOURBOX36473881.jpg?width=800&height=800&quality=70",
//     "https://assets.epicurious.com/photos/624d9590857fa7e509238b59/3:2/w_6948,h_4632,c_limit/RegionalChinese_HERO_033122_31320.jpg",
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3xHeazHuC_nZPxa6DfzVaouuigLyZ-TvoHQ&s",
//     "https://www.foodandwine.com/thmb/5y241b3tPLTCO8KHunVOMw7evBI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/201104-HD-hot-nicoise-salad-094d96d207e2424181064571ff4fbc7d.jpg",
//     "https://c7.alamy.com/comp/TR8MY8/traditional-italian-food-mediterranean-cuisine-top-view-flat-lay-TR8MY8.jpg",
//     "https://theculinarytravelguide.com/wp-content/uploads/2019/03/Depositphotos_55682347_l-2015.jpg",
//     "https://i.ndtvimg.com/i/2016-04/japanese-food-625_625x406_81461928658.jpg",
//   ];
//   const settings = {
//     infinite: true,
//     autoplay: true,
//     speed: 500,
//     slidesToShow: Math.min(cuisines.length, 7),
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1048, settings: { slidesToShow: Math.min(cuisines.length, 7) } },
//       { breakpoint: 960, settings: { slidesToShow: Math.min(cuisines.length, 6) } },
//       { breakpoint: 600, settings: { slidesToShow: Math.min(cuisines.length, 5) } },
//       { breakpoint: 480, settings: { slidesToShow: Math.min(cuisines.length, 3) } },
//     ],
//   };

//   return (
//     <Box sx={{ width: "100%", textAlign: "center", py: 3, bgcolor: theme.palette.background.default }}>
//     <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: theme.palette.text.primary }}>
//         Select Cuisine
//     </Typography>
  
//     <Slider {...settings}>
//       {cuisines.map((cuisine, index) => (
//         <Box 
//           key={index} 
//           onClick={() =>  dispatch(setSelectedCuisine(cuisine))} // ✅ Update Redux
//           sx={{
//             textAlign: "center",  cursor: "pointer",display: "flex",flexDirection: "column",alignItems: "center",
//             justifyContent: "center", borderRadius: "10px",  padding: "10px", width: "150px",  mx: "auto"
//           }} 
//         >
//           {/* Centered Image */}
//           <img 
//             src={cuisineImageArray[index] || "https://dummyimage.com/150x150"} 
//             alt={cuisine}
//             style={{ 
//               width: "120px",  height: "120px", objectFit: "cover", borderRadius: "10px",
//               display: "block", // Ensures no inline spacing issues
//                margin: "0 auto", // Centers the image inside the box
//             }} 
//           />
  
//           {/* Cuisine Name */}
//           <Typography sx={{ marginTop: "8px", fontWeight: "bold" }}>
//             {cuisine}
//           </Typography>
//         </Box>
//       ))}
//     </Slider>
//   </Box>
  
//   );
// };

// export default CuisineCarousel;













// import { useState, useEffect,useMemo } from "react";
// import { Box, CircularProgress, Typography } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import RecipeList from "../pages/RecipeList";
// import CuisineCarousel from "../pages/CuisineCarousel";
// import DietTypeSelector from "../pages/DietTypeSelector";

// function Body() {
//     const theme = useTheme();

//     const [data, setData] = useState([]); // Store all fetched recipes
//     const [filteredRecipe, setFilteredRecipe] = useState([]); // Filtered recipes
//     const [loading, setLoading] = useState(true);
//     const [selectedCuisine, setSelectedCuisine] = useState("all");
//     const [selectedDiet, setSelectedDiet] = useState(null);

//     // Fetch recipes initially only once when the component mounts
//     useEffect(() => {
//         const fetchRecipes = async () => {
//             setLoading(true);
//             try {
//                 const response = await fetch("http://localhost:5000/api/cuisines");
//                 const result = await response.json();
//                 setData(result.recipes || []);
//                 setFilteredRecipe(result.recipes || []);
//             } catch (error) {
//                 console.error("Error fetching recipes:", error);
//                 setData([]);
//                 setFilteredRecipe([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecipes();
//         console.log("useEffect triggered");
//     }, []); // Empty dependency array ensures it runs only once

//     // Handle cuisine selection
//     const handleCuisineChange = (cuisine) => {
//       if (cuisine !== selectedCuisine) {
//         setSelectedCuisine(cuisine);
//     }
        
//     };

//     // Handle diet selection change
//     const handleDietChange = (diet) => {
//       if (diet !== selectedDiet) {
//         setSelectedDiet(diet);
//     }};

//     // Use useMemo to avoid unnecessary recalculations of filtered recipes
//     const filterRecipes = useMemo(()  => {
//         let filtered = [...data];

//         // Filter by cuisine
//         if (selectedCuisine !== "all") {
//             filtered = filtered.filter((recipe) => recipe.cuisine === selectedCuisine);

//         // Filter by diet
//         if (selectedDiet) {
//             filtered = filtered.filter((recipe) =>
//                 Array.isArray(recipe.dietary) && recipe.dietary.includes(selectedDiet)
//             );
//         }}

//         return filtered;
//     },[selectedCuisine, selectedDiet,data]); // length is added to render only when a new recipe added/removed

//     // Loading state
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
//             {/* Cuisine Selection */}
//             <Box mb={2}>
//                  <CuisineCarousel selectedCuisine={selectedCuisine} onCuisineChange={handleCuisineChange} />
//                 <DietTypeSelector onSelectDiet={handleDietChange} /> 
//             </Box>

//             {/* Recipe List */}
//             <RecipeList selectedCuisine={selectedCuisine} selectedDiet={selectedDiet} recipes={filteredRecipe} />
//         </Box>
//     );
// }

// export default Body;







