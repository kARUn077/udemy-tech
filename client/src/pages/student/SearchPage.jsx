// SearchPage.jsx
import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="my-6 flex flex-col gap-2">
        <Link to="/" className="flex items-center gap-2 text-[#537D5D] dark:text-[#6B8E71] w-fit">
          <ArrowLeft size={18} />
          <span>Back to courses</span>
        </Link>
        <h1 className="font-bold text-2xl md:text-3xl text-[#2D3748] dark:text-[#E2E8F0]">
          Search results for "{query}"
        </h1>
        <p className="text-[#4A5568] dark:text-[#A0AEC0]">
          Found {data?.courses?.length || 0} courses matching your search
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <Filter handleFilterChange={handleFilterChange} />
        </div>
        
        <div className="flex-1">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <CourseSkeleton key={idx} />
            ))
          ) : isEmpty ? (
            <CourseNotFound query={query} />
          ) : (
            <div className="space-y-4">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CourseNotFound = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] bg-[#F8F9FA] dark:bg-[#1A1A2E] p-8 rounded-lg text-center">
      <AlertCircle className="text-[#537D5D] dark:text-[#6B8E71] h-16 w-16 mb-4" />
      <h1 className="font-bold text-2xl md:text-3xl text-[#2D3748] dark:text-[#E2E8F0] mb-2">
        No courses found for "{query}"
      </h1>
      <p className="text-lg text-[#4A5568] dark:text-[#A0AEC0] mb-6 max-w-md">
        Try adjusting your search or filter to find what you're looking for.
      </p>
      <Link to="/courses">
        <Button className="bg-[#537D5D] hover:bg-[#3A5A40] dark:bg-[#6B8E71] dark:hover:bg-[#5A7D5D]">
          Browse All Courses
        </Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 border-b border-[#E2E8F0] dark:border-[#2D3748] py-6 px-4">
      <Skeleton className="h-32 w-full md:w-56 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-20 mt-2" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  );
};

export default SearchPage;