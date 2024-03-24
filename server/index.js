const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();



app.use(cors(corsOptions))

dotenv.config({path:'./config.env'});
require('./db/conn')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


const whitelist = process.env.ALLOWED_URL_LIST;

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }
  }
}


// const user =require('./model/userSchema');


app.use("/api/v1",require("./router/authCompany"));
app.use("/api/v1",require("./router/Notes"));
app.use("/api/v1",require("./router/WatchList"));
app.use("/api/v1",require("./router/User"));

const port = process.env.PORT;

app.listen(port,()=> {
    console.log("app is run on port 5000");
})




  