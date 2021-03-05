const async = require("async")
const Soru = require("../models/soru/soru")
const User = require("../models/user")
const moment = require("moment")
moment.locale("tr")

exports.list = async(req,res,next)=>{
    let soru = await Soru.find({"state":true})
    let egitmen = await User.find({"tip":1})

    res.render("back/soru/rapor",{
        soru:soru,
        egitmen:egitmen,
        moment:moment
    })
}

exports.raporla = async(req,res,next)=>{
    let egitmen = await User.find({"tip":1})
    let soru = await Soru.find({state:true,eid:req.body.egitmen,createdAt:{"$gte": req.body.start, "$lt": req.body.end}})

    res.render("back/soru/rapor",{
        soru:soru,
        egitmen:egitmen,
        moment:moment
    })

}