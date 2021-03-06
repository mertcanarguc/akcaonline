const mongoose = require("mongoose")
const Schema = mongoose.Schema

const kitapSchema = new Schema({
    title: { type: String },
    desc: { type: String },
    fiyat: { type: Number },
    kapak: { type: String },
    tur: { type: Number, default: 1 },
    url: { type: String },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("Kitap", kitapSchema)