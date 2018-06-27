var express = require('express');
var mongoose =  require('mongoose');

customerSchema = new mongoose.Schema({
  username: String,
  password: String,
  cusname: String,
  email: String
});
customer = mongoose.model('customer', customerSchema);
module.exports = customer;
