var express = require('express');
var router = express.Router();
router.get("/",function(req, res){
  var i = 0;
  var n = i +12
  var listbook = [];
  books.find({}, function (err, result) {
    if (err) return handleError(err);
    if(!result[i]) res.send("Don't find");
    else {
      while(result[i]){
        listbook.push(result[i]);
        if(i==n) break;
        i = i+1;
      }
      imagesbook.find({}, function(err, images){
        res.render("trangchu",{book:listbook, images:images});
      });
    }
  });
});

router.get("/trangchu",function(req, res){
  var i = 0;
  var n = i +12
  var listbook = [];
  books.find({}, function (err, result) {
    if (err) return handleError(err);
    if(!result[i]) res.send("Don't find");
    else {
      while(result[i]){
        listbook.push(result[i]);
        if(i==n) break;
        i = i+1;
      }
      imagesbook.find({}, function(err, images){
        res.render("trangchu",{book:listbook, images:images});
      });
    }
  });
});
module.exports = router;
