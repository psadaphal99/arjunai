const mongoose = require("mongoose");

const recoveryFromIntradayLowSchema = new mongoose.Schema({
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

const recoveryFromIntradayLow = new mongoose.model("recoveryFromIntradayLow",recoveryFromIntradayLowSchema);

module.exports = recoveryFromIntradayLow;