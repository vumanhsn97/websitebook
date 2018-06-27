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

//Models
comment = require('./models/comment');
customer = require('./models/customer');
imagesbook = require('./models/imagesbook');
sellbook = require('./models/sellbook');
books = require('./models/books');
admin = require('./models/admin');

//Code views
app.use('/', require('./routes/trangchu'));
app.use('/', require('./routes/phantrang'));
app.use('/', require('./routes/theloai'));
app.use('/', require('./routes/chitiet'));
app.use('/', require('./routes/admin'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/logout'));
app.use('/', require('./routes/addtocart'));
app.use('/', require('./routes/account'));
app.use('/', require('./routes/search'));
app.use('/', require('./routes/adminlogin'));
