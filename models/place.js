const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const placeSchema = new Schema({
    name: String,
    googleId: String,
    lat: Number,
    lng: Number,
    inStock: Boolean
}, { timestamps: {} })

module.exports = mongoose.model('Place', placeSchema)