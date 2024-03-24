const mongoose = require('mongoose');

const PercentSchema  = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique:true,
    },
    percent:{
        type:[Object],
        require:true,
        default:[],
    }
},{timestamps:true});


const PercentData = new mongoose.model("percent",PercentSchema);

module.exports = PercentData;

