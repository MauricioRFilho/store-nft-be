import express from "express";
import { registerUser, getUsers, getUserById, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
