const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const books = require('./book.json');
app.get('/api/books', (req, res) => {
  res.json(books);
});
app.get('/api/books/category/:category', (req, res) => {
  const category = req.params.category;
  const filteredBooks = books.filter(book => book.category === category);
  res.json(filteredBooks);
});


app.get('/api/books/:id', (req, res) => {
  const book = books.find(book => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});