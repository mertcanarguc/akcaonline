const express = require('express');
const router = express.Router();
const async = require("async")
const User = require("../models/user")
const passport = require("passport");
const mainController = require("../controllers/front/mainController")
const sepetController = require("../controllers/front/sepetController")

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    //req.isAuthenticated() will return true if user is logged in
    next();
  } else {
    res.redirect("/users/login");
  }
}
//ANASAYFAMIZ
router.get('/', mainController.index);
//KİTAPLARIMIZ
router.get('/kitaplar',mainController.kitaplar)
router.get('/kitap/:id',mainController.kitap)
//SORU ÇÖZÜMLERİMİZ
router.get('/video',mainController.videolar)
router.get('/video/:id',mainController.video)
//SETLERİMİZ
router.get('/setlerimiz',mainController.setler)
router.get('/set/:id',mainController.set)
//SEPET
router.get("/sepet",sepetController.sepet)
router.post("/sepeteekle",sepetController.insert)
router.post("/sepetgetir",sepetController.list)
router.get("/iletisim",mainController.contact)

router.get('/basarili', function (req, res, next) {
  res.render('front/basarili', {
    user: req.user
  })
})

router.get('/login', async (req, res, next) => {
  res.render("front/login")
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
