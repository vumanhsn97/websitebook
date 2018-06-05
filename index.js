var express = require('express');
var mongoose =  require('mongoose');
var multer =  require('multer');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.listen(process.env.PORT||3000);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', './views');
mongoose.connect('mongodb://admin:admin@ds231360.mlab.com:31360/btn05');
booksSchema = new mongoose.Schema({
  bookname: {
    type: String,
    maxlength: 50
  },
  bookprice: {
    type: Number,
    min: 0
  },
  bookcontent: String,
  booktype: String,
  viewsbook: {
    type: Number,
    min: 0
  },
  author: String,
});

imagesbookSchema = new mongoose.Schema({
  idbook: String,
  imageurl: String
});

books = mongoose.model('books', booksSchema);
imagesbook = mongoose.model('imagesbook', imagesbookSchema);



//Code website
app.get("/",function(req, res){
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

app.get("/trangchu",function(req, res){
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

app.get("/page-:id",function(req, res){
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
app.get("/theloai-:id-:page", function(req, res){
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

app.get("/chitiet-:id", function(req, res){
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



//Code trang admin

app.get('/admin', function(req, res){
  res.render('admin');
});

app.get('/themsach', function(req, res){
  res.render('themsach');
});

app.post('/themsach', urlencodedParser, function(req, res){
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

app.get('/xoasach', function(req, res){
  books.find({}, function(err, result){
    res.render('xoasach',{book:result});
  })
});
app.post('/xoasach', urlencodedParser, function(req, res){
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
app.get('/xoasach-:id', function(req, res){
  var id = req.params.id;
  books.deleteOne({_id:id}, function(err){
    if(err) res.send("<p>Lỗi xoá sách</p><a href='/xoasach'>Quay lại</a>")
    else{
      res.send("<p>Xoá sách thành công</p><a href='/xoasach'>Quay lại</a>")
    }
  });
});

app.get('/suasach', function(req, res){
  books.find({}, function(err, result){
    res.render('suasach',{book:result});
  })
});
app.post('/suasach', urlencodedParser, function(req, res){
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
app.get('/suasach-:id', function(req, res){
  var id = req.params.id;
  books.findOne({_id:id}, function(err, result){
    if(err) res.send("<p>Lỗi</p><a href='/suasach'>Quay lại</a>");
    else{
      res.render('formss', {fixbook:result});
    }
  });
});
app.post('/suasach-:id', urlencodedParser, function(req, res){
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
app.get('/themanh', function(req, res){
  books.find({}, function(err, book){
    imagesbook.find({}, function(err, images){
      res.render('themanh',{book:book, images:images});
    })
  })
});
app.post('/themanh', urlencodedParser, function(req, res){
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
app.post('/themanh-:id', upload.any(), function(req, res){
  var id = req.params.id;
  var image = req.files;
  var imageurl = "images/" + image[0].filename;
  imagesbook.create({
    idbook:id,
    imageurl:imageurl
  });
  res.send("<p>Thêm ảnh thành công</p><a href='/themanh'>Quay lại</a>");
});

app.get('/xoaanh', function(req, res){
  books.find({}, function(err, book){
    imagesbook.find({}, function(err, images){
      res.render('xoaanh',{book:book, images:images});
    })
  })
});
app.post('/xoaanh', urlencodedParser, function(req, res){
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
app.get('/xoaanh-:id', function(req, res){
  var id = req.params.id;
  imagesbook.deleteOne({_id:id}, function(err){
    if(err) res.send("<p>Xoá ảnh không thành công</p><a href='/xoaanh'>Quay lại</a>");
    else{
      res.send("<p>Xoá ảnh thành công</p><a href='/xoaanh'>Quay lại</a>")
    }
  })
});
