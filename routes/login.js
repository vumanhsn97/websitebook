var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
router.get("/login", function(req, res){
  res.render('login');
});
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/trangchu'
}));
passport.use(new LocalStrategy(
  (username, password, done)=>{
    customer.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      else {
        if(user.password!=password){
          return done(null, false);
        }
      }
      return done(null, user);
    });
  }
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  customer.findById(id, function(err, user) {
    done(err, user);
  });
});
module.exports = router;
