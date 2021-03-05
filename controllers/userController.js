const async = require("async")
const Brans = require("../models/sistem/brans")
const Seviye = require("../models/sistem/seviye")

exports.login = async(req,res,next)=>{
    let brans = await Brans.find({})
    let seviye = await Seviye.find({})
    res.render("front/auth/login",{
        brans:brans,
        seviye:seviye
    })
}