const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth')
const NotesData = require('../model/Notes');
const User = require("../model/User");
const calcData = require("../model/CalculatorData")

//routes
// To get all notes of alluser
router.get('/getnotes',isAuthenticated,async(req,res) => {
    try {
    const data = await NotesData.find().sort({"date":-1});
    res.status(200).json(data);
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})


router.post('/postnotes',isAuthenticated,async(req,res) => {
    try {
       
    const {note,cname,id} = req.body;

    // not note present
    if(!note){
      return  res.status(400).json({
            success:false,
            massage: " Please fill the note"
        })
    }
// if the id is present means ==>  notes exist so we have to update it
if(id){
 const data = await NotesData.updateOne({_id:id},{$set:{note}});
 if(data.modifiedCount === 1){
   return  res.status(200).json("Notes Updated");
    }else{
    return res.status(200).json("Fail to Update");
 }
}
// create a note and store
else{
    
const data = new NotesData({
    note,
    cname:cname || "none",
    date:new Date().toJSON().slice(0,10),
})
 const resData = await data.save();

    const user = await User.findById(req.user._id);

    
    user.notes.push(resData._id);
    await user.save();

    return res.status(201).json("Notes Added");
 

}
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.delete("/deletenotes/:id" ,isAuthenticated,async(req,res)=> {
    try {
        const note = await NotesData.findById(req.params.id);
        if(!note){
            return res.status(404).json({
                success:false,
                message:"Note not Found",
            })
        }


    const deleteEle = await NotesData.deleteOne({ _id: req.params.id });
   
    if(deleteEle.deletedCount === 1 ){
        const user = await User.findById(req.user._id);   
        index = user.notes.indexOf(note._id);
        user.notes.splice(index,1);
         await user.save();
       
        res.status(200).send("Note Deleted")
    }else{
        res.status(400).send("Note not Deleted")
    }
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

//calculator route
router.post('/postcalcdata',isAuthenticated,async(req,res) => {
    try {
    const {day,companyName,investment,numberOfStocks,price} = req.body;

    // not note present
    if(!investment || !day || !price){
      return  res.status(400).json({
            success:false,
            massage: " Please fill the all the data"
        })
    }
    //get login user
    const user = await User.findById(req.user._id);
      
     let allCalcDataId = user.calculator;
     let allCompanyData = [];
     if(allCalcDataId.length !== 0){
        for (let i = 0; i < allCalcDataId.length; i++) {
            let a = await calcData.findById(allCalcDataId[i]);
            if(a.companyName === companyName){
                allCompanyData = [...allCompanyData,a];
            }
            
         }
     }
    // calculate avareage
    let totalInvestment = 0;
    let totalstocks = 0;
    let averagePrice = 0;
    if(allCompanyData.length === 0){
        averagePrice = price;
       
    }else{
        for (let i = 0; i < allCompanyData.length; i++) {
            totalInvestment = allCompanyData[i].investment + totalInvestment;
            totalstocks = allCompanyData[i].numberOfStocks + totalstocks;
        }
        totalInvestment = totalInvestment + investment;
        totalstocks = totalstocks + numberOfStocks;
        averagePrice = totalInvestment/totalstocks;
        averagePrice = Number(averagePrice.toFixed(2));
    }

// create a note and store    
const data = new calcData({
    day,
    companyName,
    investment,
    numberOfStocks,
    price,
    averagePrice,
    date:new Date().toJSON().slice(0,10),
})
 const resData = await data.save();

    
    user.calculator.push(resData._id);
    await user.save();

    return res.status(201).json("Record Added");
 


} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})

router.delete("/deletecalcdata/:id" ,isAuthenticated,async(req,res)=> {
    try {
        const data = await calcData.findById(req.params.id);
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Record not Found",
            })
        }


    const deleteEle = await calcData.deleteOne({ _id: req.params.id });
   
    if(deleteEle.deletedCount === 1 ){
        const user = await User.findById(req.user._id);   
        index = user.calculator.indexOf(data._id);
        user.calculator.splice(index,1);
         await user.save();
       
        res.status(200).send("Record Deleted")
    }else{
        res.status(400).send("Record not Deleted")
    }
} catch (error) {
    res.status(500).json({
        success:false,
        message:error.message,
    })
}
})


module.exports = router