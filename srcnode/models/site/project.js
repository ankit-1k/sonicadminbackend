const mongoose=require('mongoose')

const projectSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    demo:{
        type:String,
        required:true
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

const ProjectModel=mongoose.model('ProjectModel',projectSchema)
module.exports=ProjectModel