const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');

let createdId = '';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe('Book API Endpoints', () => {
  it('POST /books', async () => {
    const res = await request(app)
      .post('/books')
      .send({ title: 'Atomic Habits', author: 'James Clear' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    createdId = res.body._id;
  });

  it('GET /books', async () => {
    const res = await request(app).get('/books');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /books/:id', async () => {
    const res = await request(app)
      .put(`/books/${createdId}`)
      .send({ title: 'Updated Book' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book updated');
  });

  it('DELETE /books/:id', async () => {
    const res = await request(app).delete(`/books/${createdId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Book deleted');
  });
});
