const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./srcnode/db/db');
const userRoutes = require("./srcnode/router/router");
const app = express();
app.use(bodyParser.json());
require('dotenv').config(); 

// CORS options
const corsOptions = {
    origin: ['https://sonicadmin.vercel.app', 'http://localhost:3000'], // Allow requests from both origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow credentials
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Connect to DB
connectDB();

// Use routes   
app.use("/api", userRoutes);

const PORT = process.env.PORT || 4000; // Use process.env.PORT or default to 4000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
