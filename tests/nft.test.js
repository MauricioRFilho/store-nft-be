import { api } from './setup.js';

describe('NFT Routes', () => {
  const testNFT = {
    name: 'Test NFT',
    description: 'A test NFT item',
    imageUrl: 'https://example.com/test.jpg',
    price: 1.5,
    tokenId: '123456'
  };

  let nftId;

  describe('POST /nfts', () => {
    it('should create a new NFT', async () => {
      const response = await api
        .post('/nfts')
        .send(testNFT)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      nftId = response.body.id;
    });
  });

  describe('GET /nfts', () => {
    it('should return all NFTs', async () => {
      const response = await api
        .get('/nfts')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should return a specific NFT', async () => {
      const response = await api
        .get(`/nfts/${nftId}`)
        .expect(200);

      expect(response.body.name).toBe(testNFT.name);
      expect(response.body.tokenId).toBe(testNFT.tokenId);
    });
  });

  describe('PUT /nfts/:id', () => {
    it('should update NFT information', async () => {
      const updatedInfo = {
        price: 2.0,
        description: 'Updated description'
      };

      const response = await api
        .put(`/nfts/${nftId}`)
        .send(updatedInfo)
        .expect(200);

      expect(response.body.price).toBe(updatedInfo.price);
      expect(response.body.description).toBe(updatedInfo.description);
    });
  });
}); 