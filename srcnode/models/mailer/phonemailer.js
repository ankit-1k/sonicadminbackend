const mongoose = require("mongoose");

const phonemailerSchema = new mongoose.Schema({
  CName: { type: String, required: true },
  CPhone: { type: String, required: true },
  Description: { type: String },
  Category: { type: String, required: true } 
});

module.exports = mongoose.model("Phonemailer", phonemailerSchema);
