const async = require("async")
const Video = require("../../../models/egitim/video")
const Evideo = require("../../../models/egitim/evideo")
const moment = require("moment")
moment.locale("tr")

exports.list = async(req, res, next) => {
    let video = await Video.find({})
    res.render("back/video/video", {
        video: video
    })
}

exports.insert = async(req, res, next) => {
    console.log(req.body)
    new Video(req.body).save((err, data) => {
        if (err) {
            res.json({ status: false, error: err })
        } else {
            res.json({ status: true })
        }
    })
}

exports.ekle = async(req, res, next) => {
    new Evideo({
        video: req.body.sid,
        title: req.body.title,
        url: req.body.url
    }).save((err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.json({ status: true })
        }
    })
}

exports.detail = async(req, res, next) => {
    let video = await Video.findById({ "_id": req.params.id })
    let evideo = await Evideo.find({ "video": video._id })
    res.render("back/video/detail", {
        video: video,
        evideo: evideo
    })
}