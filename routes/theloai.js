var express = require('express');
var router = express.Router();
router.get("/theloai-:id-:page", function(req, res){
  var id = req.params.id;
  var page = req.params.page;
  var go = "theloai-" + id +'-';
  var theloai;
  if(id == "truyenngan") theloai = "Truyện ngắn";
  if(id == "truyentranh") theloai = "Truyện tranh";
  if(id == "giaoduc") theloai = "Giáo dục";
  if(id == "kinangsong") theloai = "Kĩ năng sống";
  if(id == "kinhte") theloai = "Kinh tế";
  if(id == "tamly") theloai = "Tâm lý";
  if(id == "giaokhoa") theloai = "Sách giáo khoa";
  if(id == "vanhoc") theloai = "Văn học";
  if(id == "ngoaingu") theloai = "Ngoại ngữ";
  if(id == "cotich") theloai = "Truyện cổ tích";
  books.find({booktype:theloai}, function (err, result) {
    if (err) return handleError(err);
    var i = (page-1)*12;
    var n = i + 12;
    var listbook=[];
    if(!result[i]) res.send("Don't find");
    else {
      while(result[i]){
        listbook.push(result[i]);
        if(i==n) break;
        i = i+1;
      }
      imagesbook.find({}, function(err, images){
        res.render("phantrang",{book:listbook, images:images, page:page, go:go});
      });
    }
  });
});
module.exports = router;
