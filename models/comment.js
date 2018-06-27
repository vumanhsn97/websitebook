var express = require('express');
var mongoose =  require('mongoose');

commentSchema = new mongoose.Schema({
  idbook: String,
  name: String,
  content: String
});

comment = mongoose.model('comment', commentSchema);

module.exports = comment;
