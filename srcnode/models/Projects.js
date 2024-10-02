// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    // code: {
    //     type: String,
    //     required: true
    // },
    imgLink: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Project', projectSchema);
