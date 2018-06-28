var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/chitiet-:id-:page", function(req, res){
  var id = req.params.id;
  var page = parseInt(req.params.page);
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
        var cm=[], cmd=[];
        var n;
        var i = 0;
        if(page==1) n=12;
        else n = (page-1)*12 + 12;
        while(comment[i]){
          i = i + 1;
        }
        i = i - 1;
        while(i>=0){
          cm.push(comment[i]);
          i = i - 1;
        }
        i = (page-1)*12;
        while(cm[i]){
          cmd.push(cm[i]);
          i = i + 1;
          if(i==n) break;
        }
        i = 0;
        while(comment[i]){
          i = i + 1;
        }
        i = i / 12;
        res.render("chitiet.ejs",{book:book, images:images, comment:cmd, user:req.user, maxpage:i});
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
  res.redirect('chitiet-'+ id +"-1");
});

module.exports = router;
