import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import teaherrouter from "./Routes/teacher.js";
import student from "./Routes/students.js";
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/teacher", teaherrouter);
app.use("/student", student);

app.get("/", (req, res) => {
  res.send("Welcome to Teacher API");
});

export { app };
