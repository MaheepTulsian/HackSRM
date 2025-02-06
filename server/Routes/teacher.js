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
    const newClassroom = { class_name, pdf_url: [], student_rollno: [] };

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
router.post(
  "/add-rollno/:teacherId/:classroomId",
  up.none(),
  async (req, res) => {
    const { teacherId, classroomId } = req.params;
    const { rollno } = req.body;

    try {
      // Find the teacher document that contains the classroom with the given classroomId
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return res.status(404).json({ message: "Teacher not found" });
      }

      // Find the specific classroom within the teacher's class_room array
      const classroom = teacher.class_room.id(classroomId);

      if (!classroom) {
        return res.status(404).json({ message: "Classroom not found" });
      }

      // Add the roll number to the student_rollnos array
      classroom.student_rollnos.push(rollno);

      // Save the updated teacher document
      await teacher.save();

      // Send response
      res
        .status(200)
        .json({ message: "Roll number added successfully", classroom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error", error });
    }
  }
);
// get the total class room of the teacher
router.get("/get_class/:teacherId", async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const class_room = teacher.class_room;
    return res
      .status(200)
      .json({ class_room, message: "Classroom retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
});
// get the submission_url in the classroom

router.get("/get-submitted_url/:teacherId/:classroomId", async (req, res) => {
  const { teacherId, classroomId } = req.params;

  try {
    // Find the teacher document that contains the classroom with the given classroomId
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the specific classroom within the teacher's class_room array
    const classroom = teacher.class_room.id(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const submission_urls = classroom.submission_url;

    return res.status(200).json({
      submission_urls,
      message: "Submission URLs retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// get the assignment_url in the classroom
router.get("/get-assignment/:teacherId/:classroomId", async (req, res) => {
  const { teacherId, classroomId } = req.params;

  try {
    // Find the teacher document that contains the classroom with the given classroomId
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the specific classroom within the teacher's class_room array
    const classroom = teacher.class_room.id(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const assignment_urls = classroom.assignements_url;

    return res.status(200).json({
      assignment_urls,
      message: "Assignment URLs retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// get the pdf_url in the classroom
router.get("/get-pdf/:teacherId/:classroomId", async (req, res) => {
  const { teacherId, classroomId } = req.params;

  try {
    // Find the teacher document that contains the classroom with the given classroomId
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the specific classroom within the teacher's class_room array
    const classroom = teacher.class_room.id(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const pdf_urls = classroom.pdf_url;

    return res
      .status(200)
      .json({ pdf_urls, message: "PDF URLs retrieved successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
// get the rollno in the classroom
router.get("/get-rollno/:teacherId/:classroomId", async (req, res) => {
  const { teacherId, classroomId } = req.params;

  try {
    // Find the teacher document that contains the classroom with the given classroomId
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Find the specific classroom within the teacher's class_room array
    const classroom = teacher.class_room.id(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const student_rollnos = classroom.student_rollnos;

    return res.status(200).json({
      student_rollnos,
      message: "Student roll numbers retrieved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
