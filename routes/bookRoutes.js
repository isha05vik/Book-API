  const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// GET all books
router.get('/', async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

// POST add a book
router.post('/', async (req, res) => {
  const newBook = new Book(req.body);
  await newBook.save();
  res.json(newBook);
});

// PUT update a book
router.put('/:id', async (req, res) => {
  const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: 'Book deleted' });
});

module.exports = router;
