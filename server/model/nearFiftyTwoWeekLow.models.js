const mongoose = require("mongoose");

const nearFiftyTwoWeekLowSchema = new mongoose.Schema({
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

const nearFiftyTwoWeekLow = new mongoose.model("nearFiftyTwoWeekLow",nearFiftyTwoWeekLowSchema);

module.exports = nearFiftyTwoWeekLow;