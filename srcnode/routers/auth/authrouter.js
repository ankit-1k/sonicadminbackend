const express = require('express');
// const cors = require('cors');
const jwt = require('jsonwebtoken');
const AuthModel = require('../../models/auth/auth');
const authRouter = express.Router();

// authRouter.use(cors());
authRouter.use(express.json());

const SECRET_KEY = 'your_secret_key';

authRouter.post('/register', async (req, res) => {
    try {
        if (!userName || !password) {
            return res.status(400).send({ message: 'Username and password are required.' });
        }
        const newUser = new AuthModel({
            ...req.body,
            lastLogin: new Date() // Ensure the correct field structure
        });
        await newUser.save();
        res.status(200).send({ message: 'User Registered Successfully...' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error in backend', error });
    }
});

authRouter.get('/getregister', async (req, res) => {
    try {
        const getUsers = await AuthModel.find();
        res.json(getUsers);
    } catch (error) {
        res.status(500).send({ message: 'Failed to get users' });
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const searchUser = await AuthModel.findOne(req.body);

        if (searchUser) {
            searchUser.lastLogin = new Date();
            await searchUser.save(); 

            const token = jwt.sign({ id: searchUser._id }, SECRET_KEY, { expiresIn: '200h' });
            res.status(200).send({
                message: 'Login success',
                token,
                lastLogin: searchUser.lastLogin // Send last login time
            });
        } else {
            res.status(401).send({ message: 'Invalid User' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err && err.name === 'TokenExpiredError') {
            return res.status(403).send({ message: 'Session expired, please login again' });
        }
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

authRouter.get('/sendbinding', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Email sent successfully!' });
});

module.exports = authRouter;
