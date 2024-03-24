const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const User = require('../model/User');
const axios = require('axios');
const router = express.Router();

const watchList = require('../model/WatchList.models');
const companyAllSymbolsData = require('../model/PercentWatchListCompanySymbols');
const { response } = require('express');
const PercentData = require('../model/AllCompanyPercentData');
//routes

// get request to get  watchlist
router.get("/getwatchlist",isAuthenticated ,async (req, res) => {
    try {
        const data = await watchList.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
})

// post request to add data from maintable to watchlist i.e. add to watchlist
router.post('/postwatchlist',isAuthenticated ,async (req, res) => {
   
    try { 
        
    const { companyName, percentage,symbol, price, link, candleStick, date } = req.body;

    if (!companyName || !price || !percentage || !symbol || !link || !candleStick) {
      
      return  res.status(400).json({
          success:false,
          message:"Not getting all feilds"
      })
    }
        
     const response1 = await watchList.findOne({companyName,percentage,symbol,price,candleStick,date});
        if(response1){
            
            return  res.status(400).json({
                success:false,
                message:"Data Already in Watchlist"
            });   
        }

          const data = new watchList({
                companyName,percentage,symbol,price,link,candleStick,date
            });

       const  res12 =  await data.save();

       const user = await User.findById(req.user._id);

      

        user.watchlist.push(res12._id);
        await user.save();

          return  res.status(200).json({
              success:true,
              message:"Data Added to watchlist"
          });   
        
   
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

// delete = to remove ele from watchlist and add it to the normal list 
router.delete('/deleteWatchlist/:id',isAuthenticated, async (req, res) => {
    try {
       const watch = await watchList.findById(req.params.id)

       if(!watch){
        return res.status(404).json({
            success:false,
            message:"Company not Found in Watchlist",
        })

       }

    const deleteEle = await watchList.deleteOne({ _id: req.params.id });
    if(deleteEle.deletedCount === 1 ){
        const user = await User.findById(req.user._id);
        const index = user.watchlist.indexOf(watch._id);
         user.watchlist.splice(index,1);
         await user.save();
        res.status(200).json("Successfully removed from Watchist");
    }else{
        res.status(400).json({
            success:true,
            message:"Not Removed from Watchlist",
        })
    }

} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
   
})


router.get("/percent",isAuthenticated ,async (req, res) => {
    try {
    //    const SYMBOL = ['ZENSARTECH','GLAND','WIPRO','TCS','BIOCON','CHEMPLASTS','THYROCARE','SYMPHONY','SIS','IDFCFIRSTB','WELSPUNIND','GLS'];
    //    const DATAARR = [];
    //    let a;
    //  const response11 = await axios({
    //     method: 'get',
    //     url: "https://www.nseindia.com/",
    //     headers: {}
    //   })


    //   for(let i = 0; i < SYMBOL.length; i++){
    //   let response31 = await axios({
    //     method: "get",
    //     url: `https://www.nseindia.com/api/quote-equity?symbol=${SYMBOL[i]}&section=trade_info`,
    //     headers: {
    //      cookie: response11.headers['set-cookie'] // cookie is returned as a header
    //     }
    //   })
      
    
    //  let percent = response31 && response31.data && response31.data.securityWiseDP && response31.data.securityWiseDP.deliveryToTradedQuantity  && response31.data.securityWiseDP.deliveryToTradedQuantity;
    //    let companySymbol = SYMBOL[i];
    // //    oneCompanyRecord={[b]:a}
    //    oneCompanyRecord={symbol:companySymbol,percent:percent}
    //    DATAARR.push(oneCompanyRecord)
    // }
    const {page,range} = req.query;
    let startRange = page ? (page-1)*10 : 0;
    let totalCount;
    if(!page){
        page = 1;
    }
    if(!range){
        range = 'all';
    }
    const data = await PercentData.findOne({name:'percent'});
        // console.log(data.percent);
        let {percent} = data;
        switch(range){
          case 'all':
            totalCount= percent.length;
            percent.sort((a,b) => {
                return a.percent - b.percent;
              })
            percent = percent.slice(startRange,startRange+10);
            break;

            case 'below30':
                percent = percent.filter(ele => ele.percent <=30);
                percent.sort((a,b) => {
                      return a.percent - b.percent;
                    })
                totalCount = percent.length;
                percent = percent.slice(startRange,startRange+10);
                break;
                
            case 'below50':
                percent = percent.filter(ele => ele.percent > 30 && ele.percent <= 50);
                percent.sort((a,b) => {
                    return a.percent - b.percent;
                  })
                totalCount = percent.length;
                percent = percent.slice(startRange,startRange+10);
                break;

            
            case 'below70':
                percent = percent.filter(ele => ele.percent > 50 && ele.percent <= 70);
                percent.sort((a,b) => {
                    return a.percent - b.percent;
                  })
                totalCount = percent.length;
                percent = percent.slice(startRange,startRange+10);
                break;
                
            case 'below100':
                percent = percent.filter(ele => ele.percent > 70 && ele.percent <= 100);
                percent.sort((a,b) => {
                    return a.percent - b.percent;
                  })
                totalCount = percent.length;
                percent = percent.slice(startRange,startRange+10);
                break;
        }

        res.status(200).json({status:'success',data:percent?.length > 0 ? percent : [], totalCount : totalCount,page:page,});
    }
    catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
})

router.get('/percent/search/:value',isAuthenticated,async(req,res) => {
    try {
        const data = await PercentData.findOne({name:'percent'});
        let {percent} = data;
        const searchData = [];
        for (let i = 0; i < percent.length; i++) {
         if(percent[i].symbol.toLowerCase().includes(req.params.value.toLowerCase()))
          searchData.push(percent[i]);
          if(searchData.length === 10){
            break;
          }
        }
        res.status(200).json({status:'success',data:searchData});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

router.get('/percent/watchlist',isAuthenticated,async(req,res) => {
    try {
        const data = await PercentData.findOne({name:'watch_percent'});
    
        res.status(200).json({status:'success',data:data ? data : []});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

// companyAllSymbolsData,PercentData
router.post('/percent/addwatchList',isAuthenticated,async(req,res)=> {
    try {
        const {ele} = req.body;
        let symbol = ele && ele.symbol;

        // const d = new PercentData({
        //     name:'percent',
        //     percent:[],
        // })
        // const d2 = new PercentData({
        //     name:'watch_percent',
        //     percent:[],
        // })

        // const d1 = new companyAllSymbolsData({
        //     name:'symbols',
        //     percent:[]
        // })
        // const d4 = new companyAllSymbolsData({
        //     name:'watch_symbols',
        //     percent:[]
        // })

        // const d11 = await d.save();
        // const d111 = await d1.save();
        // const d12 = await d2.save();
        // const d13 = await d4.save();
        
        const data = await PercentData.findOne({name:'watch_percent'})
        const datasym = await companyAllSymbolsData.findOne({name:'watch_symbols'});

      

        if(!data || !datasym){
            return res.status(500).json({
                success:false,
                message:"Unable to store in DB"
            })
        }

       let index = datasym.symbol.indexOf(symbol)
       if(index !== -1){
        return res.status(500).json({
            status:'error',
            message:"Data Already in Watchlist",
        })
       }
          
        data.percent.push(ele);
        datasym.symbol.push(symbol)

        await data.save();
        await datasym.save();

        return res.status(200).json({
            status:"success",
            message: `${symbol} Successfully added to Watchlist`
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
    
})

router.post('/percent/deletewatchList',isAuthenticated,async(req,res)=> {
    try {
      
        const {symbol} = req.body;
     
        // first check the symbol 
        if(!symbol){
            return res.status(500).json({
                status:'success',
                message:'Symbol is required',
            })
        }
        //find element from db 
    //    const per = await PercentData.findOne({name:'percent'})
        const perWatch = await PercentData.findOne({name:'watch_percent'})
        const watchSymbol = await companyAllSymbolsData.findOne({name:'watch_symbols'});

// ifnot found the element then return the element
        if(!perWatch || !watchSymbol){
            return res.status(500).json({
                status:'success',
                message:'Not removed from Watchlist'
            })
        }

        // if element found then find the index of that element
        //  let percentindex ;
         let watchpercentindex ;
         let watchSymbolIndex ;

       
      
        // for(let i=0;i<per.percent.length;i++){
        //    if(per.percent[i].symbol === symbol){
        //       percentindex = i;
        //    }
        // }
        for(let i=0;i<perWatch.percent.length;i++){
           if(perWatch.percent[i].symbol === symbol){
           
            watchpercentindex = i;
           }
        }

        watchSymbolIndex = watchSymbol.symbol.indexOf(symbol);

        // if the index of that element not found then return error
        if(watchpercentindex < 0 || watchSymbolIndex === -1){
            return res.status(500).json({
                status:'success',
                message:'Element not found'
            })
        }

        // if the element found then reomove from the list
        // per.percent.splice(percentindex,1);
        perWatch.percent.splice(watchpercentindex,1);
        watchSymbol.symbol.splice(watchSymbolIndex,1);

        // await per.save();
        await perWatch.save();
        await watchSymbol.save();
        
        res.status(200).json({status:'success',message:`${symbol} successfully removed from the watchlist`});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
    
})




module.exports = router