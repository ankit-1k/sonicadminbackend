const express=require('express')
const ReqModel=require('./../../models/more/request')
const reqrouter=express.Router()

reqrouter.use(express.json())

reqrouter.post('/reqpost',async(req,res)=>{
    try {
        const newReq=new ReqModel(req.body)
        await newReq.save()
        res.status(200).send({message:'Request Posted successfully...'})
    } catch (error) {
        res.status(500).send({message:'ISE failed to post request'})
    }
})

reqrouter.get('/reqget',async(req,res)=>{
    try {
        const findReq=await ReqModel.find()
        res.json(findReq)
    } catch (error) {
        res.status(500).send({message:'ISE failed to get request'})
    }
})

reqrouter.delete('/deletereq/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const reqDelete = await ReqModel.findByIdAndDelete(id);
      if (!reqDelete) {
        return res.status(404).send({ message: 'Request not found...' });
      }
      res.status(200).send({ message: 'Request deleted successfully...' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to delete request ISE...' });
    }
  });  

module.exports=reqrouter