const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const headerrouter = express.Router();
const jwt = require('jsonwebtoken');
console.log("ENV CHECK → EMAIL_USER:", process.env.EMAIL_USER);
console.log("ENV CHECK → EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const otps = new Map();
const JWT_SECRET = process.env.JWT_SECRET;

headerrouter.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    console.log('Email:', email);  
    const otp = crypto.randomInt(100000, 999999).toString();

    const mailOptions = {
        from: 'expnode1@gmail.com',
        to: email, 
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
