var express = require('express');
var router = express.Router();
router.get("/chitiet-:id", function(req, res){
  var id = req.params.id;
  books.findOne({_id:id}, function (err, book) {
    if (err) return handleError(err);
    book.viewsbook = book.viewsbook + 1;
    book.save(function(err){
      if (err) {
        console.log("Chưa thêm");
      }
    });
    imagesbook.find({idbook:id}, function(err, images){
      res.render("chitiet.ejs",{book:book, images:images});
    });
  });
});
module.exports = router;
