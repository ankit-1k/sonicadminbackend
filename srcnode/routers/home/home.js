const express=require('express')
const HomeModel=require('./../../models/home/home')
const NotificationModel = require('./../../models/home/notificationModel');
const homerouter=express.Router()

homerouter.use(express.json())

homerouter.post('/postcontact', async (req, res) => {
    try {
        const newContact = new HomeModel(req.body);
        const savedContact = await newContact.save();

        // Use the contact's name in the notification message
        const notification = new NotificationModel({
            message: `Got a new contact '${savedContact.name}' added.`,
            type: 'success'
        });
        await notification.save();

        res.status(200).send({ message: 'Success POST Contact...' });
    } catch (error) {
        const notification = new NotificationModel({
            message: 'Failed to create contact.',
            type: 'error'
        });
        await notification.save();

        res.status(500).send({ message: 'Failed Contact ISE...' });
    }
});

homerouter.get('/getcontact',async(req,res)=>{
    try {
        const findContact=await HomeModel.find()
        res.json(findContact)
    } catch (error) {
        res.status(500).send({message:'Failed Contact ISE...'})
    }
})

homerouter.delete('/deletecontact/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContact = await HomeModel.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).send({ message: 'Contact not found...' });
        }
        res.status(200).send({ message: 'Contact deleted successfully...' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete contact ISE...' });
    }
});

homerouter.get('/getnotifications', async (req, res) => {
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });  // Get most recent notifications first
        res.json(notifications);
    } catch (error) {
        res.status(500).send({ message: 'Failed to fetch notifications ISE...' });
    }
});

homerouter.delete('/clearnotifications', async (req, res) => {
    try {
        await NotificationModel.deleteMany();  // Clear all notifications
        res.status(200).send({ message: 'Notifications cleared successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to clear notifications ISE...' });
    }
});

module.exports=homerouter