// MyLearning.jsx
import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { Skeleton } from "@/components/ui/skeleton";

const MyLearning = () => { 
  const {data, isLoading} = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="font-bold text-2xl md:text-3xl text-[#2D3748] dark:text-[#E2E8F0] mb-2">
        MY LEARNING
      </h1>
      <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-8">
        {myLearning.length} enrolled courses
      </p>
      
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="bg-white dark:bg-[#16213E] rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium text-[#2D3748] dark:text-[#E2E8F0] mb-2">
              No courses enrolled yet
            </h2>
            <p className="text-[#4A5568] dark:text-[#A0AEC0] mb-4">
              Start learning by enrolling in courses from our catalog
            </p>
            <a 
              href="/courses" 
              className="inline-block bg-[#537D5D] hover:bg-[#3A5A40] text-white px-6 py-2 rounded-md"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {myLearning.map((course, index) => (
              <Course key={index} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="bg-white dark:bg-[#16213E] rounded-lg overflow-hidden shadow-sm">
        <Skeleton className="w-full h-40 bg-[#E2E8F0] dark:bg-[#2D3748]" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4 bg-[#E2E8F0] dark:bg-[#2D3748]" />
          <Skeleton className="h-4 w-full bg-[#E2E8F0] dark:bg-[#2D3748]" />
          <Skeleton className="h-4 w-1/2 bg-[#E2E8F0] dark:bg-[#2D3748]" />
        </div>
      </div>
    ))}
  </div>
);

export default MyLearning;