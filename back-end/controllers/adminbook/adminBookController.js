// back-end/controllers/adminbook/adminBookController.js
const Book = require('../../models/Book');   // ← lên 2 cấp: adminbook → controllers → back-end

/**
 * [POST] /api/admin/books
 * Thêm sách mới
 */
exports.createBook = async (req, res) => {
  try {
    const { name, author, stock, stockStatus, rentalPrice, genre, yearPublished, detail, image } = req.body;

    const book = new Book({
      name,
      author,
      detail,
      stock,
      stockStatus,
      image,
      rentalPrice,
      genre,
      yearPublished
    });

    await book.save();

    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * [GET] /api/admin/books
 * Lấy danh sách sách
 */
exports.listBooks = async (_req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/**
 * [DELETE] /api/admin/books/:id
 * Xóa một sách dựa trên ID
 */
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ URL parameter

    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};