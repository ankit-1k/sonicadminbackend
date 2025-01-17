const mongoose=require('mongoose')

const websiteSchema=mongoose.Schema({
    sitename:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    access: {
        type: Boolean,
        default: true 
    }
})

const WebsiteModel=mongoose.model('WebsiteModel',websiteSchema)
module.exports=WebsiteModel