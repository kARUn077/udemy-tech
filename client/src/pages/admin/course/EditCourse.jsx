import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl text-[#1B4332] dark:text-[#E2E8F0]">
          Add detail information regarding course
        </h1>
        <Link to="lecture">
          <Button 
            className="hover:text-[#537D5D] dark:hover:text-[#D8F3DC]" 
            variant="link"
          >
            Go to lectures page
          </Button>
        </Link>
      </div>
      <CourseTab/>
    </div>
  );
};

export default EditCourse;