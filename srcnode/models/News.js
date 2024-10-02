const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  details: { type: String, required: true },
  publishDate: { type: Date, required: true },
  author: { type: String, required: true },
  link: { type: String, required: true },
}, { timestamps: true });

const News = mongoose.model("News", newsSchema);
module.exports = News;