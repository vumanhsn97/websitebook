var express = require('express');
var fs = require('fs')
var app = express();
mongoose = require('mongoose');
app.listen(process.env.PORT||3000);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
//connect to server
mongoose.connect('mongodb://bookstore:admin@ds237815.mlab.com:37815/btn04-bookstore');
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
  bookname: String,
  imageurl: String
});

books = mongoose.model('books', booksSchema);
imagesbook = mongoose.model('imagesbook', imagesbookSchema);
app.get("/trangchu",function(req, res){
  res.render("trangchu");
});

app.get("/page-:id",function(req, res){
  var i = parseInt(req.params.id);
  if(i<=0) res.send("Don't find");
  else {
    i = (i-1)*12;
    var n = i + 12;
    var j = 1;
    var listbook = [];
    var bookname, typebook, bookprice, id;
    books.find({}, function (err, result) {
      if (err) return handleError(err);
      var s="";
      var kt = parseInt(result.length/12)+1;
      if(kt<parseInt(req.params.id)) res.send("Don't find");
      else {
        while(i<n){
          if(i<result.length){
            bookname = result[i].bookname;
            booktype = result[i].booktype;
            bookprice = result[i].bookprice;
            id = result[i]._id;
            listbook.push(bookname);
            s += "document.getElementById('ts"+j+"').innerHTML = " + '"Tên sách: '+ bookname + '";\n';
            s += "document.getElementById('ls"+j+"').innerHTML = " + '"Loại sách: '+ booktype + '";\n';
            s += "document.getElementById('gs"+j+"').innerHTML = " + '"Giá: '+ bookprice + 'Đ";\n';
            s += "document.getElementById('link"+j+"').href = " + '"chitiet-'+ id + '";\n';
          }
          if(i>= result.length){
            s += "document.getElementById('s"+j+"').style.border ='none';\n";
            s += "document.getElementById('s"+j+"').style.width ='0px';\n";
            s += "document.getElementById('s"+j+"').style.height ='0px';\n";
            s += "document.getElementById('hs"+j+"').width ='0px';\n";
            s += "document.getElementById('hs"+j+"').height ='0px';\n";
          }
          j = j + 1;
          i = i+1;
        }
        s += "document.getElementById('page').innerHTML = "+"'"+parseInt(req.params.id)+"';\n";
        if(parseInt(req.params.id)==1){
          s += "document.getElementById('prev').innerHTML = '';\n";
          s += "document.getElementById('prevend').innerHTML = '';\n";
        }
        var x = parseInt(result.length/12) + 1;
        if(parseInt(req.params.id)==x){
          s += "document.getElementById('next').innerHTML = '';\n";
          s += "document.getElementById('nextend').innerHTML = '';\n";
        }
        var t = parseInt(req.params.id) - 1;
        s += "document.getElementById('pr').href = "+ "'page-"+t+"';\n";
        t = parseInt(req.params.id);
        s += "document.getElementById('page').innerHTML = "+ "'"+t+"';\n";
        t = parseInt(req.params.id) + 1;
        s += "document.getElementById('nx').href = "+ "'page-"+t+"';\n";
        t = parseInt(result.length/12) + 1;
        s += "document.getElementById('nxd').href = "+ "'page-"+t+"';\n";
        s += "window.onload = function() {if(!window.location.hash) {window.location = window.location + '#loaded';window.location.reload();}}"
        fs.writeFile('public/js/data.js', s, 'utf8', function(err){
          if(err)
            throw err;
          else
            console.log("Ghi thanh cong");
          });
        imagesbook.find({}, function(err, kq){
          var d="";
          var l;
          var m = (parseInt(req.params.id)-1)*12;
          if((m+12)<result.length) l = 12;
          else{
            l = 12 - (result.length - m);
          }
          for(var z = 0; z < l;)
          {
            var p = 0;
            while(p  < kq.length){
              if(kq[p].bookname == result[m].bookname) {
                m = m + 1;
                var q = z + 1;
                d += "document.getElementById('hs"+q+"').src = " +"'"+kq[p].imageurl+"';";
                break;
              }
              p = p + 1;
            }
            z = z + 1;
          }
          fs.writeFile('public/js/imagesdata.js', d, 'utf8', function(err){
            if(err)
              throw err;
            else
              console.log("Ghi thanh cong");
            });
        });
        res.render("phantrang");
      }
    });
  }
});
app.get("/theloai-:id", function(req, res){
  var id = req.params.id;
  var bookname, booktype, bookprice, bookcontent, author, viewsbook;
  var s="";
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
  books.find({}, function (err, result) {
    if (err) return handleError(err);
    var i = 0;
    var j = 1;
    n = result.length;
    while(i<n){
      if(result[i].booktype == theloai){
        bookname = result[i].bookname;
        booktype = result[i].booktype;
        bookprice = result[i].bookprice;
        id = result[i]._id;
        s += "document.getElementById('ts"+j+"').innerHTML = " + '"Tên sách: '+ bookname + '";\n';
        s += "document.getElementById('ls"+j+"').innerHTML = " + '"Loại sách: '+ booktype + '";\n';
        s += "document.getElementById('gs"+j+"').innerHTML = " + '"Giá: '+ bookprice + 'Đ";\n';
        s += "document.getElementById('link"+j+"').href = " + '"chitiet-'+ id + '";\n';
        imagesbook.find({}, function(err, kq){
          var d="";
          var l;
          var m = (parseInt(req.params.id)-1)*12;
          if((m+12)<result.length) l = 12;
          else{
            l = 12 - (result.length - m);
          }
          for(var z = 0; z < l;)
          {
            var p = 0;
            while(p  < kq.length){
              if(kq[p].bookname == result[m].bookname) {
                m = m + 1;
                var q=z+1;
                d += "document.getElementById('hs"+q+"').src = " +"'"+kq[p].imageurl+"';";
                break;
              }
              p = p + 1;
            }
            z = z + 1;
          }
          fs.writeFile('public/js/imagesdata.js', d, 'utf8', function(err){
            if(err)
              throw err;
            });
        });
        j = j + 1;
      }
      i = i + 1;
    }
    while(j < 13){
      s += "document.getElementById('s"+j+"').style.border ='none';\n";
      s += "document.getElementById('s"+j+"').style.width ='0px';\n";
      s += "document.getElementById('s"+j+"').style.height ='0px';\n";
      s += "document.getElementById('hs"+j+"').width ='0px';\n";
      s += "document.getElementById('hs"+j+"').height ='0px';\n";
      j++;
    }
    s += "window.onload = function() {if(!window.location.hash) {window.location = window.location + '#load';window.location.reload();}};"
    fs.writeFile('public/js/data.js', s, 'utf8', function(err){
      if(err)
        throw err;
      });
  });
  res.render("phantrang");
});

