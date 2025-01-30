const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    setDate:{
        type:Date,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const TaskModel=mongoose.model('TaskModel',taskSchema)
module.exports=TaskModel