import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import nftRoutes from "./routes/nft.routes.js";
import commentRoutes from "./routes/comment.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/nfts", nftRoutes);
app.use("/comments", commentRoutes);

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
