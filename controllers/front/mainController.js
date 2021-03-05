const async = require("async")
const Kitap = require("../../models/egitim/kitap")
const Sss = require("../../models/genel/sss")
const Video = require("../../models/egitim/video")
const Evideo = require("../../models/egitim/evideo")
const Sett = require("../../models/egitim/set")

exports.index = async (req, res, next) => {
    let kitap = await Kitap.find({})
    let video = await Video.find({})
    let set = await Sett.find({})
    res.render("front/index", {
        user: req.user,
        kitap: kitap,
        set: set,
        video: video
    })
}
 
exports.kitaplar = async(req,res,next)=>{
    let kitap = await Kitap.find({})
    res.render("front/kitap",{
        user:req.user,
        kitap:kitap
    })
}

exports.kitap = async(req,res,next)=>{
    let kitap = await Kitap.findById({"_id":req.params.id})
    res.render("front/ksingle",{
        user:req.user,
        kitap
    })
}

exports.videolar = async(req,res,next)=>{
    let video = await Video.find({})
    res.render("front/video",{
        user:req.user,
        video:video
    })
}

exports.video = async(req,res,next)=>{
    let video = await Video.findById({"_id":req.params.id})
    res.render("front/vsingle",{
        user:req.user,
        video
    })
}

exports.setler = async(req,res,next)=>{
    let set = await Sett.find({})
    res.render("front/set",{
        user:req.user,
        set:set
    })
}