const async = require("async")
const kitap = require("../../models/egitim/kitap")
const Sepet = require("../../models/sepet")
const Kitap = require("../../models/egitim/kitap")

exports.sepet = async(req,res,next)=>{
    res.render("front/sepet",{
        user:req.user
    })
}

exports.list = async(req,res,next)=>{
    let sepet = await Sepet.find({ })
    if (sepet) {
        res.json({
            status:true,
            sepet:sepet
        })
    } else {
        res.json({status:false})
    }
}

exports.insert = async(req,res,next)=>{
    let kitap = await Kitap.findById({"_id":req.body.item})
    new Sepet({
        user:req.user,
        item:kitap
    }).save((err,data)=>{
        if (err) {
            res.json({status:false})
        } else {
            res.json({status:true})
        }
    })
}

exports.delete = async(req,res,next)=>{
    let sepet = await Sepet.findById({"_id":req.body.sepet})
    sepet.remove((err,data)=>{
        if (err) {
            res.json({status:false})
        } else {
            res.json({status:true})
        }
    })
}
