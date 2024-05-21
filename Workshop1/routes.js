const routes = require('./routes/routes');

const express = require('express');

const router = express.Router()

module.exports = router;

app.use('/api', routes)