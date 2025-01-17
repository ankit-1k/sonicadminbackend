const express=require('express')
// const cors=require('cors')
const ServiceModel=require('../../models/site/service')
const serviceRouter=express.Router()

// serviceRouter.use(cors())
serviceRouter.use(express.json())

serviceRouter.post('/postservice',async(req,res)=>{
    try {
        const newService=new ServiceModel(req.body)
        await newService.save()
        res.status(200).send({message:'service Uploaded Successfully...'})
    } catch (error) {
        res.status(500).send({message:'ISE Failed to upload service'})
    }
})

serviceRouter.get('/getservice', async (req, res) => {
    try {
        const { category } = req.query; // Retrieve the category from the query parameters

        let query = {};
        if (category) {
            query.category = category; // Add category to the query object if it exists
        }

        const findServices = await ServiceModel.find(query); // Find Services based on the query object
        res.status(200).json(findServices);
    } catch (error) {
        console.error('Error fetching services:', error.message);
        res.status(500).send({ message: 'ISE to find service...' });
    }
});
// %20 is for space and %26 for '&' symbol

serviceRouter.delete('/deleteservice/:id',async(req,res)=>{
    try {
        const id=req.params.id
        await ServiceModel.findByIdAndDelete(id)
        res.status(200).send({message:'service Deleted Successfully...'})
    } catch (error) {
        res.status(500).send({message:'ISE to Delete service...'})
    }
})

serviceRouter.put('/updateservice/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const updateservice=await ServiceModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateservice){
            res.status(404).send({message:'Failed to Update service...'})
        }
        res.status(200).send({message:'Successfully Updated service...'})
    } catch (error) {
        res.status(500).send({message:'ISE to Update service...'})
    }
})


module.exports=serviceRouter