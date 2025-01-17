const express = require('express')
const BlogModel = require('../../models/site/blog')
const blogRouter = express.Router()
const cloudinary = require('../../models/Test/cloudinary.config');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
blogRouter.use(express.json())
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'blogs',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});
const upload = multer({ storage });

blogRouter.post('/postblog', upload.single('image'), async (req, res) => {
    try {
        console.log('File data:', req.file); // Log the uploaded file details
        const { name, desc, category } = req.body;

        if (!req.file) {
            return res.status(400).send({ message: 'Image is required!' });
        }

        const newBlog = new BlogModel({
            name,
            desc,
            category,
            imageUrl: req.file.path, // Use req.file.path or req.file.url
        });

        await newBlog.save();
        res.status(200).send({ message: 'Blog Uploaded Successfully...', blog: newBlog });
    } catch (error) {
        console.error('Error uploading blog:', error.message);
        res.status(500).send({ message: 'ISE Failed to upload Blog' });
    }
});

blogRouter.get('/getblog', async (req, res) => { 
    try {
        const { category } = req.query; // Retrieve the category from the query parameters

        let query = {};
        if (category) {
            query.category = category; // Add category to the query object if it exists
        }

        const findBlogs = await BlogModel.find(query); // Find blogs based on the query object
        res.status(200).json(findBlogs);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        res.status(500).send({ message: 'ISE to find Blog...' });
    }
});
// %20 is for space and %26 for '&' symbol

// blogRouter.delete('/deleteblog/:id', async (req, res) => {
//     try {
//         const id = req.params.id
//         await BlogModel.findByIdAndDelete(id)
//         res.status(200).send({ message: 'Blog Deleted Successfully...' })
//     } catch (error) {
//         res.status(500).send({ message: 'ISE to Delete Blog...' })
//     }
// })

blogRouter.delete('/deleteblog/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const blogToDelete = await BlogModel.findById(id);
        if (!blogToDelete) {
            return res.status(404).send({ message: 'Blog not found!' });
        }

        const publicId = blogToDelete.imageUrl.split('/').pop().split('.')[0]; 

        // Destroy the image from Cloudinary
        await cloudinary.uploader.destroy(publicId);

        await BlogModel.findByIdAndDelete(id);
        res.status(200).send({ message: 'Blog Deleted Successfully...' });
    } catch (error) {
        res.status(500).send({ message: 'ISE to Delete Blog...' });
    }
});

blogRouter.put('/updateblog/:id', upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, desc, category } = req.body;

        const updateData = { name, desc, category };
        if (req.file) {
            updateData.imageUrl = req.file.path; // Update image URL if a new image is uploaded
        }

        const updatedBlog = await BlogModel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBlog) {
            return res.status(404).send({ message: 'Blog not found!' });
        }

        res.status(200).send({ message: 'Successfully Updated Blog...', blog: updatedBlog });
    } catch (error) {
        console.error('Error updating blog:', error.message);
        res.status(500).send({ message: 'ISE to Update Blog...' });
    }
});

module.exports = blogRouter