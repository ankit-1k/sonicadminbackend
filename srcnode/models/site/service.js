const mongoose=require('mongoose')

const serviceSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    icon:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
    },
    category: { 
        type: String,
        required: true 
    }
})

const ServiceModel=mongoose.model('ServiceModel',serviceSchema)
module.exports=ServiceModel