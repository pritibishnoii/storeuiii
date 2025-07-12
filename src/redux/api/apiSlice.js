import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constant";

// Custom baseQuery with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include", // This ensures cookies are sent with every request
  prepareHeaders: (headers) => {
    // Get token from localStorage as fallback
    const userInfo = localStorage.getItem("userInfo");
    // console.log("userinfo--->>", userInfo);
    if (userInfo) {
      try {
        const parsedUserInfo = JSON.parse(userInfo);
        if (parsedUserInfo.token) {
          headers.set("Authorization", `Bearer ${parsedUserInfo.token}`);
        }
      } catch (error) {
        console.warn("Failed to parse userInfo from localStorage:", error);
      }
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}),
});
