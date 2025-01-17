const mongoose=require('mongoose')

const heroSchema=mongoose.Schema({
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
    category: { 
        type: String,
        required: true 
    },
    imageUrl: { 
        type: String,
        required: true,
    },
})

const HeroModel=mongoose.model('HeroModel',heroSchema)
module.exports=HeroModel