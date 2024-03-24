const mongoose = require("mongoose");

const caclDataSchema = new mongoose.Schema({
    day: {
        type: String
    },
    companyName: {
        type: String
    },
    investment: {
        type: Number
    },
    numberOfStocks: {
        type: Number
    },
    price: {
        type: Number
    },
    averagePrice:{
        type:Number
    },
    date: {
        type: Date
    }
},{
    timestamps: true
});

const calcData = new mongoose.model("calcdata", caclDataSchema);

module.exports = calcData;