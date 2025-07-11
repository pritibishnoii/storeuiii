import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constant";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });
// console.log("apiSlice-->>", baseQuery);

export const apiSlice = createApi({
  baseQuery,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userInfo?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  reducerPath: "api",
  tagTypes: ["Product", "Order", "User", "Category"],
  endpoints: () => ({}), // empty obj
});

// console.log("apiSlice---", apiSlice);
