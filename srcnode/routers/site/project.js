const express = require('express')
const ProjectModel = require('../../models/site/project')
const projectRouter = express.Router()
projectRouter.use(express.json())
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

projectRouter.post('/postproject', upload.single('image'), async (req, res) => {
    try {
        console.log('File data:', req.file);
        const { name, category, demo, desc } = req.body

        if (!req.file) {
            return res.status(400).send({ message: 'Image is required!' });
        }

        const newproject = new ProjectModel({
            name,
            category,
            demo,
            desc,
            imageUrl: req.file.path
        })
        await newproject.save()
        res.status(200).send({ message: 'project Uploaded Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE Failed to upload project' })
    }
})

projectRouter.get('/getproject', async (req, res) => {
    try {
        const { category } = req.query; 

        let query = {};
        if (category) {
            query.category = category; 
        }

        const findprojects = await ProjectModel.find(query); 
        res.status(200).json(findprojects);
    } catch (error) {
        console.error('Error fetching projects:', error.message);
        res.status(500).send({ message: 'ISE to find project...' });
    }
});
// %20 is for space and %26 for '&' symbol

projectRouter.delete('/deleteproject/:id', async (req, res) => {
    try {
        const id = req.params.id
        await ProjectModel.findByIdAndDelete(id)
        res.status(200).send({ message: 'project Deleted Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Delete project...' })
    }
})

projectRouter.put('/updateproject/:id', upload.single('image'), async (req, res) => {
    try {
        console.log('Request Body:', req.body);  
        console.log('File Data:', req.file);  

        const id = req.params.id;
        const { name, category, demo, desc } = req.body;

        if (!name || !category || !demo || !desc) {
            return res.status(400).send({ message: 'All fields are required.' });
        } 

        const updateData = { name, category, demo, desc };

        if (req.file) {
            // Log file info for debugging
            console.log('Uploaded file path:', req.file.path);
            updateData.imageUrl = req.file.path; // Store the image URL if a file was uploaded
        }

        const updateproject = await ProjectModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateproject) {
            return res.status(404).send({ message: 'Project not found, failed to update.' });
        }

        res.status(200).send({ message: 'Project successfully updated.' });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).send({ message: 'Internal Server Error: Failed to update project.' });
    }
});


module.exports = projectRouter