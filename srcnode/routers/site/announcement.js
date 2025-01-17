const express = require('express')
// const cors=require('cors')
const AnnouncementModel = require('../../models/site/announcement')
const announcementRouter = express.Router()
const schedule = require('node-schedule');

// announcementRouter.use(cors())
announcementRouter.use(express.json())

announcementRouter.post('/postannouncement', async (req, res) => {
    try {
        const { name, desc, category, duration } = req.body;

        // Validate duration
        if (!['1h', '10s', '12h'].includes(duration)) {
            console.log('Invalid duration:', duration);
            return res.status(400).send({ message: 'Invalid duration. Use "1h" for 1 hour or "1m" for 1 minute.' });
        }

        const newAnnouncement = new AnnouncementModel({ name, desc, category, duration });
        await newAnnouncement.save();

        console.log(`New Announcement Created: ${newAnnouncement._id}`);

        let delayMs = 0;
        if (duration === '1h') {
            delayMs = 3600000;
        } else if (duration === '10s') {
            delayMs = 10000;
        } else if (duration === '12h') {
            delayMs = 12 * 60 * 60 * 1000;
        } else if (duration === '12h') {
            delayMs = 24 * 60 * 60 * 1000;
        }

        const jobId = newAnnouncement._id.toString();
        console.log(`Scheduling job for deletion in ${delayMs / 1000} seconds...`);

        schedule.scheduleJob(jobId, new Date(Date.now() + delayMs), async () => {
            try {
                await AnnouncementModel.findByIdAndDelete(newAnnouncement._id);
                console.log(`Announcement with ID ${jobId} deleted automatically.`);
            } catch (err) {
                console.error(`Error deleting announcement with ID ${jobId}:`, err.message);
            }
        });

        res.status(200).send({ message: 'Announcement uploaded successfully and scheduled for deletion automatically.' });
    } catch (error) {
        console.error('Error uploading announcement:', error.message);
        res.status(500).send({ message: 'Failed to upload announcement' });
    }
});

announcementRouter.get('/getannouncements', async (req, res) => {
    try {
        const announcements = await AnnouncementModel.find({});
        res.status(200).send(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error.message);
        res.status(500).send({ message: 'Failed to fetch announcements' });
    }
});


announcementRouter.get('/getannouncement', async (req, res) => {
    try {
        const { category } = req.query; 

        let query = {};
        if (category) {
            query.category = category; 
        }

        const findAnnouncement = await AnnouncementModel.find(query); 
        res.status(200).json(findAnnouncement);
    } catch (error) {
        console.error('Error fetching announcements:', error.message);
        res.status(500).send({ message: 'ISE to find announcement...' });
    }
});
// %20 is for space and %26 for '&' symbol

announcementRouter.delete('/deleteannouncement/:id', async (req, res) => {
    try {
        const id = req.params.id
        await AnnouncementModel.findByIdAndDelete(id)
        res.status(200).send({ message: 'announcement Deleted Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Delete announcement...' })
    }
})

announcementRouter.put('/updateannouncement/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, desc, category, duration } = req.body;

        // Validate duration
        if (!['1h', '10s', '12h', '24h'].includes(duration)) {
            console.log('Invalid duration:', duration);
            return res.status(400).send({ message: 'Invalid duration. Use "1h" for 1 hour, "1m" for 1 minute, "12h" for 12 hours, or "24h" for 1 day.' });
        }

        // Find and update the announcement
        const updatedAnnouncement = await AnnouncementModel.findByIdAndUpdate(id, { name, desc, category, duration }, { new: true });

        if (!updatedAnnouncement) {
            return res.status(404).send({ message: 'Announcement not found or failed to update.' });
        }

        console.log(`Announcement with ID ${id} updated.`);
        let delayMs = 0;
        if (duration === '1h') {
            delayMs = 3600000; 
        } else if (duration === '10s') {
            delayMs = 10000; 
        } else if (duration === '12h') {
            delayMs = 12 * 60 * 60 * 1000; 
        } else if (duration === '24h') {
            delayMs = 24 * 60 * 60 * 1000;
        }

        const jobId = updatedAnnouncement._id.toString();
        schedule.cancelJob(jobId);  // Cancel any previous job for this announcement
        console.log(`Canceled previous job for announcement ${jobId}`);

        // Schedule a new deletion job based on the updated duration
        schedule.scheduleJob(jobId, new Date(Date.now() + delayMs), async () => {
            try {
                await AnnouncementModel.findByIdAndDelete(updatedAnnouncement._id);
                console.log(`Announcement with ID ${jobId} deleted automatically.`);
            } catch (err) {
                console.error(`Error deleting announcement with ID ${jobId}:`, err.message);
            }
        });

        res.status(200).send({ message: 'Announcement updated and scheduled for deletion automatically.' });

    } catch (error) {
        console.error('Error updating announcement:', error.message);
        res.status(500).send({ message: 'Failed to update announcement' });
    }
});



module.exports = announcementRouter