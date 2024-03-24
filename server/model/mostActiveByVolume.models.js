const mongoose = require("mongoose");

const mostActiveByVolumeSchema = new mongoose.Schema({
    companyName: {
        type: String
    },
    percentage: {
        type: String
    },
    symbol: {
        type: String
    },
    price: {
        type: String
    },
    link: {
        type: String
    },
    candleStick: {
        type: String
    },
    date: {
        type: Date
    }
},{
    timestamps: true
});

const mostActiveByVolume = new mongoose.model("mostActiveByVolume",mostActiveByVolumeSchema);

module.exports = mostActiveByVolume;