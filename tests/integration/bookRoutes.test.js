const app = require('../../server');
const supertest = require('supertest');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Book API Integration Tests', () => {
  it('POST /books - should add a new book', async () => {
    const response = await supertest(app)
      .post('/books')
      .send({
        title: 'The Pragmatic Programmer',
        author: 'Andy Hunt',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe('The Pragmatic Programmer');
  });
});
