import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, useTheme } from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";
import logo from "/assets/wellPlate_logo.png";

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo and Brand Name */}
        <Box
          component={Link}
          smooth
          to="#Header"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img src={logo} alt="WellPlate Logo" style={{ height: 40, marginRight: 10 }} />
          <Typography variant="h6" fontWeight="bold">
            WellPlate
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box component="nav" sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} smooth to="#Home">
            Home
          </Button>
          <Button color="inherit" component={Link} smooth to="#About">
            About Us
          </Button>
          <Button color="inherit" component={Link} smooth to="#Recipes">
            Recipes
          </Button>
          <Button color="inherit" component={Link} smooth to="#Favorites">
            Favorites
          </Button>
          <Button color="inherit" component={Link} smooth to="#Footer">
            Contact Us
          </Button>
          <Button color="secondary" variant="contained" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;








// import React from "react";
// import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
// import { HashLink as Link } from "react-router-hash-link";  // Import HashLink
// import logo from "../assets/wellPlate_logo.png"; // Import the logo

// const Navbar = () => {
//   return (
//     <div className="navbar">
//     <AppBar position="static" color="primary">
//       <Toolbar>
//         {/* Logo and Brand Name */}
//         <Box
//           component={Link}
//           smooth
//           to="#Header"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             textDecoration: "none",
//             flexGrow: 1,
//           }}
//         >
//           <img src={logo} alt="WellPlate Logo" style={{ height: 40, marginRight: 10 }} />
//           <Typography variant="p" sx={{ color: "white", fontWeight: "bold" }}>
//             WellPlate
//           </Typography>
//         </Box>

//         {/* Navigation Links */}
//         {/* <Box>
//           <Button color="inherit" component={Link} smooth to="#Home">
//             Home
//           </Button>
//           <Button color="inherit" component={Link} smooth to="#About">
//             About
//           </Button>
//           <Button color="inherit" component={Link} smooth to="#Recipes">
//             Recipes
//           </Button>
//           <Button color="inherit" component={Link} smooth to="#Favorites">
//             Favorites
//           </Button>
//           <Button color="inherit" component={Link} to="/login">
//             Login
//           </Button>
//         </Box> */}
//             <ul>
//                     <li><a href="#Home">Home</a></li>
//                     <li><a href="#About">About Us</a></li>
//                     <li><a href="#recipes">Recipes</a></li>
//                     <li><a href="# favorites"> Favorites</a></li>
//                     <li><a href="#Footer">Contact Us</a></li>
//                     <li> <Link to="/login">Login</Link></li>
                  
                   
//                    </ul>
//       </Toolbar>
//     </AppBar>
//     </div>
//   );
// };

// export default Navbar;






























