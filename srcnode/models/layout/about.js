const mongoose=require('mongoose')

const aboutSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    text1:{
        type:String,
    },
    text2:{
        type:String,
    },
    btnlink:{
        type:String,
        required:true
    },
    category: { 
        type: String,
        required: true 
    },
    imageUrl: { 
        type: String,
        required: true,
    },
})

const AboutModel=mongoose.model('AboutModel',aboutSchema)
module.exports=AboutModel