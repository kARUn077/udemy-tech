// Lecture.jsx
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index }) => {
  const navigate = useNavigate();
  const goToUpdateLecture = () => {
    navigate(`${lecture._id}`);
  };
  
  return (
    <div className="flex items-center justify-between bg-[#F7F9FA] dark:bg-[#1F1F1F] px-4 py-3 rounded-md my-2 hover:bg-[#EDF2F7] dark:hover:bg-[#2D3748] transition-colors border border-[#E2E8F0] dark:border-[#2D3748]">
      <h1 className="font-medium text-[#2D3748] dark:text-[#E2E8F0]">
        <span className="text-[#537D5D] dark:text-[#6B8E71] font-bold">
          Lecture {index+1}:
        </span> {lecture.lectureTitle}
      </h1>
      <button 
        onClick={goToUpdateLecture}
        className="p-2 rounded-full hover:bg-[#E2E8F0] dark:hover:bg-[#2D3748] transition-colors"
        aria-label="Edit lecture"
      >
        <Edit
          size={18}
          className="text-[#537D5D] dark:text-[#6B8E71] hover:text-[#3A5A40] dark:hover:text-[#5A7D5D]"
        />
      </button>
    </div>
  );
};

export default Lecture;