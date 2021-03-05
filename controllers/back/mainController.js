const async = require("async")
const User = require("../../models/user")

exports.main = async(req, res, next) => {
    let egitmen = await User.find({ "tip": 1 }).count()
    let ogrenci = await User.find({ "tip": 2 }).count()
    res.render("back/index", {
        egitmen: egitmen,
        ogrenci: ogrenci
    })
}