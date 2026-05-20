import React from "react";
import CuisineCarousel from "../CuisineCarousel"; 
import DietTypeSelector from "../DietTypeSelector";               
import RecipeList from "../RecipeList";           

const AllRecipes = () => {
  return (
   
    <div>
       <h1>all recipes</h1>
       <CuisineCarousel /> 
    <DietTypeSelector />  
      <RecipeList />
    </div>
  );
};

export default AllRecipes;
