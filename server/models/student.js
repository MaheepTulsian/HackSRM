import exp from "constants";
import mongoose from "mongoose";
import { type } from "os";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },

  class_room: [
    {
      type: String, //teacher unique id
    },
  ],
});
const Student = mongoose.model("Student", studentSchema);

export { Student };
