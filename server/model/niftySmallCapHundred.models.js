const mongoose = require("mongoose");

const niftySmallCapHundredSchema = new mongoose.Schema({
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

const niftySmallCapHundred = new mongoose.model("niftySmallCapHundred",niftySmallCapHundredSchema);

module.exports = niftySmallCapHundred;