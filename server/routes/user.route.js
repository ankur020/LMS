import express from "express";
import { enrollCourse, getUser } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/:id", getUser);
router.post("/enroll/:id", enrollCourse);

export default router;
