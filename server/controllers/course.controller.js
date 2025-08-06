import mongoose from "mongoose";
import { Course } from "../models/course.model.js";
import { Lecture } from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import fs from "fs";

// Create course
export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({ message: "Course title and category is required." });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });

    return res.status(201).json({ course, message: "Course created." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create course" });
  }
};

// Search courses
export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;
    let categoryArray = [];
    
    if (typeof categories === "string" && categories.trim().length) {
      categoryArray = categories.split(",");
    } else if (Array.isArray(categories)) {
      categoryArray = categories;
    }

    const searchCriteria = {
      isPublished: true,
      $or: [
        { courseTitle: { $regex: query, $options: "i" } },
        { subTitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    if (query.toLowerCase() === "all") delete searchCriteria["$or"];
    if (categoryArray.length > 0) searchCriteria.category = { $in: categoryArray };

    const sortOptions = {};
    if (sortByPrice === "low") sortOptions.coursePrice = 1;
    else if (sortByPrice === "high") sortOptions.coursePrice = -1;

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({ success: true, courses: courses || [] });
  } catch (error) {
    console.log("❌ Error in searchCourse:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Get published courses
export const getPublishedCourse = async (_, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get published courses" });
  }
};

// Get creator's courses
export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) return res.status(404).json({ courses: [], message: "Course not found" });
    return res.status(200).json({ courses });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get courses" });
  }
};

// Edit course
export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
    return res.status(200).json({ course, message: "Course updated successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update course" });
  }
};

// Get course by ID
export const getCourseById = async (req, res) => {
  try {
    console.log(" I ma here");
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });
    return res.status(200).json({ course });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get course by id" });
  }
};

// Create lecture
export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    const file = req.file;

    if (!lectureTitle || !file) {
      return res.status(400).json({ message: "Lecture title and video file are required" });
    }
     if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const uploaded = await uploadMedia(file.path);
    fs.unlinkSync(file.path);

    const lecture = await Lecture.create({
      lectureTitle,
      videoInfo: { videoUrl: uploaded.secure_url, publicId: uploaded.public_id },
      isPreviewFree: true,
    });

    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).json({ lecture, message: "Lecture created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to create lecture" });
  }
};

// Get course lectures
export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate({
      path: "lectures",
      select: "lectureTitle isPreviewFree videoInfo",
    });

    if (!course) return res.status(404).json({ message: "Course not found" });
    return res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get lectures" });
  }
};

// Edit lecture
export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, videoUrl, publicId, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found!" });
    }

    // Update lecture fields
    if (typeof lectureTitle === "string") {
      lecture.lectureTitle = lectureTitle;
    }

    // Always update videoInfo if both fields are present
    if (typeof videoUrl === "string" && typeof publicId === "string") {
      lecture.videoInfo = {
        videoUrl,
        publicId,
      };
    }

    // Must explicitly check for boolean (even if it's false)
    if (typeof isPreviewFree === "boolean") {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    // Add lecture to course if not already present
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }
    console.log(lecture);
    return res.status(200).json({
      message: "Lecture updated successfully.",
      lecture,
    });
  } catch (error) {
    console.error("Edit Lecture Error:", error);
    return res.status(500).json({ message: "Failed to edit lecture" });
  }
};

// Remove lecture
export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) return res.status(404).json({ message: "Lecture not found!" });

    if (lecture.videoInfo?.publicId) {
      await deleteVideoFromCloudinary(lecture.videoInfo.publicId);
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({ message: "Lecture removed successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to remove lecture" });
  }
};

// Get lecture by ID
export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId).select("lectureTitle isPreviewFree videoInfo");
    if (!lecture) return res.status(404).json({ message: "Lecture not found!" });
    return res.status(200).json({ lecture });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get lecture by id" });
  }
};

// Toggle course publish status
export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    course.isPublished = publish === "true";
    await course.save();

    const statusMessage = course.isPublished ? "Published" : "Unpublished";
    return res.status(200).json({ message: `Course is ${statusMessage}` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to update status" });
  }
};