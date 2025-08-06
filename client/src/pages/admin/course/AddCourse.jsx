import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  useEffect(() => {
    if(isSuccess){
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
    if(error){
      toast.error(error.data?.message || "Failed to create course");
    }
  },[isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl text-[#1B4332] dark:text-[#E2E8F0]">
          Lets add course, add some basic course details for your new course
        </h1>
        <p className="text-sm text-[#3A5A40] dark:text-[#A0AEC0]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Title</Label>
          <Input
            type="text"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Your Course Name"
            className="border-[#D8F3DC] dark:border-[#2D3748]"
          />
        </div>
        <div>
          <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px] border-[#D8F3DC] dark:border-[#2D3748]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="bg-[#F0F7F4] dark:bg-[#16213E] border-[#D8F3DC] dark:border-[#2D3748]">
              <SelectGroup>
                <SelectLabel className="text-[#1B4332] dark:text-[#E2E8F0]">Category</SelectLabel>
                <SelectItem value="Next JS" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Next JS</SelectItem>
                <SelectItem value="Data Science" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Data Science</SelectItem>
                <SelectItem value="Frontend Development" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Javascript</SelectItem>
                <SelectItem value="Python" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Python</SelectItem>
                <SelectItem value="Docker" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Docker</SelectItem>
                <SelectItem value="MongoDB" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">MongoDB</SelectItem>
                <SelectItem value="HTML" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">HTML</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => navigate("/admin/course")}
            className="border-[#537D5D] text-[#537D5D] hover:bg-[#D8F3DC]/30 dark:border-[#D8F3DC] dark:text-[#D8F3DC] dark:hover:bg-[#2D6A4F]/30"
          >
            Back
          </Button>
          <Button 
            disabled={isLoading} 
            onClick={createCourseHandler}
            className="bg-[#537D5D] hover:bg-[#3A5A40] dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;