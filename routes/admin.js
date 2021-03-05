const express = require('express');
const router = express.Router();
const mainController = require('../controllers/back/mainController')
const egitimController = require('../controllers/back/egitim/egitimController')
const videoController = require('../controllers/back/egitim/videoController')
const sssController = require('../controllers/back/genel/sssController')
const setController = require('../controllers/back/egitim/setController');
const set = require('../models/egitim/set');

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        // req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/admin/giris");
    }
}

router.get("/giris", async(req, res, next) => {
    res.render("back/login")
})

    //ANASAYFA
router.get("/",mainController.main)
    //EĞİTİM
router.get("/egitim",egitimController.list)
router.post("/egitim/insert",egitimController.insert)
router.get("/egitim/delete/:id",egitimController.delete)
router.get("/egitim/detail/:id",egitimController.detail)
    //ONLİNE
router.get("/video",videoController.list)
router.post("/video/insert",videoController.insert)
router.post("/video/ekle",videoController.ekle)
router.get("/video/detail/:id",videoController.detail)
    //SSS
router.get("/sss",sssController.list)
router.post("/sss/insert",sssController.insert)
router.get("/sss/update/:id",sssController.update)
router.get("/sss/delete/:id",sssController.delete)
router.get("/sss/detail/:id",sssController.detail)
    //SETLER
router.get("/set",setController.list)
router.post("/setekle",setController.insert)


module.exports = router;