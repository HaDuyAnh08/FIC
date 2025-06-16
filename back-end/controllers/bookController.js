const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}, 'name genre author yearPublished rentalPrice stockStatus');
    console.log(books);
    res.status(200).json(books);
  } 
  catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

exports.addBook = async (req, res) => {
  try {
    const { name, genre, author, yearPublished, rentalPrice, stockStatus } = req.body;
    const newBook = new Book({ name, genre, author, yearPublished, rentalPrice, stockStatus });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error adding book', error: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, genre, author, yearPublished, rentalPrice, stockStatus } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(id, { name, genre, author, yearPublished, rentalPrice, stockStatus }, { new: true, runValidators: true });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};
