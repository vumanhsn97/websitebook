var express = require('express');
var mongoose =  require('mongoose');
var multer =  require('multer');
var fs = require('fs');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CookieStrategy = require('passport-cookie').Strategy;
var session = require('express-session');
app.use(session({
  secret: 'mySecretKey',
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
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

customerSchema = new mongoose.Schema({
  username: String,
  password: String,
  cusname: String,
  email: String
});

commentSchema = new mongoose.Schema({
  idbook: String,
  name: String,
  content: String
});

books = mongoose.model('books', booksSchema);
imagesbook = mongoose.model('imagesbook', imagesbookSchema);
customer = mongoose.model('customer', customerSchema);
comment = mongoose.model('comment', commentSchema);


//Code website
app.use('/', require('./routes/trangchu'));
app.use('/', require('./routes/phantrang'));
app.use('/', require('./routes/theloai'));
app.use('/', require('./routes/chitiet'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/addtocart'));
