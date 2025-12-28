const mongoose=require('mongoose')

const salesSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    coName:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
})

const SalesModel=mongoose.model('SalesModel',salesSchema)
module.exports=SalesModel