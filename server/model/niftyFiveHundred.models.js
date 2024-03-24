const mongoose = require("mongoose");

const niftyFiveHundredSchema = new mongoose.Schema({
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

const niftyFiveHundred = new mongoose.model("niftyFiveHundred",niftyFiveHundredSchema);

module.exports = niftyFiveHundred;