import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//Sign Up
export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  // if (!name) {
  //   next(errorHandler(401, "Name is required!"));
  // }
  // if (!email) {
  //   next(errorHandler(401, "Email is required!"));
  // }
  // if (!password) {
  //   next(errorHandler(401, "Password is required!"));
  // }
  var salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync(password, salt);
  const newUser = new User({ name, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

//Sign In
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//logout
export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!!");
  } catch (error) {
    next(error);
  }
};
