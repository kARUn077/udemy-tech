// SearchResult.jsx
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E2E8F0] dark:border-[#2D3748] py-6 gap-4 hover:bg-[#F8F9FA] dark:hover:bg-[#1A1A2E] transition-colors px-4 rounded-lg">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto group"
      >
        <div className="relative overflow-hidden rounded-lg w-full md:w-56 h-32">
          <img
            src={course.courseThumbnail}
            alt="course-thumbnail"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00000080] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl text-[#2D3748] dark:text-[#E2E8F0] group-hover:text-[#537D5D] dark:group-hover:text-[#6B8E71] transition-colors">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
            {course.subTitle}
          </p>
          <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
            Instructor: <span className="font-semibold">{course.creator?.name}</span>
          </p>
          <Badge 
            variant="outline" 
            className="w-fit mt-2 md:mt-0 border-[#537D5D] text-[#537D5D] dark:border-[#6B8E71] dark:text-[#6B8E71]"
          >
            {course.courseLevel}
          </Badge>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-[#537D5D] dark:text-[#6B8E71]">
          ₹{course.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;