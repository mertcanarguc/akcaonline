const async = require("async")
const Kitap = require("../../../models/egitim/kitap")
const Video = require("../../../models/egitim/video")
const Sett = require("../../../models/egitim/set")

exports.list = async (req, res, next) => {
    let kitap = await Kitap.find({})
    let video = await Video.find({})
    let set = await Sett.find({})
    res.render("back/set/set", {
        kitap,
        video,
        set
    })
}

exports.insert = async (req, res, next) => {
    let kitap = await Kitap.findById({"_id":req.body.kitap})
    let video = await Video.findById({"_id":req.body.video})
    new Sett({
        title: req.body.title,
        fiyat: req.body.fiyat,
        kitap: kitap,
        video: video,
        kapak: req.body.kapak,
    }).save((err,data)=>{
        if (err) {
            console.log(err)
        } else {
            res.redirect("/admin/set")
        }
    })
}