const async = require("async")
const Kitap = require("../../../models/egitim/kitap")

exports.list = async(req, res, next) => {
    let egitim = await Kitap.find({})
    res.render("back/egitim/egitim", {
        egitim: egitim,
    })
}

exports.insert = async(req, res, next) => {
    console.log(req.body)
    new Kitap(req.body).save((err, data) => {
            if (err) {
                res.json({ status: false, error: err })
            } else {
                res.json({ status: true })
            }
        })
        // console.log(req.files)
        // cloudinary.v2.uploader.upload(req.files, function (error, result) {
        //     if (result) {
        //         console.log(result)
        //     } else {
        //         console.log(error)
        //     }
        // });
}

exports.delete = async(req, res, next) => {
    let egitim = await Kitap.findById({ "_id": req.params.id })

    egitim.remove((err, data) => {
        if (err) {
            res.json({ status: false, error: err })
        } else {
            res.redirect("/admin/egitim")
        }
    })
}

exports.detail = async(req, res, next) => {
    let egitim = await Kitap.findById({ "_id": req.params.id })

    res.render("back/egitim/detail", {
        egitim: egitim,
    })
}
