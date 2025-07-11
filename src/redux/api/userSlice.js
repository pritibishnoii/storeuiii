import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constant";

// injectEndpoints ---> add another api url to existing url
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: { token: localStorage.getItem("token") }, // Send token in body
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    // for individual user profile update
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    //for  individual user details
    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // delete  by Admin
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: "DELETE",
      }),
    }),
    // for all user details
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ["User"],
      keepUnusedDataFor: 5,
    }),
    //  all of user profile update by Admin
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"], //
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

// http://localhost:5000/api/users ----> USERS_URL
// ` use${Login}Mutation `; // use+ endpoint name+mutation  --->useLoginMutation

// headers: {
//   'Content-Type': 'application/json',     // Data format
//   'Authorization': 'Bearer abc123',       // Authentication
//   'Accept': 'application/json',           // Response format
//   'User-Agent': 'Mozilla/5.0...',        // Browser info
//   'Cache-Control': 'no-cache',            // Caching behavior
// }

// invalidatesTags: ["User"],    // 👈 This tells RTK Query to "invalidate" any cached data tagged as 'User' update refetch
//providesTags: RTK Query में cache   invalidation के लिए tags define करता है[ "User" ]: Array   में    "User" tag है जो cache management के लिए use होता है
