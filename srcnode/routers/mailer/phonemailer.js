const express = require("express");
const Phonemailer = require("../../models/mailer/phonemailer");
const routerphone = express.Router();

// Create a new entry
routerphone.post("/phonemailerpost", async (req, res) => {
  try {
    const newEntry = new Phonemailer(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all entries
routerphone.get("/phonemailerget", async (req, res) => {
  try {
    const entries = await Phonemailer.find();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an entry
routerphone.put("/phonemaileredit/:id", async (req, res) => {
  try {
    const updatedEntry = await Phonemailer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete an entry
routerphone.delete("/phonemailerdelete/:id", async (req, res) => {
  try {
    await Phonemailer.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routerphone;
