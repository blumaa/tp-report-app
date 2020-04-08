const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    itemName: String,
    status: String,
    placeId: String,
    googleId: String,
    dateTime: String
}, { timestamps: {} })

module.exports = mongoose.model('Report', reportSchema)