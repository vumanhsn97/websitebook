var express = require('express');
var router = express.Router();
router.get("/page-:id",function(req, res){
  var i = parseInt(req.params.id);
  var go = "page-";
  if(i<=0) res.send("Don't find");
  else {
    i = (i-1)*12;
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
          res.render("phantrang",{book:listbook, images:images, page:parseInt(req.params.id), go:go});
        });
      }
    });
  }
});
module.exports = router;
