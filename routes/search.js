var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.post('/search', urlencodedParser, function(req, res){
  var key = req.body.key;
  var price = req.body.price;
  var booktype = req.body.typebook;
  var xapxep = req.body.xapxep;
  if(isNaN(price)) price = 999999999;
  books.find({}, function(err, book){
    if(booktype != "Thể loại"){
      var i = 0;
      var books=[];
      while(book[i]){
        if(book[i].booktype != booktype){
          book.splice(i,1);
        }
        else{
          i = i + 1;
        }
      }
    }
    //Giá
    var i = 0;
    var books=[];
    while(book[i]){
      if(book[i].bookprice > price){
        book.splice(i,1);
      }
      else{
        i = i + 1;
      }
    }
    //Tên
    i = 0;
    while(book[i]){
      if(book[i].bookname.indexOf(key)==-1){
        book.splice(i,1);
      }
      else{
        i = i + 1;
      }
    }
    //Lượt xem
    if(xapxep == "Lượt xem"){
      var i = 0;
      while(book[i]){
        while (i<12) {
          var j = 0;
          var views = 0;
          while (book[j]) {
            if(views < book[j].viewsbook) views = book[j].viewsbook;
            j = j + 1;
          }
          j = 0;
          while (book[j]) {
            if(book[j].viewsbook==views){
              books.push(book[j]);
              book.splice(j,1);
              i = i + 1;
              if(i==12) break;
            }
            j = j + 1;
          }
          i = i + 1;
        }
      }
    }
    else{
      books = book;
    }
    imagesbook.find({}, function(err, images){
      res.render("trangchu",{book:books, images:images, user:req.user});
    });
  })
});

module.exports = router;
