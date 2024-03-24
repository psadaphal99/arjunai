const mongoose = require('mongoose');

const PercentWatchlistSchema  = new mongoose.Schema({
    name:{
      type:String,
      require:true,
      unique:true,
    },
    symbol:{
        type:[String],
        require:true,
        default:[],
    }
},{timestamps:true});


const PercentWatchlistData = new mongoose.model("symbols",PercentWatchlistSchema);

module.exports = PercentWatchlistData;

