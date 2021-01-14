const express = require('express');
const router = express.Router();
const async = require("async")
const User = require("../models/user")
const passport = require("passport");

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
      //req.isAuthenticated() will return true if user is logged in
      next();
  } else{
      res.redirect("/users/login");
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/index', { title: 'Express' });
});

router.get('/basarili',function(req,res,next){
  res.render('front/basarili',{
    user:req.user
  })
})

router.get('/login',async(req,res,next)=>{
  res.render("front/login")
})

router.get('/kampp',async(req,res,next)=>{
  res.render("front/live/live",{
    user:req.user
  })
})

router.get("/gizlilik",function (req,res,next) {
  res.render("front/sozlesme/gizlilik")
})

router.get("/mesafeli",function (req,res,next) {
  res.render("front/sozlesme/mesafeli")
})

router.get("/kullanici",function (req,res,next) {
  res.render("front/sozlesme/kullanici")
})

router.get("/sorucozumleri",function (req,res,next) {
  res.render("front/cozum/cozum")
})

router.get("/kitap",function (req,res,next) {
  res.render("front/kitap")
})

router.get("/sss",function(req,res,next) {
  res.render("front/sss")
})

module.exports = router;
