import express from "express";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

router.get("/get", getAllCourses);
router.get("/get/:id", getCourse);
router.post("/add", addCourse);
router.post("/update/:id", updateCourse);
router.delete("/delete/:id", deleteCourse);

export default router;
