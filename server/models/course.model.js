import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Courses = mongoose.model("Courses", courseSchema);
export default Courses;
