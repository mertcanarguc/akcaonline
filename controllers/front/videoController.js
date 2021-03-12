const async = require("async")
const Video = require("../../models/egitim/video")
const Evideo = require("../../models/egitim/evideo")

exports.single = async(req,res,next)=>{
    let video = await Video.findById({"_id":req.params.id})
    let evideo = await Evideo.find({"video":video._id})
    res.render("front/videolist",{
        video,
        evideo,
        user:req.user
    })
}