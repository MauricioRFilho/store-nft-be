import express from "express";
import { createNFT, getNFTs, getNFTById, deleteNFT } from "../controllers/nft.controller.js";

const router = express.Router();

router.post("/", createNFT);
router.get("/", getNFTs);
router.get("/:id", getNFTById);
router.delete("/:id", deleteNFT);

export default router;
