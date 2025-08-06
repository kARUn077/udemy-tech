import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();
 
  useEffect(() => {
    if (courseByIdData?.course) { 
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice?.toString() || "",

        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };

  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };

  const selectThumbnail = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  // Validate file type
  if (!file.type.match('image.*')) {
    toast.error('Please select an image file (JPEG, PNG, etc.)');
    return;
  }

  // Validate file size (2MB max)
  if (file.size > 2 * 1024 * 1024) {
    toast.error('File size must be less than 2MB');
    return;
  }

  setInput({ ...input, courseThumbnail: file });
  const fileReader = new FileReader();
  fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
  fileReader.readAsDataURL(file);
};

 const updateCourseHandler = async () => {
  try {
    const formData = new FormData();
    
    // Append all fields
    Object.entries(input).forEach(([key, value]) => {
  if (value !== "" && value !== null) {
    if (key === "coursePrice") {
      const parsed = Number(value);
      if (!isNaN(parsed)) {
        formData.append("coursePrice", parsed);
      }
    } else {
      formData.append(key, value);
    }
  }
});


    // Special handling for thumbnail if it's a string (existing URL)
    if (typeof input.courseThumbnail === 'string') {
      formData.delete('courseThumbnail'); // Remove if it's just the existing URL
    }

    await editCourse({ formData, courseId });
  } catch (err) {
    toast.error("Failed to update course");
    console.error(err);
  }
};

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if(courseByIdLoading) return <h1 className="text-[#537D5D] dark:text-[#D8F3DC]">Loading...</h1>
 
  return (
    <Card className="border-[#D8F3DC] dark:border-[#2D3748]">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-[#1B4332] dark:text-[#E2E8F0]">Basic Course Information</CardTitle>
          <CardDescription className="text-[#3A5A40] dark:text-[#A0AEC0]">
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button 
            disabled={courseByIdData?.course.lectures.length === 0} 
            variant="outline"
            className="border-[#537D5D] text-[#537D5D] hover:bg-[#D8F3DC]/30 dark:border-[#D8F3DC] dark:text-[#D8F3DC] dark:hover:bg-[#2D6A4F]/30"
            onClick={()=> publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button className="bg-[#537D5D] hover:bg-[#3A5A40] dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]">
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
              className="border-[#D8F3DC] dark:border-[#2D3748]"
            />
          </div>
          <div>
            <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              className="border-[#D8F3DC] dark:border-[#2D3748]"
            />
          </div>
          <div>
            <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Description</Label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>
          <div className="flex items-center gap-5">
            <div>
              <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Category</Label>
              <Select
                defaultValue={input.category}
                onValueChange={selectCategory}
              >
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
            <div>
              <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Course Level</Label>
              <Select
                defaultValue={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-[180px] border-[#D8F3DC] dark:border-[#2D3748]">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent className="bg-[#F0F7F4] dark:bg-[#16213E] border-[#D8F3DC] dark:border-[#2D3748]">
                  <SelectGroup>
                    <SelectLabel className="text-[#1B4332] dark:text-[#E2E8F0]">Course Level</SelectLabel>
                    <SelectItem value="Beginner" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Beginner</SelectItem>
                    <SelectItem value="Medium" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Medium</SelectItem>
                    <SelectItem value="Advance" className="hover:bg-[#D8F3DC] dark:hover:bg-[#2D6A4F]">Advance</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Price in (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-fit border-[#D8F3DC] dark:border-[#2D3748]"
              />
            </div>
          </div>
          <div>
  <Label className="text-[#1B4332] dark:text-[#E2E8F0]">Course Thumbnail</Label>
  <div className="flex items-center gap-4">
    <Label htmlFor="thumbnail" className="cursor-pointer">
      <div className="px-4 py-2 bg-[#537D5D] text-white rounded-md hover:bg-[#3A5A40] dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]">
        Choose File
      </div>
      <input
        id="thumbnail"
        type="file"
        onChange={selectThumbnail}
        accept="image/*"
        className="hidden"
      />
    </Label>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {input.courseThumbnail 
        ? typeof input.courseThumbnail === 'string' 
          ? 'Current thumbnail' 
          : input.courseThumbnail.name 
        : "No file chosen"}
    </span>
    {input.courseThumbnail && (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          setInput({...input, courseThumbnail: ""});
          setPreviewThumbnail("");
        }}
        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Remove
      </Button>
    )}
  </div>
  
  {previewThumbnail ? (
    <img
      src={previewThumbnail}
      className="w-64 my-2 rounded-md border border-[#D8F3DC] dark:border-[#2D3748]"
      alt="Course Thumbnail Preview"
    />
  ) : courseByIdData?.course?.thumbnailUrl ? (
    <img
      src={courseByIdData.course.thumbnailUrl}
      className="w-64 my-2 rounded-md border border-[#D8F3DC] dark:border-[#2D3748]"
      alt="Current Course Thumbnail"
    />
  ) : null}
</div>
          <div className="flex gap-2">
            <Button 
              onClick={() => navigate("/admin/course")} 
              variant="outline"
              className="border-[#537D5D] text-[#537D5D] hover:bg-[#D8F3DC]/30 dark:border-[#D8F3DC] dark:text-[#D8F3DC] dark:hover:bg-[#2D6A4F]/30"
            >
              Cancel
            </Button>
            <Button 
              disabled={isLoading} 
              onClick={updateCourseHandler}
              className="bg-[#537D5D] hover:bg-[#3A5A40] dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;