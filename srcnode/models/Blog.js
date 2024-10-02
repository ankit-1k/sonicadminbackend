const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  publisherName: { type: String, required: true },
  publishDate: { type: Date, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
