const express=require('express')
// const cors=require('cors')
const FaqModel=require('../../models/site/faq')
const faqRouter=express.Router()

// faqRouter.use(cors())
faqRouter.use(express.json())

faqRouter.post('/postfaq',async(req,res)=>{
    try {
        const newFaq=new FaqModel(req.body)
        await newFaq.save()
        res.status(200).send({message:'faq Uploaded Successfully...'})
    } catch (error) {
        res.status(500).send({message:'ISE Failed to upload faq'})
    }
})

faqRouter.get('/getfaq', async (req, res) => {
    try {
        const { category } = req.query; // Retrieve the category from the query parameters

        let query = {};
        if (category) {
            query.category = category; // Add category to the query object if it exists
        }

        const findFaqs = await FaqModel.find(query); // Find faqs based on the query object
        res.status(200).json(findFaqs);
    } catch (error) {
        console.error('Error fetching faqs:', error.message);
        res.status(500).send({ message: 'ISE to find faq...' });
    }
});
// %20 is for space and %26 for '&' symbol

faqRouter.delete('/deletefaq/:id',async(req,res)=>{
    try {
        const id=req.params.id
        await FaqModel.findByIdAndDelete(id)
        res.status(200).send({message:'faq Deleted Successfully...'})
    } catch (error) {
        res.status(500).send({message:'ISE to Delete faq...'})
    }
})

faqRouter.put('/updatefaq/:id',async(req,res)=>{
    try {
        const id=req.params.id
        const updatefaq=await FaqModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatefaq){
            res.status(404).send({message:'Failed to Update faq...'})
        }
        res.status(200).send({message:'Successfully Updated faq...'})
    } catch (error) {
        res.status(500).send({message:'ISE to Update faq...'})
    }
})


module.exports=faqRouter