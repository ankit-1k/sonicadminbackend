const express = require('express')
const SalesModel = require('./../../models/tele/sales')
const salesrouter = express.Router()
const cors = require('cors');
const UserModel = require('../../models/tele/search');
salesrouter.use(cors());

salesrouter.use(express.json())

salesrouter.post('/postsales', async (req, res) => {
    try {
        const newUser = new SalesModel(req.body)
        await newUser.save()
        res.status(200).send({ message: 'Success' })
    } catch (error) {
        console.error('❌ ERROR:', err.message );
        res.status(500).send({ message: 'ISE POST' })
    }
})

salesrouter.get('/getsales', async (req, res) => {
    try {
        const findUsers = await SalesModel.find()
        res.json(findUsers)
    } catch (error) {
        res.status(500).send({ message: 'ISE GET' })
    }
})

salesrouter.put('/updatesales/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updateSales = await SalesModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updateSales) {
            res.status(404).send({ message: 'Failed to Update TeleSales...' })
        }
        res.status(200).send({ message: 'Successfully Updated TeleSales...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Update TeleSales...' })
    }
})

salesrouter.delete('/deletesales/:id', async (req, res) => {
    try {
        const id = req.params.id
        await SalesModel.findByIdAndDelete(id)
        res.status(200).send({ message: 'Deleted' })
    } catch (error) {
        res.status(500).send({ message: "ISE Delete" })
    }
})

salesrouter.post('/postuser', async (req, res) => {
    try {
        const newUser = new UserModel(req.body)
        newUser.save()
        res.status(200).send({ message: 'Success' })
    } catch (error) {
        res.status(500).send({ message: 'ISE POST' })
    }
})

salesrouter.get('/searchuser/:name', async (req, res) => {
    try {
        console.log('Searching for user:', req.params.name); 
        const name = req.params.name;

        const users = await SalesModel.find(
            { name: { $regex: `\\b${name}\\b`, $options: 'i' } }
        );

        if (users.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error('Error searching user:', error);
        res.status(500).send({ message: 'Internal Server Error (GET)' });
    }
});

module.exports = salesrouter