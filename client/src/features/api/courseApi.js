
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8000/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  tagTypes: ["Refetch_Creator_Course", "Refetch_Lecture", "CourseAccess"],
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
     prepareHeaders: (headers) => {
    // DO NOT manually set Content-Type for FormData
    return headers;
  },
  }),
  endpoints: (builder) => ({
    // Create new course
    createCourse: builder.mutation({
      query: ({ courseTitle, category }) => ({
        url: "",
        method: "POST",
        body: { courseTitle, category },
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    // Search courses
    getSearchCourse: builder.query({
      query: ({ searchQuery, categories, sortByPrice }) => {
        let queryString = `/search?query=${encodeURIComponent(searchQuery || "")}`;
        
        if (categories?.length > 0) {
          queryString += `&categories=${categories.map(encodeURIComponent).join(",")}`;
        }

        if (sortByPrice) {
          queryString += `&sortByPrice=${encodeURIComponent(sortByPrice)}`;
        }

        return {
          url: queryString,
          method: "GET",
        };
      },
    }),

    // Get published courses
    getPublishedCourse: builder.query({
      query: () => ({
        url: "/published-courses",
        method: "GET",
      }),
    }),

    // Get creator's courses
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_Creator_Course"],
    }),

    // Edit course
    editCourse: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Refetch_Creator_Course"],
    }),

    // Get course by ID
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),

    // Create lecture
    createLecture: builder.mutation({
  query: ({ courseId, body }) => ({
    url: `/${courseId}/lecture`,
    method: "POST",
    body,
    // formData: true, // 🚨 Required for multipart/form-data
  }),
}),


    // Get course lectures
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),

    // Edit lecture
    editLecture: builder.mutation({
      query: ({ lectureTitle, videoUrl, publicId, isPreviewFree, courseId, lectureId }) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body: { lectureTitle, videoUrl, publicId, isPreviewFree },
      }),
    }),

    // Remove lecture
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),

    // Get lecture by ID
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),

    // Publish/unpublish course
    publishCourse: builder.mutation({
      query: ({ courseId, query }) => ({
        url: `/${courseId}?publish=${query}`,
        method: "PATCH",
      }),
    }),

    // NEW: Get course access information
    getCourseAccess: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/access`,
        method: "GET",
      }),
      providesTags: ["CourseAccess"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetSearchCourseQuery,
  useGetPublishedCourseQuery,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery,
  usePublishCourseMutation,
  useGetCourseAccessQuery, // NEW: Export the access query hook
} = courseApi;