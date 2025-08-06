// LectureTab.jsx
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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useGetCourseAccessQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2, Lock, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

// const MEDIA_API = "http://localhost:8000/api/v1/media";
const MEDIA_API = import.meta.env.VITE_API_MEDIA_URL;


const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  // Fetch lecture data
  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  // Check course access
  const { data: courseAccess } = useGetCourseAccessQuery(courseId);
  const isAccessible = courseAccess?.lectures?.find(
    l => l._id === lectureId
  )?.isAccessible;

  // Initialize form with lecture data
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo({
        videoUrl: lecture.videoInfo?.videoUrl,
        publicId: lecture.videoInfo?.publicId,
      });
    }
  }, [lecture]);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    try {
      await editLecture({
        lectureTitle,
        videoUrl: uploadVideoInfo?.videoUrl,
        publicId: uploadVideoInfo?.publicId,
        isPreviewFree: Boolean(isFree),
        courseId,
        lectureId,
      });
    } catch (error) {
      console.error("Edit lecture error:", error);
    }
  };

  const removeLectureHandler = async () => {
    try {
      await removeLecture(lectureId);
    } catch (error) {
      console.error("Remove lecture error:", error);
    }
  };

  // Handle success/error messages
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully");
    }
    if (error) {
      const errorMessage =
        error?.data?.message || error?.error || "Failed to update lecture";
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message || "Lecture removed successfully");
    }
  }, [removeSuccess]);

  // Show locked state if lecture is not accessible
  if (!isAccessible) {
    return (
      <Card className="border-[#537D5D] dark:border-[#6B8E71]">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-[#537D5D] dark:text-[#6B8E71]" />
          </div>
          <CardTitle className="text-[#2D3748] dark:text-[#E2E8F0]">
            Lecture Locked
          </CardTitle>
          <CardDescription className="text-[#4A5568] dark:text-[#A0AEC0]">
            {lecture?.isPreviewFree
              ? "This preview lecture will be available soon"
              : "Please purchase the course to access this lecture"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button className="bg-[#537D5D] hover:bg-[#3A5A40] dark:bg-[#6B8E71] dark:hover:bg-[#5A7D5D]">
            Purchase Course
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Main lecture editing UI
  return (
    <Card className="border-[#537D5D] dark:border-[#6B8E71]">
      <CardHeader className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <CardTitle className="text-[#2D3748] dark:text-[#E2E8F0]">
            Edit Lecture
          </CardTitle>
          <CardDescription className="text-[#4A5568] dark:text-[#A0AEC0]">
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
            className="w-full md:w-auto"
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-[#2D3748] dark:text-[#E2E8F0]">Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
            className="border-[#CBD5E0] dark:border-[#4A5568]"
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-[#2D3748] dark:text-[#E2E8F0] flex items-center gap-2">
            <Video className="h-4 w-4" />
            Video <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="w-fit border-[#CBD5E0] dark:border-[#4A5568]"
            />
            {uploadVideoInfo?.videoUrl && (
              <span className="text-sm text-[#537D5D] dark:text-[#6B8E71]">
                Video uploaded
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="free-preview"
            className="data-[state=checked]:bg-[#537D5D]"
          />
          <Label htmlFor="free-preview" className="text-[#4A5568] dark:text-[#A0AEC0]">
            Enable Free Preview
          </Label>
        </div>

        {mediaProgress && (
          <div className="space-y-2">
            <Progress 
              value={uploadProgress} 
              className="h-2 bg-[#E2E8F0] dark:bg-[#2D3748]"
              indicatorClassName="bg-[#537D5D] dark:bg-[#6B8E71]"
            />
            <p className="text-sm text-[#4A5568] dark:text-[#A0AEC0]">
              {uploadProgress}% uploaded
            </p>
          </div>
        )}

        <div className="flex justify-end">
          <Button 
            disabled={isLoading || btnDisable} 
            onClick={editLectureHandler}
            className="bg-[#537D5D] hover:bg-[#3A5A40] dark:bg-[#6B8E71] dark:hover:bg-[#5A7D5D]"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;