import { api } from './setup.js';

describe('User Routes', () => {
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123'
  };

  let userId;

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await api
        .post('/users')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      userId = response.body.id;
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await api
        .get('/users')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should return a specific user', async () => {
      const response = await api
        .get(`/users/${userId}`)
        .expect(200);

      expect(response.body.username).toBe(testUser.username);
    });
  });

  describe('PUT /users/:id', () => {
    it('should update user information', async () => {
      const updatedInfo = {
        username: 'updateduser'
      };

      const response = await api
        .put(`/users/${userId}`)
        .send(updatedInfo)
        .expect(200);

      expect(response.body.username).toBe(updatedInfo.username);
    });
  });
}); 