const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sssSchema = new Schema({
    soru:{type:String,required:true},
    cevap:{type:String,required:true},
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Sss",sssSchema)