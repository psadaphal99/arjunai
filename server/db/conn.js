const mongoose = require('mongoose');

const DbUrl = process.env.DATABASE;
const connectionParams = {
    useNewUrlParser:true,
    useUnifiedTopology:true
};

mongoose.connect(DbUrl,connectionParams).then(() => { console.info("connected to the database");}).catch((e) => { console.log("Error : ",e); });