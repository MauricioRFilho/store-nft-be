import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (req, res) => {
  const { content, userId, nftId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { content, userId, nftId },
    });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar comentário" });
  }
};

export const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany({ include: { user: true, nft: true } });
  res.json(comments);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({ where: { id } });
    res.json({ message: "Comentário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar comentário" });
  }
};
