const mongoose=require('mongoose')

const authSchema=mongoose.Schema({
    userName:{ 
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registeredAt: { type: Date, default: Date.now },
    lastLogin: { type: Date }
})

const AuthModel=mongoose.model('AuthModel',authSchema)
module.exports=AuthModel