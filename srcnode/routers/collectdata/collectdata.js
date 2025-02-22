const express = require('express')
const CollectDataModel = require('../../models/collectdata/collectdata')
const collectdatarouter = express.Router()
const nodemailer = require('nodemailer');

collectdatarouter.post('/postcollectdata', async (req, res) => {
    try {
        const newData = new CollectDataModel(req.body)
        await newData.save()
        res.status(200).send({ message: 'Success Post' })
    } catch (error) {
        res.status(500).send({ message: 'Failed Post ISE' })
    }
})

collectdatarouter.get('/getcollectdata', async (req, res) => {
    try {
        const findData = await CollectDataModel.find();
        res.status(200).json({ message: 'Success GET', data: findData });
    } catch (error) {
        res.status(500).json({ message: 'Failed GET ISE', error });
    }
});

collectdatarouter.put('/updatecollectdata/:id', async (req, res) => {
    try {
        const updatedData = await CollectDataModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedData) {
            return res.status(404).send({ message: 'Data not found' });
        }
        res.status(200).send({ message: 'Success Update', data: updatedData });
    } catch (error) {
        res.status(500).send({ message: 'Failed Update ISE', error: error.message });
    }
});

collectdatarouter.delete('/deletecollectdata/:id', async (req, res) => {
    try {
        const deletedData = await CollectDataModel.findByIdAndDelete(req.params.id);
        if (!deletedData) {
            return res.status(404).send({ message: 'Data not found' });
        }
        res.status(200).send({ message: 'Success Delete', data: deletedData });
    } catch (error) {
        res.status(500).send({ message: 'Failed Delete ISE', error: error.message });
    }
});

collectdatarouter.delete('/delete-all', async (req, res) => {
    try {
        await CollectDataModel.deleteMany({});
        res.status(200).json({ message: 'All records deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting all records' });
    }
})

collectdatarouter.post('/send-email-c', async (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'expnode1@gmail.com',
            pass: 'fsiw zucv crwl kwej'
        }
    });

    const mailOptions = {
        from: 'expnode1@gmail.com',
        to,
        subject,
        html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">${subject}</h2>
              <p>Hello,</p>
              <p>${message}</p>
              <hr style="border: none; border-top: 1px solid #ddd;">
              <div style="text-align: center; margin-top: 20px;">
                  <p style="margin: 5px 0; font-weight: bold;">Best regards,</p>
                  <p style="margin: 5px 0; font-size: 16px;">Ankit</p>
                  <p style="margin: 5px 0; font-size: 14px; color: #555;">📧 pandaankit167@gmail.com</p>
              </div>
          </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to send email', error: error.message });
    }
});

collectdatarouter.post('/send-mails', async (req, res) => {
    try {
        const { selectedOrgType, subject, message } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'expnode1@gmail.com',
                pass: 'fsiw zucv crwl kwej'
            }
        });
        // Fetch all emails for the selected orgType
        const users = await CollectDataModel.find({ orgType: selectedOrgType });

        if (users.length === 0) {
            return res.status(404).send({ message: 'No users found for the selected organization type' });
        }

        const recipientEmails = users.map(user => user.email);

        // Email Options
        const mailOptions = {
            from: 'expnode1@gmail.com',
            to: recipientEmails.join(','),
            subject: subject,
            html: `<div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">${subject}</h2>
              <p>Hello,</p>
              <p>${message}</p>
              <hr style="border: none; border-top: 1px solid #ddd;">
              <div style="text-align: center; margin-top: 20px;">
                  <p style="margin: 5px 0; font-weight: bold;">Best regards,</p>
                  <p style="margin: 5px 0; font-size: 16px;">Ankit</p>
                  <p style="margin: 5px 0; font-size: 14px; color: #555;">📧 pandaankit167@gmail.com</p>
              </div>
          </div>`
        };

        // Send Email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ message: 'Failed to send emails' });
            } else {
                console.log('Emails sent:', info.response);
                return res.status(200).send({ message: 'Emails sent successfully' });
            }
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = collectdatarouter