app.get("/chitiet-:id", function(req, res){
  var id = req.params.id;
  var bookname, booktype, bookprice, bookcontent, author, viewsbook;
  var s="";
  books.find({}, function (err, result) {
    if (err) return handleError(err);
    var i = 0;
    n = result.length;
    while(i<n){
      if(result[i]._id == id){
        bookname = result[i].bookname;
        booktype = result[i].booktype;
        bookprice = result[i].bookprice;
        bookcontent = result[i].bookcontent;
        author = result[i].author;
        viewsbook = result[i].viewsbook;
        s += "document.getElementById('bookname').innerHTML = " + '"Tên sách: '+ bookname + '";\n';
        s += "document.getElementById('typebook').innerHTML = " + '"Loại sách: '+ booktype + '";\n';
        s += "document.getElementById('bookprice').innerHTML = " + '"Giá: '+ bookprice + 'Đ";\n';
        s += "document.getElementById('author').innerHTML = " + '"Tác giả: '+ author + '";\n';
        s += "document.getElementById('viewsbook').innerHTML = " + '"Lượt xem: '+ viewsbook + '";\n';
        s += "document.getElementById('bookcontent').innerHTML = "+ '"' + bookcontent + '";\n';
        s += "window.onload = function() {if(!window.location.hash) {window.location = window.location + '#loaded';window.location.reload();}}"
        fs.writeFile('public/js/data.js', s, 'utf8', function(err){
          if(err)
            throw err;
          });

        break;
      }
      i = i + 1;
    }
  });
  res.render("chitiet.ejs");
});
