const mongoose=require('mongoose')

const collectDataSchema=mongoose.Schema({
    orgName:{type:String,required:true},
    orgType:{type:String,required:true},
    email:{type:String},
    phone:{type:Number},
    country:{type:String},
    details:{type:String,required:true},
    date:{type:Date,default:Date.now()}
})

const CollectDataModel=mongoose.model('CollectDataModel',collectDataSchema)
module.exports=CollectDataModel