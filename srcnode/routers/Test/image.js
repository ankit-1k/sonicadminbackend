// routes/image.routes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../../models/Test/cloudinary.config');
const Image = require('../../models/Test/image');

const imgrouter = express.Router();

// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// imgrouter.post('/upload-image', upload.single('image'), async (req, res) => {
//     console.log(req.file);  // Log the file to check its content
//     try {
//       if (!req.file) {
//         return res.status(400).send('No file uploaded');
//       }
  
//       // Using cloudinary.uploader.upload_stream to upload the file
//       const stream = cloudinary.uploader.upload_stream(
//         { resource_type: 'auto' },
//         async (error, result) => {
//           if (error) {
//             console.error('Error uploading image:', error);
//             return res.status(500).send('Error uploading image');
//           }
  
//           // Store image URL and public_id in MongoDB
//           const image = new Image({
//             url: result.secure_url,
//             public_id: result.public_id
//           });
  
//           await image.save();
//           res.status(200).send(image);
//         }
//       );
  
//       // Pipe the file buffer to the upload stream
//       stream.end(req.file.buffer);
//     } catch (err) {
//       console.error('Error processing file:', err);
//       res.status(500).send('Error processing file');
//     }
// });

imgrouter.post('/upload-image', upload.single('image'), async (req, res) => {
  console.log(req.body); // Log the body to check name and description
  console.log(req.file); // Log the file to check its content
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    if (!name || !description) {
      return res.status(400).send('Name and description are required');
    }

    // Using cloudinary.uploader.upload_stream to upload the file
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      async (error, result) => {
        if (error) {
          console.error('Error uploading image:', error);
          return res.status(500).send('Error uploading image');
        }

        // Store image URL, public_id, name, and description in MongoDB
        const image = new Image({
          url: result.secure_url,
          public_id: result.public_id,
          name,
          description
        });

        await image.save();
        res.status(200).send(image);
      }
    );

    // Pipe the file buffer to the upload stream
    stream.end(req.file.buffer);
  } catch (err) {
    console.error('Error processing file:', err);
    res.status(500).send('Error processing file');
  }
});

imgrouter.get('/getimg',async(req,res)=>{
  try {
    const findImg=await Image.find()
    res.json(findImg) 
  } catch (error) {
    res.status(500).send('failed ISE...')
  }
})

imgrouter.delete('/delete-image/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting image with ID:', id);

    // Find the image by ID in the database
    const image = await Image.findById(id);
    if (!image) {
      console.error('Image not found');
      return res.status(404).send('Image not found');
    }

    console.log('Image found:', image);

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(image.public_id);
    console.log('Cloudinary response:', result);

    if (result.result !== 'ok') {
      console.error('Failed to delete image from Cloudinary');
      return res.status(500).send('Failed to delete image from Cloudinary');
    }

    // Delete the image record from MongoDB
    await Image.findByIdAndDelete(id);
    console.log('Image deleted from database');

    res.status(200).send({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).send('Error deleting image');
  }
});

module.exports = imgrouter;
