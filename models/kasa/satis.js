const mongoose = require("mongoose")
const Schema = mongoose.Schema

const satisSchema = new Schema({
    user: Object,
    urun: Object,
    type: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Satis", satisSchema)