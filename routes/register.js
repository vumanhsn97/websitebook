var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/register", function(req, res){
  res.render('register');
});
router.post('/register', urlencodedParser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var cusname = req.body.cusname;
  customer.findOne({username:username}, function(err, user){
    if(!user){
      customer.create({
        username:username,
        email:email,
        password:password,
        cusname:cusname,
        address:"Chưa cập nhật",
        sex:"Chưa cập nhật",
        phone:"Chưa cập nhật"
      });
      res.redirect('trangchu');
    }
    else{
      res.render('register');
    }
  })
});

module.exports = router;
