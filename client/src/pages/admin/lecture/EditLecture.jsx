// EditLecture.jsx
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <Button 
              size="icon" 
              variant="outline" 
              className="rounded-full border-[#537D5D] text-[#537D5D] dark:border-[#6B8E71] dark:text-[#6B8E71] hover:bg-[#F0F7F4] dark:hover:bg-[#2D3748]"
            >
              <ArrowLeft size={16} />
            </Button>
          </Link>
          <h1 className="font-bold text-2xl text-[#2D3748] dark:text-[#E2E8F0]">
            Update Lecture
          </h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;