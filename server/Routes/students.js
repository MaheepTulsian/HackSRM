import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.js";
import { ClassRoomSchema, Teacher } from "../models/teacher.js";
import multer from "multer";
const router = Router();

const up = multer();
// used for the student to login
router.post("/login", up.none(), async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email, password });

  if (!student) {
    throw new ApiError(404, "Student not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Student logged in"));
});

// used for the student to register
router.post("/register", up.none(), async (req, res) => {
  const { email, password, name, username, student_rollno } = req.body;

  const user = Student.findById({ email, password, name, username });
  if (!user) {
    throw new ApiError(404, "Student not found");
  }

  const student = new Student({
    email,
    password,
    name,
    username,
    student_rollno,
  });

  await student.save();

  return res
    .status(201)
    .json(new ApiResponse(201, student, "Student registered successfully"));
});

//fetch the given pdf_url with given class_id
router.get("/get-pdf/:class_id", async (req, res) => {
  const { class_id } = req.params;

  try {
    // Find the teacher document that contains the classroom with the given class_id
    const teacher = await Teacher.findOne({ "class_room._id": class_id });

    if (!teacher) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    // Find the specific classroom within the teacher's class_room array
    const classroom = teacher.class_room.id(class_id);

    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    const pdf_urls = classroom.pdf_url;

    return res
      .status(200)
      .json({ pdf_urls, message: "PDF URLs retrieved successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {
  res.send("Welcome to Student API");
});

export default router;
