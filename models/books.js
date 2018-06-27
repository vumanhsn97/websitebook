var express = require('express');
var mongoose =  require('mongoose');

booksSchema = new mongoose.Schema({
  bookname: {
    type: String,
    maxlength: 50
  },
  bookprice: {
    type: Number,
    min: 0
  },
  bookcontent: String,
  booktype: String,
  viewsbook: {
    type: Number,
    min: 0
  },
  author: String,
});
books = mongoose.model('books', booksSchema);

module.exports = books;
