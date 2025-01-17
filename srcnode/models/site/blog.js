const mongoose=require('mongoose')

const blogSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    name:{
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
    },
    imageUrl: { 
        type: String,
        required: true,
    },
})

const BlogModel=mongoose.model('BlogModel',blogSchema)
module.exports=BlogModel