import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const {data, isLoading} = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if(isLoading) return <h1 className="text-[#537D5D] dark:text-[#D8F3DC]">Loading...</h1>
 
  return (
    <div className="space-y-4">
      <Button 
        onClick={() => navigate(`create`)}
        className="bg-[#537D5D] hover:bg-[#3A5A40] text-white dark:bg-[#D8F3DC] dark:text-[#1B4332] dark:hover:bg-[#B7E4C7]"
      >
        Create a new course
      </Button>
      
      <Table>
        <TableCaption className="text-[#3A5A40] dark:text-[#A0AEC0]">
          A list of your recent courses.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-[#1B4332] dark:text-[#E2E8F0]">Price</TableHead>
            <TableHead className="text-[#1B4332] dark:text-[#E2E8F0]">Status</TableHead>
            <TableHead className="text-[#1B4332] dark:text-[#E2E8F0]">Title</TableHead>
            <TableHead className="text-right text-[#1B4332] dark:text-[#E2E8F0]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.courses.map((course) => (
            <TableRow key={course._id} className="hover:bg-[#D8F3DC]/30 dark:hover:bg-[#2D6A4F]/30">
              <TableCell className="font-medium text-[#1B4332] dark:text-[#E2E8F0]">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                <Badge variant={course.isPublished ? "default" : "secondary"}>
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>
              </TableCell>
              <TableCell className="text-[#1B4332] dark:text-[#E2E8F0]">
                {course.courseTitle}
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  size='sm' 
                  variant='ghost'
                  className="text-[#537D5D] hover:text-[#3A5A40] dark:text-[#D8F3DC] dark:hover:text-[#B7E4C7]"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit className="h-4 w-4"/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;