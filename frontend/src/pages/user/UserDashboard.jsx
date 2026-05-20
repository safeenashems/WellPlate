// import React, { useState } from "react";
// import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";

// import PreferredRecipes from "./favouriteRecipes";
// import AllRecipes from "./AllRecipes";
// import FavouriteRecipes from "./FavouriteRecipes";

// const UserDashboard = () => {
//   const [view, setView] = useState("preferred"); // 'preferred' | 'all' | 'favourites'
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = (selectedView) => {
//     setAnchorEl(null);
//     if (selectedView) setView(selectedView);
//   };

//   return (
//     <Box>
//       {/* Header Section */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Typography variant="h5">
//           {view === "preferred" && "🍲 Recipes Just for You"}
//           {view === "all" && "🌍 Explore All Recipes"}
//           {view === "favourites" && "❤️ Your Favourite Recipes"}
//         </Typography>

//         {/* Filter Button */}
//         <Box>
//           <Button
//             variant="outlined"
//             onClick={handleMenuOpen}
//             sx={{ textTransform: "none" }}
//           >
//             Filter
//           </Button>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleMenuClose()}>
//             <MenuItem onClick={() => handleMenuClose("preferred")}>
//               Preferred Recipes
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("all")}>
//               All Recipes
//             </MenuItem>
//             <MenuItem onClick={() => handleMenuClose("favourites")}>
//               Favourites
//             </MenuItem>
//           </Menu>
//         </Box>
//       </Box>

//       {/* Content */}
//       {view === "preferred" && <PreferredRecipes />}
//       {view === "all" && <AllRecipes />}
//       {view === "favourites" && <FavouriteRecipes />}
//     </Box>
//   );
// };

// export default UserDashboard;
