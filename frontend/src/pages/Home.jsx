import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = ({ onGetRecipesClick }) => {
  return (
    <Box
      id="Home"
      sx={{
        backgroundColor: "#8EAD5F",
        color: "#fff",
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      <Typography variant="h3" fontWeight="bold">
        Welcome to WellPlate
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Your Smart Recipe Generator for Healthier Meals
      </Typography>

      {/* Get Recipes Button */}
      <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={onGetRecipesClick}
          sx={{ marginTop: 3 }} // Recipelist section has id="RecipeList"
        >
          Get Recipes
        </Button>
      </Box>
    </Box>
  );
};

export default Home;












// import React from "react";
// import { Box, Container, Typography, Button, Card, CardContent } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     // <div id="home">
//     // <Box sx={{ backgroundColor: "#FFF5E1", minHeight: "100vh", paddingBottom: 4 }}>
//     //   {/* Hero Section */}
//       <Box id="Home"
//         sx={{
//           backgroundColor: "#8EAD5F",
//           color: "#fff",
//           textAlign: "center",
//           padding: "80px 20px",
//         }}
//       >
//         <Typography variant="h3" fontWeight="bold">
//           Welcome to WellPlate
//         </Typography>
//         <Typography variant="h6" sx={{ marginTop: 2 }}>
//           Your Smart Recipe Generator for Healthier Meals
//         </Typography>
//         <Button
//           variant="contained"
//           color="secondary"
//           component={Link}
//           to="#Recipes"
//           sx={{ marginTop: 3 }}
//         >
//           Explore Recipes
//         </Button>
//       </Box>

     
//     // </Box>
//     // {/* </div> */}
//   );
// };

// export default Home;
