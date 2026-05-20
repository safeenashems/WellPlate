import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Fetch all cuisines
export const fetchCuisines = createAsyncThunk(
    "recipes/fetchCuisines",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/cuisines");
          //  console.log("✅ API Response (Cuisines):", response.data);  
            return response.data;
        } catch (error) {
            console.error("❌ Fetch Cuisines Failed:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Unknown Error");
        }
    }
);

// ✅ Fetch dietary options based on selected cuisine
export const fetchDiets = createAsyncThunk(
    "recipes/fetchDiets",
    async (cuisine, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cuisines/${cuisine}/dietary`);
          //  console.log("✅ API Response (Diets):", response.data);
            return response.data;
        } catch (error) {
           console.error("❌ Fetch Diets Failed:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Unknown Error");
        }
    }
);

// ✅ Fetch recipes with cuisine & diet filtering
export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async ({ cuisine, diet,search }, { rejectWithValue }) => {
        try {
          //  console.log(`🚀 Fetching recipes for Cuisine: ${cuisine}, Diet: ${diet}, Search: ${search}`);

            const queryParams = new URLSearchParams();
            if (cuisine && cuisine !== "all") queryParams.append("cuisine", cuisine);
            if (diet && diet !== "all") queryParams.append("dietary", diet);

            if (search) queryParams.append("search", search); // ✅ Include search query
            const response = await axios.get(`http://localhost:5000/api/recipes?${queryParams.toString()}`);

            console.log("✅ API Response (Recipes):", response.data.recipes);
            return response.data.recipes;
        } catch (error) {
            console.error("❌ Fetch Recipes Failed:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Unknown Error");
        }
    }
);

//fetch recipe by id(for view details button,edit button)

export const fetchRecipeById = createAsyncThunk(
    "recipes/fetchRecipeById",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        return response.data.recipe;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
 
  // ✅ Add a new recipe - admin
export const addRecipe = createAsyncThunk(
  "recipes/addRecipe",
  async (newRecipeData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.post(
        "http://localhost:5000/api/recipes",
        newRecipeData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with the token
          },
        }
      );
      return response.data.newRecipe; // Assuming your backend returns the added recipe
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error adding recipe");
    }
  }
);

// Delete a recipe - admin
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.delete(`http://localhost:5000/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Authorization header with the token
        },
      });
      return id; // Return just the ID for Redux to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error deleting recipe");
    }
  }
);

 // Update a recipe - admin(for save button after edit)
export const updateRecipe = createAsyncThunk(
  "recipes/updateRecipe",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      console.log("🔧 ID being sent:", id);
     // console.log("🔧 Ingredients being sent:", editRecipeData.ingredients);
      console.log("🔧 Data being sent:", updatedData);
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const response = await axios.put(
        `http://localhost:5000/api/recipes/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header with the token
          },
        }
      );
      return response.data.updatedRecipe; // Assuming your backend returns updated recipe
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating recipe");
    }
  }
);
 
 

  // Async thunk to fetch dashboard summary
  export const fetchDashboardSummary = createAsyncThunk(
    "recipes/fetchDashboardSummary",
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem("token"); // Or wherever you store it
  
        const response = await axios.get("http://localhost:5000/api/admin/dashboard-summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
      }
    }
  );
  
  
const recipeSlice = createSlice({
    name: "recipes",
    initialState: {
        dashboardSummary: {},
        cuisines: [],
        diets: [],
        filteredRecipes: [],
        selectedCuisine: "all",
        selectedDiet: null,
        searchText: "",
        selectedRecipe: null,
        loadingCuisines: false,
        loadingDiets: false,
        loadingRecipes: false,
        error: null,
    },
    reducers: {
        setCuisine: (state, action) => {
            state.selectedCuisine = action.payload;
            state.selectedDiet = null;  // ✅ Reset dietary selection when cuisine changes
            state.diets = [];  // ✅ Clear dietary options when cuisine changes
        },
        setDiet: (state, action) => {
            state.selectedDiet = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        resetFilters: (state) => {
            state.selectedCuisine = "all";
            state.selectedDiet = null;
            state.searchText = "";
            state.diets = [];  // ✅ Reset dietary options
        },
        setSelectedRecipe: (state, action) => {
            state.selectedRecipe = action.payload;
        },
        
    },
    extraReducers: (builder) => {
        builder
            // ✅ Handle Cuisines Fetching
            .addCase(fetchCuisines.pending, (state) => {
                state.loadingCuisines = true;
                state.error = null;
            })
            .addCase(fetchCuisines.fulfilled, (state, action) => {
             //   console.log("✅ Fetched Cuisines:", action.payload);
                state.loadingCuisines = false;
                state.cuisines = action.payload;
            })
            .addCase(fetchCuisines.rejected, (state, action) => {
                console.error("❌ Fetch Cuisines Failed:", action.payload);
                state.loadingCuisines = false;
                state.error = action.payload;
            })

            // ✅ Handle Diets Fetching
            .addCase(fetchDiets.pending, (state) => {
                state.loadingDiets = true;
                state.error = null;
            })
            .addCase(fetchDiets.fulfilled, (state, action) => {
             //   console.log("✅ Fetched Diets:", action.payload);
                state.loadingDiets = false;
                state.diets = action.payload;
            })
            .addCase(fetchDiets.rejected, (state, action) => {
                console.error("❌ Fetch Diets Failed:", action.payload);
                state.loadingDiets = false;
                state.error = action.payload;
            })

            // ✅ Handle Recipes Fetching
            .addCase(fetchRecipes.pending, (state) => {
              //  console.log("🕐 Fetching recipes...");
                state.loadingRecipes = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
              //  console.log("✅ Recipes fetched:", action.payload); 
                state.loadingRecipes = false;
                state.filteredRecipes = action.payload;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                console.error("❌ Fetch Recipes Failed:", action.payload);
                state.loadingRecipes = false;
                state.error = action.payload;
            })
            .addCase(fetchRecipeById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRecipe = action.payload;
            })

            // ✅ Add a recipe
              .addCase(addRecipe.fulfilled, (state, action) => {
                state.filteredRecipes.push(action.payload); // Add the new recipe to the list
            })
            .addCase(addRecipe.rejected, (state, action) => {
                state.error = action.payload;
            })

            // ✅ Delete recipe
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.filteredRecipes = state.filteredRecipes.filter(recipe => recipe._id !== action.payload);
            })
            .addCase(deleteRecipe.rejected, (state, action) => {
                state.error = action.payload;
            })
            
            // ✅ Update recipe
            .addCase(updateRecipe.fulfilled, (state, action) => {
                const index = state.filteredRecipes.findIndex(recipe => recipe._id === action.payload._id);
                if (index !== -1) {
                state.filteredRecipes[index] = action.payload;
                }
            })
            .addCase(updateRecipe.rejected, (state, action) => {
                state.error = action.payload;
            })

            //fetch dashboard summary
            .addCase(fetchDashboardSummary.pending, (state) => {
                state.loadingRecipes = true;
                state.error = null;
              })
              .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
                state.loadingRecipes = false;
                state.dashboardSummary = action.payload;
              })
              .addCase(fetchDashboardSummary.rejected, (state, action) => {
                state.loadingRecipes = false;
                state.error = action.payload;
              });
  
    },
});

