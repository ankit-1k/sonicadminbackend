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
    accNo:{
        type:String,
        required:false,
        default: '0',
        set: v => v == null || v === '' ? '0' : String(v)
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