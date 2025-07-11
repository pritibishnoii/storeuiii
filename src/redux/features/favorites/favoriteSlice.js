import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      //check if the product is not already favorites
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },

    removeFromFavorites: (state, action) => {
      // remove the Product with the matching id
      return state.filter((product) => product._id !== action.payload._id);
    },

    setFavorites: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFavorites, removeFromFavorites, setFavorites } =
  favoritesSlice.actions;
export const selectFavoritesProduct = (state) => state.favorites;
export default favoritesSlice.reducer;
