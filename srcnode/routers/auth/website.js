const express = require('express')
const WebsiteModel = require('./../../models/auth/website')
const websiterouter = express.Router()

websiterouter.use(express.json())

websiterouter.post('/webpost', async (req, res) => {
    try {
        const newWebsite = new WebsiteModel(req.body)
        await newWebsite.save()
        res.status(200).send({ message: 'Successfully added...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE Website POST' })
    }
})

websiterouter.get('/webget', async (_, res) => {
    try {
        const findWebsites = await WebsiteModel.find()
        res.json(findWebsites)
    } catch (error) {
        res.status(500).send({ message: 'ISE Website GET' })
    }
})

websiterouter.delete('/webdelete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWebsite = await WebsiteModel.findByIdAndDelete(id);

        if (!deletedWebsite) {
            return res.status(404).send({ message: 'Website not found' });
        }
        res.status(200).send({ message: 'Website Deleted Successfully...' });
    } catch (error) {
        console.error('Error deleting website:', error);
        res.status(500).send({ message: 'Website Deletion Failed...' });
    }
});

websiterouter.put('/webupdate', async (req, res) => {
    try { 
        const { id, updatedData } = req.body;

        const updateWebsite = await WebsiteModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updateWebsite) {
            return res.status(404).send({ message: 'Website not found' });
        }

        res.status(200).send({ message: 'Website Updated Successfully...', updateWebsite });
    } catch (error) {
        console.error('Error updating website:', error);
        res.status(500).send({ message: 'Website Update Failed' });
    }
});

module.exports = websiterouter