import React,{useState,useEffect} from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button
} from "@mui/material";
import {
  Dashboard,
  Restaurant,
  People,
  Category,
  BarChart,
  Logout
} from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import MenuIcon from '@mui/icons-material/Menu';



const menuItems = [
  { text: "Overview", icon: <Dashboard />, path: "/admin" },
  { text: "Recipes", icon: <Restaurant />, path: "/admin/recipes" },
  { text: "Users", icon: <People />, path: "/admin/users" },
  { text: "Categories", icon: <Category />, path: "/admin/categories" },
  { text: "Analytics", icon: <BarChart />, path: "/admin/analytics" }
];

const AdminLayout = () => {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedPath, setSelectedPath] = React.useState(location.pathname);
  const [drawerWidth, setDrawerWidth] = React.useState(240); // initial width

  // useEffect(() => {
  //   console.log("Drawer width:", drawerWidth); // Log drawer width
  //   console.log("Main content width:", open ? `calc(100% - ${drawerWidth}px)` : "100%"); // Log main content width calculation
  // }, [drawerWidth, open]); // Log when either drawerWidth or open changes

  
  const handleDrawerToggle = () => {
    setDrawerWidth(open ? 0 : 240); // Toggle drawer width
    setOpen(!open);
  };

  React.useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleItemClick = (path) => {
    setSelectedPath(path);
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme}>

      {/* parent box */}
      <Box sx={{ display: "flex",backgroundColor:"success.main" }}>
        <CssBaseline />

        {/* Top AppBar */}
        <AppBar
          position="fixed"
          sx={{
            height: 56, // Reduced height
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            zIndex: theme.zIndex.drawer + 1
          }}
          elevation={1}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "0 !important",
              height: "56px !important", // exact height of AppBar
              px: 2
            }}
          >
            {/* Left section - Toggle + Logo + Name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => setOpen(!open)}
                sx={{ color: theme.palette.text.primary, minWidth: "auto", mr: 5 }}
              >
                <MenuIcon />
              </Button>
              <img
                src="../assets/wellPlate_logo.png"
                alt="App Logo"
                style={{ width: 32, height: 32 }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ color: "black" }}
              >
                WellPlate
              </Typography>
            </Box>

            {/* Right section - Role and Name */}
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 500
              }}
            >
              {user?.role.toUpperCase()} | {user?.name}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          variant="persistent"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            transition: "all 0.3s ease", // Added smooth transition
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.background.default,
              mt: 7 // Pushes below AppBar
            }
          }}
        >
          <Box>
            <Divider />
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  key={item.text}
                  onClick={() => handleItemClick(item.path)}
                  selected={selectedPath === item.path}
                  sx={{
                    backgroundColor:
                      selectedPath === item.path
                        ? theme.palette.primary.light
                        : "inherit",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    mx: 1,
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.light
                    },
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light
                    }
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Spacer to add empty space between menus and logout */}
          <Box sx={{ flexGrow: 1 }} />

          <Box p={2} mb={8}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.secondary
              }}
            >
              Logout
            </Button>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: 7, // Offset the AppBar height
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            // ml: open ? `${drawerWidth}px` : 0, // Adjust marginLeft instead of width
            
            transition: "width 0.3s ease" 
          }}
        >
           <Box sx={{ width: "100%"}}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AdminLayout;
