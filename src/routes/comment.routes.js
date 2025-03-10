import express from "express";
import { createComment, getComments, deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createComment);
router.get("/", getComments);
router.delete("/:id", deleteComment);

export default router;
