const async = require("async")
const Iyzipay = require("iyzipay")
const User = require("../../models/user")
const Kitap = require("../../models/egitim/egitim")
const Video = require("../../models/egitim/video")
const Satis = require("../../models/kasa/satis")
const session = require("express-session")
const moment = require("moment")

var iyzipay = new Iyzipay({
    apiKey: "ZWZp5hKb8tmVgjo8HgBU77X7coIozMtC",
    secretKey: "iLBgeqekuRTvhBYLlRunGWX1Do0CAeah",
    uri: 'https://api.iyzipay.com'
});

// var iyzipay = new Iyzipay({
//     apiKey: "sandbox-2RcLCpekkDh8ZOdLyMxEeJ1h6IaaZDxv",
//     secretKey: "sandbox-I1pD3ciPcbTTS6aV67uUl4AyJttQe9VG",
//     uri: 'https://sandbox-api.iyzipay.com'
// });


exports.kitapal = async(req, res, next) => {
    let kitap = await Kitap.findById({ "_id": req.params.kid })
    console.log(kitap)
    res.render("front/satinal", {
        user: req.user,
        kitap: kitap
    })
}

exports.payment = async(req, res, next) => {
    session.user = req.body
    let kitap = await Kitap.findById({ "_id": req.body.kitap })
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: kitap.price.toString(),
        paidPrice: kitap.price.toString(),
        currency: Iyzipay.CURRENCY.TRY,
        basketId: 'B67832',
        paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
        callbackUrl: 'https://akcaonline.com/onayla/' + kitap._id,
        enabledInstallments: [2, 3, 6, 9],
        buyer: {
            id: 'BY789',
            name: req.body.ad,
            surname: req.body.soyad,
            gsmNumber: req.body.telefon,
            email: req.body.mail,
            identityNumber: '00000000000',
            lastLoginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            registrationDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            registrationAddress: req.body.adres,
            ip: '85.34.78.112',
            city: req.body.il,
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: req.body.ad + " " + req.body.soyad,
            city: req.body.il,
            country: 'Turkey',
            address: req.body.adres,
            zipCode: '34742'
        },
        billingAddress: {
            contactName: req.body.ad + " " + req.body.soyad,
            city: req.body.il,
            country: 'Turkey',
            address: req.body.adres,
            zipCode: '34742'
        },
        basketItems: [{
            id: 'BI101',
            name: 'Binocular',
            category1: 'Collectibles',
            category2: 'Accessories',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: kitap.price.toString()
        }]
    };
    iyzipay.checkoutFormInitialize.create(request, function(err, result) {
        res.send(result.checkoutFormContent + '<div id="iyzipay-checkout-form" class="responsive"></div>')
    });
}

exports.vpayment = async(req, res, next) => {
    let video = await Video.findById({ "_id": req.params.vid })
    session.video = video
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: '123456789',
        price: video.fiyat.toString(),
        paidPrice: video.fiyat.toString(),
        currency: Iyzipay.CURRENCY.TRY,
        basketId: 'B67832',
        paymentGroup: Iyzipay.PAYMENT_GROUP.LISTING,
        callbackUrl: 'https://akcaonline.com/onaylavideo',
        enabledInstallments: [2, 3, 6, 9],
        buyer: {
            id: 'BY789',
            name: req.user.ad,
            surname: req.user.soyad,
            gsmNumber: req.user.ad,
            email: req.user.username,
            identityNumber: '00000000000',
            lastLoginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            registrationDate: moment().format("YYYY-MM-DD HH:mm:ss"),
            registrationAddress: req.user.ad,
            ip: '85.34.78.112',
            city: req.user.ad,
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: req.user.ad + " " + req.user.soyad,
            city: req.user.ad,
            country: 'Turkey',
            address: req.user.ad,
            zipCode: '34742'
        },
        billingAddress: {
            contactName: req.user.ad + " " + req.user.soyad,
            city: req.user.ad,
            country: 'Turkey',
            address: req.user.ad,
            zipCode: '34742'
        },
        basketItems: [{
            id: 'BI101',
            name: 'Binocular',
            category1: 'Collectibles',
            category2: 'Accessories',
            itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
            price: video.fiyat.toString()
        }]
    };
    iyzipay.checkoutFormInitialize.create(request, function(err, result) {
        res.send(result.checkoutFormContent + '<div id="iyzipay-checkout-form" class="responsive"></div>')
    });
}

exports.yonlendir = async(req, res, next) => {
    let kitap = await Kitap.findById({ "_id": session.user.kitap })
    new Satis({
        user: session.user,
        urun: kitap
    }).save((err, data) => {
        if (err) {
            res.send("Başarısız")
        } else {
            res.redirect("/success")
        }
    })
}

exports.yonlendirvideo = async(req, res, next) => {
    new Satis({
        user: req.user,
        urun: session.video,
        type: 1
    }).save((err, data) => {
        if (err) {
            res.send("Başarısız")
        } else {
            res.redirect("/profil")
        }
    })
}