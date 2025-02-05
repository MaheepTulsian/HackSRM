import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.js";
import multer from "multer";
const router = Router();

const up = multer();

router.post(
  "/update-pdf/:teacherId/:classroomId",
  upload.single("file"),
  async (req, res) => {
    try {
      const { teacherId, classroomId } = req.params;
      const pdf_upload = req.file?.path;

      if (!pdf_upload) {
        return res.status(400).json({ error: "PDF file is required" });
      }

      // Upload PDF to Cloudinary
      const pdfurl = await uploadOnCloudinary(pdf_upload);
      if (!pdfurl.url) {
        return res
          .status(500)
          .json({ error: "Error in uploading file to Cloudinary" });
      }

      // Update the specific classroom with the new PDF URL
      const teacher = await Teacher.findOneAndUpdate(
        { _id: teacherId, "class_room._id": classroomId },
        { $push: { "class_room.$.pdf_url": pdfurl.url } },
        { new: true }
      );

      if (!teacher) {
        return res
          .status(404)
          .json({ error: "Teacher or classroom not found" });
      }

      return res.status(200).json({
        message: "PDF uploaded and updated successfully",
        teacher,
      });
    } catch (error) {
      console.error("Error uploading PDF:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.post("/login", up.none(), async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email, password });

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, teacher, "Teacher logged in"));
});

router.post("/register", up.none(), async (req, res) => {
  const { name, username, email, password } = req.body;
  const teacher = new Teacher({ name, username, email, password });

  await teacher.save();

  return res
    .status(201)
    .json(new ApiResponse(201, teacher, "Teacher registered successfully"));
});

router.post("/create-classroom/:id", up.none(), async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { class_name } = req.body;

    // Validate input
    if (!class_name) {
      return res.status(400).json({ message: "Class name is required" });
    }

    // Find teacher by ID
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Create new classroom
    const newClassroom = { class_name, pdf_url: [], student_id: [] };

    // Add new classroom to teacher's class_room array
    teacher.class_room.push(newClassroom);

    // Save the teacher record
    await teacher.save();

    // Send response
    res.status(201).json({ message: "Classroom added successfully", teacher });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
