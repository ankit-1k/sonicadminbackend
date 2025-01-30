const express=require('express')
const cors=require('cors')
const TaskModel = require('../../models/task/task')
const taskRouter=express.Router()

taskRouter.use(cors())
taskRouter.use(express.json())

taskRouter.post('/taskpost',async(req,res)=>{
    try {
        const newTask=new TaskModel(req.body)
        await newTask.save()
        res.status(200).send({message:'Task scheduled successfully...'})
    } catch (error) {
        res.status(500).send({message:'Failed Task Schedule ISE'})
    }
})

taskRouter.get('/taskget',async(req,res)=>{
    try {
        const findTask=await TaskModel.find()
        res.status(200).json(findTask); 
    } catch (error) {
        res.status(500).send({message:'Failed Task Schedule GET ISE'})
    }
})

taskRouter.delete('/taskdelete/:id',async(req,res)=>{
    try {
        const id=req.params.id
        await TaskModel.findByIdAndDelete(id)
        res.status(200).send({ message: 'Deleted' })
    } catch (error) {
        res.status(500).send({ message: "ISE Delete" })
    }
})
module.exports=taskRouter