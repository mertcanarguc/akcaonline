const mongoose = require("mongoose")
const Schema = mongoose.Schema

const setSchema = new Schema({
    title:String,
    tur: { type: Number, default: 3 },
    fiyat:Number,
    kitap:Object,
    video:Object,
    kapak:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Set",setSchema)