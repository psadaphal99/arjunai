const mongoose = require("mongoose");

const hourlygainersSchema = new mongoose.Schema({
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

const hourlygainers = new mongoose.model("hourlyGainers", hourlygainersSchema);

module.exports = hourlygainers;