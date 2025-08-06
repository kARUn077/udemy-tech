import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [video, setVideo] = useState(null);
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    if (!lectureTitle || !video) {
      toast.error("Lecture title and video are required");
      return;
    }

    const formData = new FormData();
    formData.append("lectureTitle", lectureTitle);
    formData.append("video", video);

    await createLecture({ courseId, body: formData });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
      setLectureTitle("");
      setVideo(null);
    }
    if (error) {
      toast.error(error.data?.message || "Failed to create lecture");
    }
  }, [isSuccess, error]);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
          />
        </div>
        <div>
  <Label>Upload Video</Label>
  <div className="flex items-center gap-2">
    <Label
      htmlFor="video-upload"
      className="px-4 py-2 border rounded-md cursor-pointer bg-gray-100 hover:bg-gray-200"
    >
      Choose File
    </Label>
    <Input
      id="video-upload"
      type="file"
      accept="video/*"
      className="hidden"
      onChange={(e) => setVideo(e.target.files[0])}
    />
    {video ? (
      <div className="flex items-center gap-2">
        <span className="text-sm">{video.name}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVideo(null)}
          className="text-red-500 hover:text-red-600"
        >
          Remove
        </Button>
      </div>
    ) : (
      <span className="text-sm text-muted-foreground">No file chosen</span>
    )}
  </div>
</div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={createLectureHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p>Loading lectures...</p>
          ) : lectureError ? (
            <p>Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p>No lectures availabe</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
