var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CookieStrategy = require('passport-cookie').Strategy;

router.get("/cart", function(req, res){
  if(!req.session.cart){
    req.session.cart = [];
    req.session.sl = [];
  }
  books.find({}, function(err, result){
    var book = [];
    var i = 0;
    while(result[i]){
      var j = 0;
      while(req.session.cart[j]){
        if(result[i]._id == req.session.cart[j]){
          book.push(result[i]);
          break;
        }
        j = j + 1;
      }
      i = i + 1;
    }
    imagesbook.find({}, function(err, images){
      res.render('cart', {user:req.user, book:book, images:images, sl:req.session.sl});
    });
  })
});

router.get("/cart-:id-:sl", function(req, res){
  var id = req.params.id;
  var sl = req.params.sl;
  if(req.session.cart){
    req.session.cart.push(id);
    req.session.sl.push(sl);
  }
  else{
    req.session.cart = [];
    req.session.sl = [];
    req.session.cart.push(id);
    req.session.sl.push(sl);
  }
  books.find({}, function(err, result){
    var book = [];
    var i = 0;
    while(result[i]){
      var j = 0;
      while(req.session.cart[j]){
        if(result[i]._id == req.session.cart[j]){
          book.push(result[i]);
          break;
        }
        j = j + 1;
      }
      i = i + 1;
    }
    imagesbook.find({}, function(err, images){
      res.render('cart', {user:req.user, book:book, images:images, sl:req.session.sl});
    });
  })
});

router.get("/cartdel-:id", function(req, res){
  var id = req.params.id;
  var i = 0;
  if(req.session.cart){
    while(req.session.cart[i]){
      if(req.session.cart[i] == id) break;
      i= i + 1;
    }
    req.session.cart.splice(i,1);
    req.session.sl.splice(i,1);
  }
  res.redirect('cart');
});

module.exports = router;
