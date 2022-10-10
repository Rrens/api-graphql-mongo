const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  release_year: Number,
  genre: String,
});

// LOAD MODEL SCHEMA
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
