var express = require('express');
var fs = require('fs')
var app = express();
mongoose = require('mongoose');
app.listen(3000);
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
books.create({
  bookname: "Gửi Thanh Xuân Ấm Áp Của Chúng Ta (Tập 1 Và 2)",
  bookprice: 119000,
  bookcontent: "Gửi Thanh Xuân Ấm Áp Của Chúng Ta (Tập 1 Và 2)\nGửi cho thời thanh xuân ấm áp nhất của chúng ta.\nBạn đã bao giờ tự hỏi lòng mình, “thanh xuân” là gì hay chưa? \nThanh xuân, là những thước phim quay chậm về những tháng ngày non nớt; những tháng ngày gục đầu trên bàn học của giảng đường. Là những cô bạn thân cùng bàn năm đó, hay chị chị em em chung một kí túc nho nhỏ, hàn thuyên về những mơ ước phía xa, đôi ba câu chuyện không đầu không cuối mà nói hết cả một ngày dài. Là những tháng ngày hồn nhiên không muộn phiền của cô gái nhỏ Mạt Mạt trong “Gửi thanh xuân ấm áp của chúng ta” bên bạn thân Mộng Lộ, Vương San và Đàn Chị. Những chất chứa trên những gương mặt thân quen cả đời này chẳng tài nào quên được, dường như khắc sâu vào tận đáy lòng để cô luôn thương nhớ suốt những ngày tháng về sau. ",
  booktype: "Truyện ngắn",
  viewsbook: 0,
  author: "Triệu Kiền Kiền",
});

imagesbook.create([{
  bookname: "Gửi Thanh Xuân Ấm Áp Của Chúng Ta (Tập 1 Và 2)",
  imageurl: "images/gtxaacct1.jpg"
},
{
  bookname: "Gửi Thanh Xuân Ấm Áp Của Chúng Ta (Tập 1 Và 2)",
  imageurl: "images/gtxaacct2.jpg"
},
{
  bookname: "Gửi Thanh Xuân Ấm Áp Của Chúng Ta (Tập 1 Và 2)",
  imageurl: "images/gtxaacct3.jpg"
},
{
  bookname: "Gửi Thanh Xuân Ấm Áp Của Chúng Ta (Tập 1 Và 2)",
  imageurl: "images/gtxaacct4.jpg"
},
]);
