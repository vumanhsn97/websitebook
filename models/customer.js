var express = require('express');
var mongoose =  require('mongoose');

customerSchema = new mongoose.Schema({
  username: String,
  password: String,
  cusname: String,
  email: String,
  address: String,
  sex: String,
  phone: String
});
customer = mongoose.model('customer', customerSchema);
module.exports = customer;
