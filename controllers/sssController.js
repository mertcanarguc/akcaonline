const async = require("async")
const Sss = require("../models/sss")

exports.list = async(req,res,next)=>{
    let sss = await Sss.find({})
    res.render("back/sss",{
        user:req.user,
        sss:sss
    })
}