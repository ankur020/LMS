import Courses from "../models/course.model.js";
import { errorHandler } from "../utils/error.js";

//create course
export const addCourse = async (req, res, next) => {
  try {
    const course = await Courses.create(req.body);
    return res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

//update course
export const updateCourse = async (req, res, next) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return next(errorHandler(404, "Course Not Found!"));
  }
  try {
    const updatedCourse = await Courses.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

//delete course
export const deleteCourse = async (req, res, next) => {
  const course = await Courses.findById(req.params.id);
  if (!course) {
    return next(errorHandler(404, "Course Not Found!"));
  }
  try {
    await Courses.findByIdAndDelete(req.params.id);
    res.status(200).json("Course deleted successfully!!");
  } catch (error) {
    next(error);
  }
};

//get all courses
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Courses.find({});
    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

//get single course details
export const getCourse = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return next(errorHandler(404, "Course not found!"));
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
