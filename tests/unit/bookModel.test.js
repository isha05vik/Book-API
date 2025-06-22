const Book = require('../../models/Book');

describe('Book Model Unit Test', () => {
  it('should create a new Book instance', () => {
    const book = new Book({ title: 'Test Book', author: 'Test Author' });
    expect(book.title).toBe('Test Book');
    expect(book.author).toBe('Test Author');
  });
});
