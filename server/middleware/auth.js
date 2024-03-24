const User = require("../model/User")
const jwt = require("jsonwebtoken");


exports.isAuthenticated = async (req,res,next) => {
try{
  
  const token = req.headers['x-access-token'];
 
if(!token){
    return res.status(401).json({
        success:false,
        message:"Please login first"
    })
}

const decoded = await jwt.verify(token,process.env.JWT_SECRET)

  
req.user = await User.findById(decoded._id);



if(!req.user){
  return  res.status(404).cookie('token',null,{
      expires:new Date(Date.now()),
      httpOnly:true,
     }).json({
       success:false,
       message:"user not found"
     })
}

next();

}catch(err){
  res.status(500).json({
    success:false,
    message:err.message
  })
}
}