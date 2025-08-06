// Courses.jsx
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();

  if(isError) return (
    <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 p-6 rounded-lg max-w-7xl mx-auto text-center">
      <h1>Some error occurred while fetching courses.</h1>
    </div>
  )

  return (
    <div className="bg-[#F8F9FA] dark:bg-[#1A1A2E] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-bold text-3xl text-center text-[#2D3748] dark:text-[#E2E8F0] mb-10">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
            data?.courses && data.courses.map((course, index) => (
              <Course key={index} course={course}/>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-[#16213E] rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Skeleton className="w-full h-40 bg-[#E2E8F0] dark:bg-[#2D3748]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-[#E2E8F0] dark:bg-[#2D3748]" />
        <Skeleton className="h-4 w-full bg-[#E2E8F0] dark:bg-[#2D3748]" />
        <Skeleton className="h-4 w-1/2 bg-[#E2E8F0] dark:bg-[#2D3748]" />
      </div>
    </div>
  );
};

export default Courses;