const express = require('express');
const router = express.Router();
const async = require("async")
const User = require("../models/user")
const passport = require("passport");
const PayTr = require("node-paytr")

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/users/login");
  }
}



router.post("/paytr", async function (req, res, next) {
  let paytr = await new PayTr({
    merchant_id:"211612",
    merchant_key:"bK8Mr3e4e5ffQ5G6",
    merchant_salt:"qiqSjX5Jja9p7qF7",
    merhant_oid:"23312231231",
    merchant_ok_url:"https://webhook.site/0a928e5d-22e8-4111-a533-27e5a8329b9f",
    merchant_fail_url:"https://webhook.site/0a928e5d-22e8-4111-a533-27e5a8329b9f",
  });
  const user_params = {
    user_name : "Mertcan Arguc",
    user_phone : "05370297275",
    payment_amount : 12,
    user_address:"Bla bla",
    user_ip:"84.51.12.22",
    debug_on:1,
    test_mode:0,
    currency:"TRY",
    user_basket:[
      {name:"Ürün adı",fiyat:"222"}
    ],
    
    email:"arguc.mertcan@gmail.com"
  }
  res.send(paytr.getToken(user_params));
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('front/index', { title: 'Express' });
});

router.get('/basarili', function (req, res, next) {
  res.render('front/basarili', {
    user: req.user
  })
})

router.get('/login', async (req, res, next) => {
  res.render("front/login")
})

router.get('/kampp', async (req, res, next) => {
  res.render("front/live/live", {
    user: req.user
  })
})

router.get("/gizlilik", function (req, res, next) {
  res.render("front/sozlesme/gizlilik")
})

router.get("/mesafeli", function (req, res, next) {
  res.render("front/sozlesme/mesafeli")
})

router.get("/kullanici", function (req, res, next) {
  res.render("front/sozlesme/kullanici")
})

router.get("/sorucozumleri", function (req, res, next) {
  res.render("front/cozum/cozum")
})

router.get("/kitap", function (req, res, next) {
  res.render("front/kitap")
})

router.get("/sss", function (req, res, next) {
  res.render("front/sss")
})

router.get("/hakkimizda",function (req,res,next) {
  res.render("front/sozlesme/hakkimizda")
})

module.exports = router;
