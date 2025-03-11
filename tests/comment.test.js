import { api } from './setup.js';

describe('Comment Routes', () => {
  const testComment = {
    content: 'This is a test comment',
    postId: '1', // Assuming we have a post with ID 1
    authorId: '1' // Assuming we have a user with ID 1
  };

  let commentId;

  describe('POST /comments', () => {
    it('should create a new comment', async () => {
      const response = await api
        .post('/comments')
        .send(testComment)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      commentId = response.body.id;
    });
  });

  describe('GET /comments', () => {
    it('should return all comments for a post', async () => {
      const response = await api
        .get(`/comments?postId=${testComment.postId}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('should return a specific comment', async () => {
      const response = await api
        .get(`/comments/${commentId}`)
        .expect(200);

      expect(response.body.content).toBe(testComment.content);
      expect(response.body.postId).toBe(testComment.postId);
    });
  });

  describe('PUT /comments/:id', () => {
    it('should update comment content', async () => {
      const updatedInfo = {
        content: 'Updated comment content'
      };

      const response = await api
        .put(`/comments/${commentId}`)
        .send(updatedInfo)
        .expect(200);

      expect(response.body.content).toBe(updatedInfo.content);
    });
  });

  describe('DELETE /comments/:id', () => {
    it('should delete a comment', async () => {
      await api
        .delete(`/comments/${commentId}`)
        .expect(200);

      // Verify the comment is deleted
      await api
        .get(`/comments/${commentId}`)
        .expect(404);
    });
  });
}); 