import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNFT = async (req, res) => {
  const { name, imageUrl, price, ownerId } = req.body;
  try {
    const nft = await prisma.nFT.create({
      data: { name, imageUrl, price, ownerId },
    });
    res.json(nft);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar NFT" });
  }
};

export const getNFTs = async (req, res) => {
  const nfts = await prisma.nFT.findMany({ include: { owner: true, comments: true } });
  res.json(nfts);
};

export const getNFTById = async (req, res) => {
  const { id } = req.params;
  const nft = await prisma.nFT.findUnique({ where: { id }, include: { owner: true, comments: true } });
  if (!nft) return res.status(404).json({ error: "NFT não encontrado" });
  res.json(nft);
};

export const deleteNFT = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.nFT.delete({ where: { id } });
    res.json({ message: "NFT deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar NFT" });
  }
};
