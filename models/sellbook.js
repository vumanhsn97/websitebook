var express = require('express');
var mongoose =  require('mongoose');

sellbookSchema = new mongoose.Schema({
  idbook: String,
  idcus: String,
  amount: Number,
  date: String,
  status: String,
  address: String,
  phone: String
});

sellbook = mongoose.model('sellbook', sellbookSchema);
module.exports = sellbook;
