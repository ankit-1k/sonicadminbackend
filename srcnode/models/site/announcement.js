const mongoose=require('mongoose')

const announcementSchema=mongoose.Schema({
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
    duration:{
        type:String,
        required:true
    },
})

const AnnouncementModel=mongoose.model('AnnouncementModel',announcementSchema)
module.exports=AnnouncementModel