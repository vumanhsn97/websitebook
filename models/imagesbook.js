var express = require('express');
var mongoose =  require('mongoose');

imagesbookSchema = new mongoose.Schema({
  idbook: String,
  imageurl: String
});
imagesbook = mongoose.model('imagesbook', imagesbookSchema);

module.exports = imagesbook;
