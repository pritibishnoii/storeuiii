import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: (() => {
    try {
      const userInfo = localStorage.getItem("userInfo");
      return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
      console.warn("Failed to load userInfo from localStorage:", error);
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      // localStorage.clear();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
