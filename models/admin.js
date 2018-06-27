var express = require('express');
var mongoose =  require('mongoose');

adminSchema = new mongoose.Schema({
  username: String,
  password: String
});
admin = mongoose.model('admin', adminSchema);

module.exports = admin;
