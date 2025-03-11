import { api } from './setup.js';

describe('Post Routes', () => {
  const testPost = {
    title: 'Test Post',
    content: 'This is a test post content',
    authorId: '1' // Assuming we have a user with ID 1
  };

  let postId;

  describe('POST /posts', () => {
    it('should create a new post', async () => {
      const response = await api
        .post('/posts')
        .send(testPost)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      postId = response.body.id;
    });
  });

  describe('GET /posts', () => {
    it('should return all posts', async () => {
      const response = await api
        .get('/posts')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should return a specific post', async () => {
      const response = await api
        .get(`/posts/${postId}`)
        .expect(200);

      expect(response.body.title).toBe(testPost.title);
      expect(response.body.content).toBe(testPost.content);
    });
  });

  describe('PUT /posts/:id', () => {
    it('should update post information', async () => {
      const updatedInfo = {
        title: 'Updated Title',
        content: 'Updated content'
      };

      const response = await api
        .put(`/posts/${postId}`)
        .send(updatedInfo)
        .expect(200);

      expect(response.body.title).toBe(updatedInfo.title);
      expect(response.body.content).toBe(updatedInfo.content);
    });
  });

  describe('DELETE /posts/:id', () => {
    it('should delete a post', async () => {
      await api
        .delete(`/posts/${postId}`)
        .expect(200);

      // Verify the post is deleted
      await api
        .get(`/posts/${postId}`)
        .expect(404);
    });
  });
}); 