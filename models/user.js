
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    ad:String,
    soyad:String,
    il:String,
    ilce:String,
    tel:String,
    adres:String,
    username: String,
    password: String,
    tip: Number, //0 Admin 1 Eğitmen 2 Öğrenci 3 Dışarıdan gelen öğrenci
    state: Number, //0 pasif 1 aktif
    soru:{
        type:Number,
        default:0
    },
    cevap:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);