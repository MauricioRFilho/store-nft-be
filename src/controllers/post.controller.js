import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar post" });
  }
};

export const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({ include: { author: true } });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id }, include: { author: true } });
  if (!post) return res.status(404).json({ error: "Post não encontrado" });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar post" });
  }
};
