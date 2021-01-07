
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var User = new Schema({
    username: String,
    password: String,
    name: String,
    il: String,
    ilce: String,
    tel: String,
    okul: String,
    surname: String,
    type: {type:Number,default:1}
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);