const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email :{
        type:String,
        required:true,
        unique : true,
    },

    password:{
        type:String,
        required:true,
        minlength : 6,
        select:false, 
    },
    watchlist:[{
        type:mongoose.Schema.Types.ObjectId,
          ref:"watchlists"
    }],

    notes:[{
        type:mongoose.Schema.Types.ObjectId,
          ref:"Notes"
    }],
    calculator:[{
        type:mongoose.Schema.Types.ObjectId,
          ref:"calcdata"
    }]
},{
    timestamps: true
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
      this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = async function(){
  return jwt.sign({_id:this._id},process.env.JWT_SECRET,{ expiresIn: '12h' })
}

module.exports = mongoose.model('Users',userSchema);