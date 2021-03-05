const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sssSchema = new Schema({
    soru:String,
    cevap:String,
})

module.exports = mongoose.model("Sss",sssSchema)