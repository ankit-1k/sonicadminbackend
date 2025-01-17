// models/notificationModel.js
const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,  // Example: 'success', 'error', etc.
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const NotificationModel = mongoose.model('Notification', notificationSchema);

module.exports = NotificationModel;
