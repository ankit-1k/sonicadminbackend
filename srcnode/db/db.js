const mongoose = require('mongoose');
// require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://sonicdev:F_*E5Ja98i$$2q3@cluster0.r5nc91a.mongodb.net/npsslite");
        console.log('Mongo Atlas connected');
    } catch (error) {
        console.error('Failed to connect to DB:', error);
    }
};
module.exports = connectDB;

