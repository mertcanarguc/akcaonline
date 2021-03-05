const async = require("async")
const Satis = require("../../models/kasa/satis")

exports.profile = async(req, res, next) => {
    let satis = await Satis.find({ "user._id": req.user._id, "type": 1 })
    res.render("front/auth/profile", {
        user: req.user,
        satis: satis
    })
}