const async = require("async")
const Sepet = require("../../models/sepet")

exports.sepet = async(req,res,next)=>{
    res.render("front/sepet",{
        user:req.user
    })
}

exports.list = async(req,res,next)=>{
    let sepet = await Sepet.find({"user._id":req.user._id})
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
    new Sepet({

    }).save((err,data)=>{
        if (err) {
            res.json({status:false})
        } else {
            res.json({status:true})
        }
    })
}

exports.delete = async(req,res,next)=>{
    let sepet = await Sepet.findById({"_id":req.params.id})
    sepet.remove((err,data)=>{
        if (err) {
            res.json({status:false})
        } else {
            res.json({status:true})
        }
    })
}
