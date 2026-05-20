import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  TextField,
  Divider,
  Button
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import MenuIcon from '@mui/icons-material/Menu';

import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const drawerWidth = 240;

const menuItems = [
  { text: "All Recipes", path: "recipes", icon: <RestaurantMenuIcon /> },
  { text: "Favourites", path: "favourites", icon: <FavoriteIcon /> },
  { text: "Recommended", path: "recommended", icon: <StarIcon /> },
  { text: "Health Preferences", path: "health", icon: <LocalHospitalIcon /> },
];

const UserLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(true); // sidebar toggle

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleNavigate = (path) => {
    navigate(`/user/${path}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* Top Bar */}
        <AppBar position="fixed" sx={{ zIndex: 1201, backgroundColor: theme.palette.background.paper, boxShadow: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            {/* Left section - Toggle + Logo + Name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => setOpen(!open)}
                sx={{ color: theme.palette.text.primary, minWidth: "auto", mr: 3 }}
              >
                <MenuIcon />
              </Button>
              <img
                src="../assets/wellPlate_logo.png"
                alt="App Logo"
                style={{ width: 32, height: 32, marginRight: 8 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: theme.palette.text.primary }}
              >
                WellPlate
              </Typography>
            </Box>

            <TextField
              placeholder="Search recipes..."
              size="small"
              sx={{ width: "40%" }}
            />

            <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
              Welcome, {user?.name || "User"}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              mt: 8,
              backgroundColor: theme.palette.background.default,
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => handleNavigate(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider />

          <Box sx={{ p: 2, position: "absolute", bottom: 70, width: "100%" }}>
            <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Right Side Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${open ? drawerWidth : 0}px)`,
            p: 3,
            mt: 8,
            // ml: open ? `${drawerWidth}px` : 0,
            transition: "margin 0.3s ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserLayout;






// import React from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
//   CssBaseline,
//   Drawer,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   TextField,
//   Divider,
//   Button
// } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "../theme";
// import MenuIcon from '@mui/icons-material/Menu';

// const drawerWidth = 240;

// const menuItems = [
  
//   { text: "View Recipes", path: "recipes" },
//   { text: "Favourites", path: "favourites" },
//   { text: "Health Preferences", path: "health" },
// ];

// const UserLayout = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   const handleNavigate = (path) => {
//     navigate(`/UserLayout/${path}`);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* Top Bar */}
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           {/* Left section - Toggle + Logo + Name */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Button
//                 onClick={() => setOpen(!open)}
//                 sx={{ color: theme.palette.text.primary, minWidth: "auto", mr: 5 }}
//               >
//                 <MenuIcon />
//               </Button>
//               <img
//                 src="../assets/wellPlate_logo.png"
//                 alt="App Logo"
//                 style={{ width: 32, height: 32 }}
//               />
//               <Typography
//                 variant="h6"
//                 fontWeight="bold"
//                 sx={{ color: "black" }}
//               >
//                 WellPlate
//               </Typography>
//             </Box>


//           <TextField
//             placeholder="Search recipes..."
//             size="small"
//             sx={{ width: "40%" }}
//           />

//           <Typography variant="body1">
//             Welcome, {user?.name || "User"}
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: drawerWidth,
//           [`& .MuiDrawer-paper`]: {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             mt: 8,
//           },
//         }}
//       >
//         <List>
//           {menuItems.map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton onClick={() => handleNavigate(item.path)}>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>

//         <Divider />

//         <Box sx={{ p: 2, position: "absolute", bottom: 20, width: "100%" }}>
//           <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
//             Logout
//           </Button>
//         </Box>
//       </Drawer>

//       {/* Right Side Content */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: `${drawerWidth}px` }}>
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };

// export default UserLayout;