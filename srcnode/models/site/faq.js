const mongoose=require('mongoose')

const faqSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    question:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category: { 
        type: String,
        required: true 
    }
})

const FaqModel=mongoose.model('FaqModel',faqSchema)
module.exports=FaqModel