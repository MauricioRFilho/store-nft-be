import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/nfts", async (req, res) => {
  const nfts = await prisma.nFT.findMany();
  res.json(nfts);
});

app.listen(3000, () => console.log("Server running on port 3000"));
