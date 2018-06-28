var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.get("/account", function(req, res){
  if(req.user){
    res.render("account", {user:req.user});
  }
  else{
    res.redirect("trangchu");
  }
});

router.get("/suaaccount", function(req, res){
  if(req.user){
    res.render("suaaccount", {user:req.user});
  }
  else{
    res.redirect("trangchu");
  }
});

router.post("/suaaccount", urlencodedParser, function(req, res){
  if(req.user){
    var cusname = req.body.cusname;
    var email = req.body.email;
    var address = req.body.address;
    var sex = req.body.sex;
    var phone = req.body.phone;
    customer.findOne({_id:req.user._id}, function(err, result){
      result.cusname = cusname;
      result.email = email;
      result.address = address;
      result.sex = sex;
      result.phone = phone;
      result.save();
    })
    res.send("<p>Sửa tài khoản thành công</p><a href='/account'>Click here</a>")
  }
  else{
    res.redirect("trangchu");
  }
});

router.get("/doimatkhau", function(req, res){
  if(req.user){
    res.render("doimatkhau", {user:req.user});
  }
  else{
    res.redirect("trangchu");
  }
});

router.post("/doimatkhau", urlencodedParser, function(req, res){
  if(req.user){
    var passold = req.body.passold;
    var passnew = req.body.passnew;
    customer.findOne({_id:req.user._id}, function(err, result){
      if(passold = result.password){
        result.password = passnew;
        result.save();
      }
      else{
        res.redirect("doimatkhau");
      }
    })
    res.send("<p>Đổi mật khẩu thành công</p><a href='/account'>Click here</a>")
  }
  else{
    res.redirect("trangchu");
  }
});

router.get("/history", function(req, res){
  if(req.user){
    sellbook.find({idcus:req.user._id}, function(err, sellbook){
      books.find({}, function(err, book){
        imagesbook.find({}, function(err, images){
          res.render("history", {user:req.user, book:book, sellbook:sellbook, images:images});
        })

      });
    });
  }
  else{
    res.redirect("trangchu");
  }
});

router.get("/dathang", function(req, res){
  if(req.user){
    res.render("dathang", {user:req.user});
  }
  else{
    res.redirect("login");
  }
});

router.post("/dathang", urlencodedParser, function(req, res){
  if(req.user){
    var address = req.body.address;
    var date = req.body.date;
    var phone = req.body.phone;
    var i = 0;
    while(req.session.cart[i]){
      sellbook.create({
        idbook: req.session.cart[i],
        idcus: req.user._id,
        amount: req.session.sl[i],
        date: date,
        status: "Đang kiểm duyệt",
        address: address,
        phone: phone
      });
      i = i + 1;
    }
    res.redirect("history");
  }
  else{
    res.redirect("trangchu");
  }
});

module.exports = router;
