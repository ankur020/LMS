import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

//User details
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));
    const { password: pass, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

//Users enrolled courses
export const enrollCourse = async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const enrolled = [...user.enrolledCourses, req.params.id];
    const updatedUser = await User.findByIdAndUpdate(
      req.body._id,
      {
        $set: {
          enrolledCourses: enrolled,
        },
      },
      { new: true }
    );

    const { password: pass, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
