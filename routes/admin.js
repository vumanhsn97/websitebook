var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var multer =  require('multer');
//Code trang admin
router.get('/admin', function(req, res){
    res.render("admin");
});

router.get('/themsach', function(req, res){
  res.render('themsach');
});

router.post('/themsach', urlencodedParser, function(req, res){
  var bookname = req.body.bookname;
  var bookprice = req.body.bookprice;
  var booktype = req.body.booktype;
  var author = req.body.author;
  var bookcontent = req.body.bookcontent;
  books.create({
    bookname: bookname,
    bookprice: bookprice,
    booktype: booktype,
    viewsbook: 0,
    author: author,
    bookcontent: bookcontent
  });
  res.send("<p>Thêm sách thành công</p><a href='/themsach'>Quay lại</a>");
});

router.get('/xoasach', function(req, res){
  books.find({}, function(err, result){
    res.render('xoasach',{book:result});
  })
});
router.post('/xoasach', urlencodedParser, function(req, res){
  var timkiem = req.body.timkiem;
  books.find({}, function(err, result){
    var book=[];
    var i = 0;
    while(result[i]){
      if(result[i].bookname.indexOf(timkiem)!=-1)
      {
        book.push(result[i]);
      }
      i = i + 1;
    }
    res.render('xoasach',{book:book});
  })
});
router.get('/xoasach-:id', function(req, res){
  var id = req.params.id;
  books.deleteOne({_id:id}, function(err){
    if(err) res.send("<p>Lỗi xoá sách</p><a href='/xoasach'>Quay lại</a>")
    else{
      res.send("<p>Xoá sách thành công</p><a href='/xoasach'>Quay lại</a>")
    }
  });
});

router.get('/suasach', function(req, res){
  books.find({}, function(err, result){
    res.render('suasach',{book:result});
  })
});
router.post('/suasach', urlencodedParser, function(req, res){
  var timkiem = req.body.timkiem;
  books.find({}, function(err, result){
    var book=[];
    var i = 0;
    while(result[i]){
      if(result[i].bookname.indexOf(timkiem)!=-1)
      {
        book.push(result[i]);
      }
      i = i + 1;
    }
    res.render('suasach',{book:book});
  })
});
router.get('/suasach-:id', function(req, res){
  var id = req.params.id;
  books.findOne({_id:id}, function(err, result){
    if(err) res.send("<p>Lỗi</p><a href='/suasach'>Quay lại</a>");
    else{
      res.render('formss', {fixbook:result});
    }
  });
});
router.post('/suasach-:id', urlencodedParser, function(req, res){
  var id = req.params.id;
  var bookname = req.body.bookname;
  var bookprice = req.body.bookprice;
  var booktype = req.body.booktype;
  var author = req.body.author;
  var bookcontent = req.body.bookcontent;
  books.findOne({_id:id}, function(err, result){
    if(err) res.send("<p>Lỗi</p><a href='/suasach'>Quay lại</a>");
    else{
      result.bookname = bookname;
      result.bookprice = bookprice;
      result.booktype = booktype;
      result.bookcontent = bookcontent;
      result.author = author;
      result.save(function(err, updatebook){
        if(err) res.send("<p>Lỗi</p><a href='/suasach'>Quay lại</a>");
        else{
          res.send("<p>Sửa thành công</p><a href='/suasach'>Quay lại</a>")
        }
      });
    }
  });
});

//Create path and refilename
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
router.get('/themanh', function(req, res){
  books.find({}, function(err, book){
    imagesbook.find({}, function(err, images){
      res.render('themanh',{book:book, images:images});
    })
  })
});
router.post('/themanh', urlencodedParser, function(req, res){
  var timkiem = req.body.timkiem;
  books.find({}, function(err, result){
    var book=[];
    var i = 0;
    while(result[i]){
      if(result[i].bookname.indexOf(timkiem)!=-1)
      {
        book.push(result[i]);
      }
      i = i + 1;
    }
    imagesbook.find({}, function(err, images){
      res.render('themanh',{book:book, images:images});
    })
  })
});
router.post('/themanh-:id', upload.any(), function(req, res){
  var id = req.params.id;
  var image = req.files;
  var imageurl = "images/" + image[0].filename;
  imagesbook.create({
    idbook:id,
    imageurl:imageurl
  });
  res.send("<p>Thêm ảnh thành công</p><a href='/themanh'>Quay lại</a>");
});

router.get('/xoaanh', function(req, res){
  books.find({}, function(err, book){
    imagesbook.find({}, function(err, images){
      res.render('xoaanh',{book:book, images:images});
    })
  })
});
router.post('/xoaanh', urlencodedParser, function(req, res){
  var timkiem = req.body.timkiem;
  books.find({}, function(err, result){
    var book=[];
    var i = 0;
    while(result[i]){
      if(result[i].bookname.indexOf(timkiem)!=-1)
      {
        book.push(result[i]);
      }
      i = i + 1;
    }
    imagesbook.find({}, function(err, images){
      res.render('themanh',{book:book, images:images});
    })
  })
});
router.get('/xoaanh-:id', function(req, res){
  var id = req.params.id;
  imagesbook.deleteOne({_id:id}, function(err){
    if(err) res.send("<p>Xoá ảnh không thành công</p><a href='/xoaanh'>Quay lại</a>");
    else{
      res.send("<p>Xoá ảnh thành công</p><a href='/xoaanh'>Quay lại</a>")
    }
  })
});
module.exports = router;
