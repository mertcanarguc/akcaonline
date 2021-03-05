const mongoose = require("mongoose")
const Schema = mongoose.Schema

const sepetSchema = new Schema({
    item:Object,
    user:Object,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Sepet",sepetSchema)