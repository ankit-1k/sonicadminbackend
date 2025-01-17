const express=require('express')
const AboutModel=require('../../models/layout/about')
const aboutRouter=express.Router()

aboutRouter.use(express.json())

const cloudinary = require('../../models/Test/cloudinary.config');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogs',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});
const upload = multer({ storage });

aboutRouter.post('/postabout',upload.single('image'),async(req,res)=>{
    try {
        console.log('File data:', req.file);

        const { title, desc,text1,text2,btnlink,category } = req.body;
        
        if (!req.file) {
            return res.status(400).send({ message: 'Image is required!' });
        }
        
        const newAbout=new AboutModel({ title, desc,text1,text2,btnlink,category,imageUrl: req.file.path })
        await newAbout.save()
        res.status(200).send({message:'about Uploaded Successfully...'})
    } catch (error) {
        console.error('Error uploading about:', error)
        res.status(500).send({message:'ISE Failed to upload about'})
    }
})

aboutRouter.get('/getabout', async (req, res) => {
    try {
        const { category } = req.query; // Retrieve the category from the query parameters

        let query = {};
        if (category) {
            query.category = category; // Add category to the query object if it exists
        }

        const findAbout = await AboutModel.find(query); // Find about based on the query object
        res.status(200).json(findAbout);
    } catch (error) {
        console.error('Error fetching abouts:', error.message);
        res.status(500).send({ message: 'ISE to find about...' });
    }
});
// %20 is for space and %26 for '&' symbol

aboutRouter.delete('/deleteabout/:id',async(req,res)=>{
    try {
        const id=req.params.id
        await AboutModel.findByIdAndDelete(id)
        res.status(200).send({message:'about Deleted Successfully...'})
    } catch (error) {
        res.status(500).send({message:'ISE to Delete about...'})
    }
})

// aboutRouter.put('/updateabout/:id',upload.single('image'),async(req,res)=>{
//     try {
//         const id=req.params.id
//         const { title, desc,text1,text2,btnlink,category } = req.body;

//         const updateData = { title, desc,text1,text2,btnlink,category };
//         if (req.file) {
//             updateData.imageUrl = req.file.path;
//         }

//         const updateAbout=await AboutModel.findByIdAndUpdate(id,updateData,{new:true})
//         if(!updateAbout){
//             res.status(404).send({message:'Failed to Update about...'})
//         }
//         res.status(200).send({message:'Successfully Updated about...'})
//     } catch (error) {
//         res.status(500).send({message:'ISE to Update about...'})
//     }
// })

aboutRouter.put('/updateabout/:id', upload.single('image'), async (req, res) => {
    try {
        const id = req.params.id;
        const { title, desc, text1, text2, btnlink, category } = req.body;

        const updateData = { title, desc, text1, text2, btnlink, category };
        if (req.file) {
            updateData.imageUrl = req.file.path; // Ensure the new file path is updated
        }

        const updateAbout = await AboutModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updateAbout) {
            return res.status(404).send({ message: 'Failed to Update about...' });
        }
        res.status(200).send({ message: 'Successfully Updated about...', data: updateAbout });
    } catch (error) {
        console.error('Error updating about:', error);
        res.status(500).send({ message: 'ISE to Update about...' });
    }
});


module.exports=aboutRouter