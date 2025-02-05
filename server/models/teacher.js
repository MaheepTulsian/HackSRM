import mongoose, { Schema } from "mongoose";

const classRoomSchema = new Schema({
  class_name: { type: String },
  pdf_url: [{ type: String }],
  student_id: [{ type: String }],
});

const teacherSchema = new Schema({
  name: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  class_room: {
    type: [classRoomSchema], // Ensures it's an array
    default: [], // Default value to prevent `undefined`
  },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
const ClassRoomSchema = mongoose.model("ClassRoomSchema", classRoomSchema);

export { Teacher, ClassRoomSchema };
