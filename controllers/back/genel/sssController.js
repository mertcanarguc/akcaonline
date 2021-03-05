const async = require("async")
const Sss = require("../../../models/genel/sss")

exports.list = async(req,res,next)=>{
    let sss = await Sss.find({ })
    res.render("back/genel/sss",{
        sss:sss
    })
}

exports.insert = async(req,res,next)=>{
    new Sss(req.body).save((err,data)=>{
        if (err) {
            res.json({status:false,error:err})
        } else {
            res.redirect("/admin/sss")
        }
    })
}

exports.update = async(req,res,next)=>{
    let sss = await Sss.findById({"_id":req.params.id})

    sss.update(req,body,(err,data)=>{
        if (err) {
            res.json({status:false,error:err})
        } else {
            res.redirect("")
        }
    })
}

exports.delete = async(req,res,next)=>{
    let sss = await Sss.findById({"_id":req.params.id})

    sss.remove((err,data)=>{
        if (err) {
            res.json({status:false,error:err})
        } else {
            res.redirect("/admin/sss")
        }
    })
}

exports.detail = async(req,res,next)=>{
    let sss = await Sss.findById({"_id":req.params.id})
    
    res.render("",{
        sss:sss
    })
}