const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const headerrouter = express.Router();
const jwt = require('jsonwebtoken');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'expnode1@gmail.com',
        pass: 'fsiw zucv crwl kwej'
    }
});

const otps = new Map();
const JWT_SECRET = 'your_jwt_secret'; 

headerrouter.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    console.log('Email:', email);  
    const otp = crypto.randomInt(100000, 999999).toString();

    const mailOptions = {
        from: 'expnode1@gmail.com',
        to: 'expnode1@gmail.com', 
        subject: 'Super Admin Verification',
        text: `Your OTP is ${otp}`
    };

    try {
        otps.set(email, otp);

        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'OTP sent successfully...' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send({ message: 'Failed to send OTP', error });
    }
});

headerrouter.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = otps.get(email);

    if (!storedOtp) {
        return res.status(400).send({ message: 'No OTP found for this email. Please request a new OTP.' });
    }

    if (storedOtp === otp) {
        otps.delete(email);
        const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).send({
            message: 'Verified successfully!',
            token,
            user: { email }
        });
    } else {
        return res.status(400).send({ message: 'Invalid OTP. Please try again.' });
    }
});

module.exports = headerrouter;