export const { setSearchText, setCuisine, setDiet, resetFilters, setSelectedRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;








// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Separate API calls for different data
// export const fetchCuisines = createAsyncThunk(
//     "recipes/fetchCuisines",
//     async (_, { rejectWithValue }) => {
//         try {

//             const response = await axios.get("http://localhost:5000/api/cuisines");

//             console.log("✅ API Response (Cuisines):", response.data);  

//             return response.data;  // ✅ Axios automatically parses JSON
//         } catch (error) {
//             console.error("❌ Fetch Cuisines Failed:", error.response?.data || error.message);
//             return rejectWithValue(error.response?.data || "Unknown Error");
//         }
//     }
// );


// export const fetchDiets = createAsyncThunk("recipes/fetchDiets", async (cuisine) => {
//     const response = await axios.get(`http://localhost:5000/api/cuisines/${cuisine}/dietary`);
//     return response.data;
// });

// export const fetchRecipes = createAsyncThunk(
//     "recipes/fetchRecipes",
//     async ({ cuisine, diet }) => {
//         console.log(`🚀 Fetching recipes for Cuisine: ${cuisine}, Diet: ${diet}`);

//         const queryParams = new URLSearchParams();
//         if (cuisine && cuisine !== "all") queryParams.append("cuisine", cuisine);
//         if (diet && diet !== "all") queryParams.append("dietary", diet);

//         const response = await axios.get(`http://localhost:5000/api/recipes?${queryParams.toString()}`);

//         console.log("✅ API Response:", response.data.recipe);
//         return response.data.recipe;
//     }
// );



// const recipeSlice = createSlice({
//     name: "recipes",
//     initialState: {
//         cuisines: [],
//         diets: [],
//         filteredRecipes: [],
//         searchText: "",
//         loadingCuisines: false,
//         loadingDiets: false,
//         loadingRecipes: false,
//     },
//     reducers: {
//         setCuisine: (state, action) => {
//             state.selectedCuisine = action.payload;
//         },
//         setDiet: (state, action) => {
//             state.selectedDiet = action.payload;
//         },
//         setSearchText: (state, action) => {
//             state.searchText = action.payload;
//         },
//         resetFilters: (state) => {
//             state.selectedCuisine = "all";
//             state.selectedDiet = null;
//             state.searchText = "";
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchCuisines.pending, (state) => {
//                 state.loadingCuisines = true;
//             })
//             .addCase(fetchCuisines.fulfilled, (state, action) => {
//                 console.log("✅ Fetched Cuisines:", action.payload); // ✅ Debugging log
//                 state.loadingCuisines = false;
//                 state.cuisines = action.payload;
//             })
//             .addCase(fetchDiets.pending, (state) => {
//                 state.loadingDiets = true;
//             })
//             .addCase(fetchDiets.fulfilled, (state, action) => {
//                 state.loadingDiets = false;
//                 state.diets = action.payload;
//             })
//             .addCase(fetchRecipes.pending, (state) => {
//                 state.loadingRecipes = true;
//             })
//             .addCase(fetchRecipes.fulfilled, (state, action) => {
//                 state.loadingRecipes = false;
//                 state.filteredRecipes = action.payload;
//             })
//             .addCase(fetchCuisines.rejected, (state, action) => {
//                 console.error("❌ Fetch Error:", action.payload);
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

// export const { setSearchText,  setCuisine, setDiet, resetFilters } = recipeSlice.actions;
// export default recipeSlice.reducer;









