const mongoose=require('mongoose')

const reqSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const ReqModel=mongoose.model('ReqModel',reqSchema)
module.exports=ReqModel