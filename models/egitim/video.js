const mongoose = require("mongoose")
const Schema = mongoose.Schema

const videoSchema = new Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    tur: { type: Number, default: 2 },
    kapak: { type: String, required: true },
    fiyat: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Videos", videoSchema)