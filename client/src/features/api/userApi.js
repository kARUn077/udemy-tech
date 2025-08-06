// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const userApi = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:8000/api/v1/user/",
//     credentials: "include"
//   }),
//   tagTypes: ["InstructorDashboard"],
//   endpoints: (builder) => ({
//     getInstructorDashboard: builder.query({
//       query: () => "instructor/dashboard",
//       providesTags: ["InstructorDashboard"]
//     }),
//   })
// });

// export const { useGetInstructorDashboardQuery } = userApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    credentials: "include"
  }),
  tagTypes: ["InstructorDashboard"],
  endpoints: (builder) => ({
    getInstructorDashboard: builder.query({
      query: () => "instructor/dashboard",
      providesTags: ["InstructorDashboard"]
    }),
  })
});

export const { useGetInstructorDashboardQuery } = userApi;
