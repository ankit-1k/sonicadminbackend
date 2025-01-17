const mongoose=require('mongoose')

const newsSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    img:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    category: { 
        type: String,
        required: true 
    }
})

const NewsModel=mongoose.model('NewsModel',newsSchema)
module.exports=NewsModel