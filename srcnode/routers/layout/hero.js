const express = require('express')
const HeroModel = require('../../models/layout/hero')
const heroRouter = express.Router()
heroRouter.use(express.json())
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

heroRouter.post('/posthero', upload.single('image'), async (req, res) => {
    try {
        console.log('File data:', req.file);
        const { title,category, desc, text1, text2 } = req.body

        if (!req.file) {
            return res.status(400).send({ message: 'Image is required!' });
        }
        
        const newHero = new HeroModel({
            title,category, desc, text1, text2,imageUrl: req.file.path
        })
        await newHero.save()
        res.status(200).send({ message: 'hero Uploaded Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE Failed to upload hero' })
    }
})

heroRouter.get('/gethero', async (req, res) => {
    try {
        const { category } = req.query;

        let query = {};
        if (category) {
            query.category = category;
        }

        const findHero = await HeroModel.find(query);
        res.status(200).json(findHero);
    } catch (error) {
        console.error('Error fetching heros:', error.message);
        res.status(500).send({ message: 'ISE to find hero...' });
    }
});

heroRouter.delete('/deletehero/:id', async (req, res) => {
    try {
        const id = req.params.id
        await HeroModel.findByIdAndDelete(id)
        res.status(200).send({ message: 'hero Deleted Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Delete hero...' })
    }
})

heroRouter.put('/updatehero/:id', upload.single('image'), async (req, res) => {
    try {
        console.log('Request Body:', req.body);  
        console.log('File Data:', req.file);  

        const id = req.params.id
        const { title,category, desc, text1, text2 } = req.body

        if (!title || !category || !desc || !text1 || !text2) {
            return res.status(400).send({ message: 'All fields are required.' });
        } 
        const updateData = { title,category, desc, text1, text2 };
        if (req.file) {
            // Log file info for debugging
            console.log('Uploaded file path:', req.file.path);
            updateData.imageUrl = req.file.path; // Store the image URL if a file was uploaded
        }

        const updatehero = await HeroModel.findByIdAndUpdate(id, updateData, { new: true })
        if (!updatehero) {
            res.status(404).send({ message: 'Failed to Update hero...' })
        }
        res.status(200).send({ message: 'Successfully Updated hero...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Update hero...' })
    }
})

module.exports = heroRouter