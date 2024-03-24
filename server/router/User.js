const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const NotesData = require('../model/Notes');

const router = express.Router();

const User = require("../model/User");

const cors = require('cors');

const whitelist = process.env.ALLOWED_URL_LIST;
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    }
  }
}


// router.post("/register",async (req,res) => {
// try {
//     const { name,email,password } = req.body;

//     if(!name || !email || !password){
//         return res.status(400).json({
//             success:false,
//             message:"Please Filled all the feild",
//         })
//     }

//     //find user exist or not
//     let user = await User.findOne({email});

//     //if user exist then
//     if(user){
//        return res.status(400).json({
//             success:false,
//             message:"User Already Exist"
//         })
//     }

//     user = await User.create({
//         name,
//         email,
//         password,
//     })

//     return res.status(201).json({
//         success:true,
//         message:"User Created"

//     })

// } catch (err) {
//     return res.status(500).json({
//         success:false,
//         message:err.message,
//     })
// }
// })

router.post("/login",async (req,res) => {
  try{
   const {email,password} = req.body;
  
   // if user not entered both email and password
   if(!email || !password){
      return res.status(400).json({
           success:false,
           message:"Please Enter the Email and Password both",
       })
   }

   // check user exist or not
   const user = await User.findOne({email}).select("+password");

   // if user not exist
   if(!user){
     return  res.status(400).json({
           success:false,
           message:"User Does not exist"
       })
   }

  // else user exist then match the password
    // this method is made in userSchema
  const isMatch = await user.matchPassword(password);

  if(!isMatch){
     return res.status(400).json({
          success:false,
          message:"Incorrect Password"
      })
  }

    // if both username and password are correct 
    //  to idetify login user we will make one token and store it in cookie
    const token = await user.generateToken();
      
  // const option =  {
  //   expires:new Date(Date.now() + 90*24*60*60*1000),
  //   httpOnly:true,
  //  }

  
 return res.status(200).json({
      success:true,
      user,
      token,
  })


  }catch(err){
     return res.status(500).json({
        success:false,
        message:err.message
      })
  }

}
  )

  //  logout
 router.get("/logout", async (req,res) => {
    try {
      
     return res
     .status(200)
     .cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
     .json({
       success:true,
       message:"Logged Out",
     })
  
    } catch (err) {
      res.status(500).json({
        success:false,
        message:err.message,
      })
      
    }
  }
 )

//  get full profile with populated notes 
 router.get("/me",isAuthenticated,async (req,res)=> {
  try {
     
    const user   = await User.findById(req.user._id).populate("notes watchlist calculator");
      
       return res.status(200).json({
         success:true,
         user,
       })
    
      } catch (err) {
        res.status(500).json({
          success:false,
          message:err,
        }) 
      }
 })

 // update Password
 router.put("/update/password",isAuthenticated,async (req,res) => {
   
  try {
    const user  =  await User.findById(req.user._id).select("+password");
    const { oldPassword , newPassword } = req.body;
 
    if(!oldPassword || !newPassword){
      return res.status(400).json({
        success:false,
        message:"Please provide old and new password",
      })
    }
 
    const isMatch =  await user.matchPassword(oldPassword);
 
    if(!isMatch) {
      return res.status(400).json({
        success:false,
        message:"Incorrect old password"
      })
    }
 
    user.password = newPassword;
    await user.save()
 
    return res.status(200).json({
      success:true,
      message:"Password updated",
    })
 
 
 
 
  } catch (err) {
    res.status(500).json({
      success:false,
      message:err.message,
    })
    
  }
  })

  // delete me 

  router.delete("/delete/me",isAuthenticated,async(req,res) => {
    try {
      
      const user  = await User.findById(req.user._id);

    if(!user){
      return res.status(404).json({
        success:false,
        message:"Logged user not found",
      })
    }
      const allnotes = user.notes;
      //remove user
    await user.remove();

    // if user not exist then logout it by clearing the cookie
    res
    .cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true,
     })
    


      for (let i = 0; i < allnotes.length; i++) {
        const fullnote = await NotesData.findById(allnotes[i])
        await fullnote.remove();
        
      }

      return res.status(200).json({
        success:true,
        message:"User Deleted",
      })





    } catch (err) {
      res.status(500).json({
        success:false,
        message:err.message,
      })
      
    }
  })




module.exports = router;
