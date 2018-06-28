var express = require('express');
var router = express.Router();
var passport = require('passport');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var LocalStrategy = require('passport-local').Strategy;
router.get("/adminlogin", function(req, res){
  res.render('adminlogin');
});
router.post('/adminlogin', urlencodedParser, function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  admin.findOne({username:username}, function(err, user){
    if(user){
      if(user.password==password){
        req.session.user = user;
        res.redirect("admin")
      }
      else{
        res.redirect('adminlogin');
      }
    }
    else {
      res.redirect('adminlogin')
    }
  })
})

module.exports = router;
