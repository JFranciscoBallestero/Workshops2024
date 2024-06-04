require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const routes = require('./routes/routes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Use the routes defined in routes.js
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(mongoString)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});