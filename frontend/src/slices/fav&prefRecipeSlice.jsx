import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavorites = createAsyncThunk("favorites/fetchFavorites", async () => {
  const res = await axios.get("/api/favorites", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.data.favorites.map((recipe) => recipe._id);
});

export const addFavorite = createAsyncThunk("favorites/addFavorite", async (recipeId) => {
  await axios.post(`/api/favorites/${recipeId}`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return recipeId;
});

export const removeFavorite = createAsyncThunk("favorites/removeFavorite", async (recipeId) => {
  await axios.delete(`/api/favorites/${recipeId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return recipeId;
});

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteIds: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoriteIds = action.payload;
        state.loading = false;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.favoriteIds.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload);
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default favoriteSlice.reducer;
