

import { Routes, Route } from "react-router-dom";
import React, { useRef } from "react";
import Navbar from "./components/Navbar"; // Ensure the correct path
import Home from "./pages/Home";
import About from "./pages/About";
import Body from "./components/Body";
import RecipeDetails from "./pages/RecipeDetails";
import Footer from "./components/footer";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

// Admin Pages
import AdminOverview from "./pages/admin/OverviewPage-Admin";
import ManageRecipes from "./pages/admin/ManageRecipesPage";
import ManageUsers from "./pages/admin/ManageUsersPage";
//import ManageCategories from "./pages/admin/CategoriesPage";
import ManageCuisines from "./pages/admin/CuisinesPage";
import ManageDietTypes from "./pages/admin/DietTypesPage";
//user pages
import AllRecipes from "./pages/user/AllRecipes";
import Favourites from "./pages/user/FavouriteRecipes";
//import Recommended from "./pages/user/RecommendedRecipes";
//import HealthPreferences from "./pages/user/HealthPreferences";

//import UserDiseases from "./pages/user/UserDiseases";
// import UserDashboard from "./pages/user/UserDashboard";
// import viewRecipes from "./pages/user/favouriteRecipes";

import "./App.css";


function App() {
// for the gerecipes button in homepage(when useclicks scroll to cuisinecarousel)
const carouselRef = useRef(null);

const handleScrollToCarousel = () => {
    carouselRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Routes> 
                {/* Home Page with Navbar and Footer */}
           <Route path="/" element={
              <> 
               <Navbar /> 
               <Home onGetRecipesClick={handleScrollToCarousel}/>
               <About />
                <Body carouselRef={carouselRef} /> 
                
                <Footer/>  
              </> 
          }/>  
               
                {/* Other pages without Navbar/Footer */}  
                <Route path='/Recipes/:id' element={ <RecipeDetails /> } />  
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage  />} /> 
               
                 {/* Admin Layout with nested pages */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="recipes" element={<ManageRecipes />} />
        {/* <Route path="categories" element={<ManageCategories />} /> */}
        <Route path="cuisines" element={<ManageCuisines />} />
        <Route path="diet-types" element={<ManageDietTypes />} />
        <Route path="users" element={<ManageUsers />} />
      </Route>

      {/* User Layout with nested pages */}
      <Route path="/user" element={<UserLayout />}>
          <Route path="recipes" element={<AllRecipes/>} />
          <Route path="favourites" element={<Favourites />} />
          {/*<Route path="recommended" element={<Recommended />} />
          <Route path="health" element={<HealthPreferences />} />*/}
      </Route>
            
     </Routes>  
  );
}

export default App;










// import { Routes, Route } from "react-router-dom";
// import React, { useRef } from "react";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Body from "./components/Body";
// import RecipeDetails from "./pages/RecipeDetails";
// import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import Dashboard from "./components/Dashboard";

// //import MainLayout from "./layout/MainLayout";
// //import DashboardLayout from "./layout/DashboardLayout";

// function App() {
//   const carouselRef = useRef(null);

//   const handleScrollToCarousel = () => {
//     carouselRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <Routes>

//       {/* 🔹 Public routes with Navbar and Footer */}
//      {/* // <Route element={<MainLayout />}> */}
//         <Route path="/" element={
//           <>
//             <Home onGetRecipesClick={handleScrollToCarousel} />
//             <About />
//             <Body carouselRef={carouselRef} />
//           </>
//         } />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<RegisterPage />} />
//         <Route path="/recipes/:id" element={<RecipeDetails />} />
//       </Route>

//       {/* 🔹 Dashboard routes without Navbar/Footer */}
//       <Route element={<DashboardLayout />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         {/* Add more dashboard routes here if needed */}
//       </Route>

//     </Routes>
//   );
// }

// export default App;




