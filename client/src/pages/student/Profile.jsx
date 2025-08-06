import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserHandler = async () => {
    try {
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (profilePhoto) formData.append("profilePhoto", profilePhoto);
      await updateUser(formData);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (data?.user) {
      setName(data.user.name || "");
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Profile updated successfully");
      setPreviewImage(""); // Clear preview after successful update
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }, [isSuccess, isError, error, refetch]);

  if (isLoading) return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#1A1A2E] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[#537D5D]" />
    </div>
  );

  const user = data?.user;

  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#1A1A2E] py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="font-bold text-2xl text-center md:text-left text-[#2D3748] dark:text-[#E2E8F0]">
          PROFILE
        </h1>
        
        <div className="bg-white dark:bg-[#16213E] rounded-lg shadow-md p-6 my-5">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 border-2 border-[#537D5D]">
                <AvatarImage
                  src={previewImage || user?.photoUrl || "https://github.com/shadcn.png"}
                  alt={user?.name || "User"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-[#537D5D] text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="flex-1">
              <div className="mb-3">
                <h1 className="font-semibold text-[#2D3748] dark:text-[#E2E8F0]">
                  Name:
                  <span className="font-normal text-[#4A5568] dark:text-[#A0AEC0] ml-2">
                    {user?.name}
                  </span>
                </h1>
              </div>
              
              <div className="mb-3">
                <h1 className="font-semibold text-[#2D3748] dark:text-[#E2E8F0]">
                  Email:
                  <span className="font-normal text-[#4A5568] dark:text-[#A0AEC0] ml-2">
                    {user?.email}
                  </span>
                </h1>
              </div>
              
              <div className="mb-4">
                <h1 className="font-semibold text-[#2D3748] dark:text-[#E2E8F0]">
                  Role:
                  <span className="font-normal text-[#4A5568] dark:text-[#A0AEC0] ml-2">
                    {user?.role?.toUpperCase()}
                  </span>
                </h1>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    className="bg-[#537D5D] hover:bg-[#3A5A40] text-white"
                  >
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white dark:bg-[#16213E] border-[#537D5D]">
                  <DialogHeader>
                    <DialogTitle className="text-[#2D3748] dark:text-[#E2E8F0]">
                      Edit Profile
                    </DialogTitle>
                    <DialogDescription className="text-[#4A5568] dark:text-[#A0AEC0]">
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-[#2D3748] dark:text-[#E2E8F0]">
                        Name
                      </Label>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={user?.name}
                        className="col-span-3 bg-[#F8F9FA] dark:bg-[#1A1A2E] border-[#CBD5E0]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
  <Label className="text-[#2D3748] dark:text-[#E2E8F0]">
    Profile Photo
  </Label>
  <div className="col-span-3 flex items-center gap-2">
    <Label htmlFor="profilePhoto" className="cursor-pointer">
      <div className="px-4 py-2 bg-[#537D5D] text-white rounded-md hover:bg-[#3A5A40]">
        Choose File
      </div>
      <input
        id="profilePhoto"
        type="file"
        onChange={onChangeHandler}
        accept="image/*"
        className="hidden"
      />
    </Label>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      {profilePhoto ? profilePhoto.name : "No file chosen"}
    </span>
  </div>
</div>
                    
                    {previewImage && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-[#2D3748] dark:text-[#E2E8F0]">
                          Preview
                        </Label>
                        <div className="col-span-3">
                          <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="h-20 w-20 rounded-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <DialogFooter>
                    <Button
                      disabled={updateUserIsLoading || (!name && !profilePhoto)}
                      onClick={updateUserHandler}
                      className="bg-[#537D5D] hover:bg-[#3A5A40] text-white"
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#16213E] rounded-lg shadow-md p-6 mt-6">
          <h1 className="font-medium text-lg text-[#2D3748] dark:text-[#E2E8F0]">
            Courses you're enrolled in
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
            {user?.enrolledCourses?.length === 0 ? (
              <p className="text-[#4A5568] dark:text-[#A0AEC0]">
                You haven't enrolled in any courses yet
              </p>
            ) : (
              user?.enrolledCourses?.map((course) => (
                <Course course={course} key={course._id} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;