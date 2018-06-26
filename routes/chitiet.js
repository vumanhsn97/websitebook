var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
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
      comment.find({idbook:id}, function(err, comment){
        res.render("chitiet.ejs",{book:book, images:images, comment:comment, user:req.user});
      })
    });
  });
});

router.post('/comment-:id', urlencodedParser, function(req, res){
  var name;
  var id = req.params.id;
  if(req.user){
    name = user.cusname;
  }
  else{
    name = req.body.username;
  }
  var content = req.body.content;
  comment.create({
    idbook:id,
    name:name,
    content:content
  })
  res.redirect('chitiet-'+ id);
});

module.exports = router;
