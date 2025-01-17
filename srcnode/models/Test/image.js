// models/image.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// MongoDB model for storing image data
const ImageSchema = new Schema({
  url: { type: String, required: true },
  public_id: { type: String, required: true },
  name: { type: String, required: true }, 
  description: { type: String, required: true }
});

const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
