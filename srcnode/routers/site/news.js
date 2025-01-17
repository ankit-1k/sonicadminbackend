const express = require('express')
// const cors=require('cors')
const NewsModel = require('../../models/site/news')
const newsRouter = express.Router()

// newsRouter.use(cors())
newsRouter.use(express.json())

newsRouter.post('/postnews', async (req, res) => {
    try {
        const newNews = new NewsModel(req.body)
        await newNews.save()
        res.status(200).send({ message: 'news Uploaded Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE Failed to upload news' })
    }
})

newsRouter.get('/getnews', async (req, res) => {
    try {
        const { category } = req.query; // Retrieve the category from the query parameters

        let query = {};
        if (category) {
            query.category = category; // Add category to the query object if it exists
        }

        const findNews = await NewsModel.find(query); // Find newss based on the query object
        res.status(200).json(findNews);
    } catch (error) {
        console.error('Error fetching newss:', error.message);
        res.status(500).send({ message: 'ISE to find news...' });
    }
});
// %20 is for space and %26 for '&' symbol

newsRouter.delete('/deletenews/:id', async (req, res) => {
    try {
        const id = req.params.id
        await NewsModel.findByIdAndDelete(id)
        res.status(200).send({ message: 'news Deleted Successfully...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Delete news...' })
    }
})

newsRouter.put('/updatenews/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatenews = await NewsModel.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatenews) {
            res.status(404).send({ message: 'Failed to Update news...' })
        }
        res.status(200).send({ message: 'Successfully Updated news...' })
    } catch (error) {
        res.status(500).send({ message: 'ISE to Update news...' })
    }
})


module.exports = newsRouter