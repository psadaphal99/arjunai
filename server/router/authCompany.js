// this file is for router
const express = require('express');


// we use only router from express
const router = express.Router();

// to do operation on mongodb we import schema and model 

const TopLosers = require('../model/topLosers.model');
const RecoveryFromIntradayLow = require('../model/recoveryFromIntradayLow.models');
const MostActiveByVolume = require('../model/mostActiveByVolume.models');
const NearFiftyTwoWeekLow = require('../model/nearFiftyTwoWeekLow.models');
const HourlyGainers = require('../model/hourlyGainers.models');
const NiftySmallCapHundred = require('../model/niftySmallCapHundred.models');
const NiftyFiveHundred = require('../model/niftyFiveHundred.models');



const {isAuthenticated} = require('../middleware/auth');

// const ActiveDate = require('../model/ActiveDate');

// function to remove dublicate entry  
const func = (obj1) => {
    jsonObject = obj1.map(JSON.stringify);
    uniqueSet = new Set(jsonObject);
    uniqueArray = Array.from(uniqueSet).map(JSON.parse);
    return uniqueArray;
}


// get the all top losers 
router.get("/getdate",isAuthenticated, async (req, res) => {
    try{
    let data = await TopLosers.find();
    let data1 = await RecoveryFromIntradayLow.find();
      data = [...data,...data1]
    let Activedate = []
    for (let i = 0; i < data.length; i++) {
      let a = data[i].date.toJSON().slice(0,10);
       Activedate = [...Activedate,a];
    }
       
       Activedate = [...new Set(Activedate)] 
     
    res.status(200).json(Activedate);
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

//get top loser for sopecified date 
router.get('/gettoplosers/:today/:nextday',isAuthenticated,async(req,res) => {
    try {
    
         const data = await TopLosers.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
        filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
   
        return res.status(200).json(filterdata)

    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message,
        })
    }
})

router.get("/getintradaylow/:today/:nextday",isAuthenticated, async (req, res) => {
    try {
        
    const data = await RecoveryFromIntradayLow.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})

    filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
    
    return res.status(200).json(filterdata)

} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/getactivevolume/:today/:nextday",isAuthenticated, async (req, res) => {
    try {
    const data = await MostActiveByVolume.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

    return res.status(200).json(filterdata)
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/getfiftyweeklow/:today/:nextday",isAuthenticated, async (req, res) => {
    try {
      

    const data = await NearFiftyTwoWeekLow.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
    filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
    
    return res.status(200).json(filterdata)
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/gethourlygainers/:today/:nextday",isAuthenticated, async (req, res) => {
    try {
    const data = await HourlyGainers.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
    filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
    
    return res.status(200).json(filterdata)
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/niftyhundred/:today/:nextday",isAuthenticated, async (req, res) => {
    try {
    const data = await NiftySmallCapHundred.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
    filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
    
    return res.status(200).json(filterdata)
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/getniftyfivehundred/:today/:nextday",isAuthenticated, async (req, res) => {
    try {
    const data = await NiftyFiveHundred.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
    filterdata = data.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
    
    return res.status(200).json(filterdata)
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/search/:name",isAuthenticated, async (req, res) => {
    try{
    let regex = new RegExp(req.params.name,'i');
    let data = await TopLosers.find({companyName:{$regex :regex}});
    let data1=  await RecoveryFromIntradayLow.find({companyName:{$regex :regex}});
    let data2=  await MostActiveByVolume.find({companyName:{$regex :regex}});
    let data3 = await NearFiftyTwoWeekLow.find({companyName:{$regex :regex}});
    let data4=  await HourlyGainers.find({companyName:{$regex :regex}});
    let data5=  await NiftySmallCapHundred.find({companyName:{$regex :regex}});
    let data6=  await NiftyFiveHundred.find({companyName:{$regex :regex}});
    
   data = [...data,...data1,...data2,...data3,...data4,...data5,...data6];
   let uniqueData = []
   for (let i = 0; i < data.length; i++) {
       uniqueData = [...uniqueData,{companyName:data[i].companyName,
        percentage:data[i].percentage,
        symbol:data[i].symbol,
        price:data[i].price,
        link:data[i].link,
        candleStick:data[i].candleStick,
        date:data[i].date.toJSON().slice(0,10)}]
       
   }
   uniqueData = func(uniqueData);
   
    res.status(200).json(uniqueData);
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.get("/getallcandle/:today/:nextday",isAuthenticated,async (req,res)=> {
  try {
    let data1 = await TopLosers.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})

    data1 = data1.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

    let data2 = await RecoveryFromIntradayLow.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})

    data2 = data2.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

    let data3 = await MostActiveByVolume.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})

    data3 = data3.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

   let data4 = await NearFiftyTwoWeekLow.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
   data4 = data4.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)
    
  let data5 =  await HourlyGainers.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
  data5 = data5.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

    let data6 =  await NiftySmallCapHundred.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
    data6 = data6.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

  let data7 = await NiftyFiveHundred.find({"createdAt":{$gte: new Date(req.params.today),$lte:new Date(req.params.nextday)}}).sort({date:1})
    
  data7 = data7.filter(ele => ele.companyName[0] !== '\n' && ele.symbol !== '\n' && !ele.companyName.includes("STOCK NAME") && ele.companyName.length !== 0)

  let data = [...data1,...data2,...data3,...data4,...data5,...data6,...data7];

  return res.status(200).json(data)


  } catch (error) {
      res.status(400).json({
          success:false,
          message:error.message
      })
      
  }


})

module.exports = router;







