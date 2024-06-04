const express = require('express');
const router = express.Router();
const User = require('../model/model');

// POST method to create a new user
router.post('/user', async (req, res) => {
    const { name, lastname } = req.body;

    const user = new User({
        name,
        lastname
    });

    try {
        const savedUser = await user.save();
        res.status(201).json({ response: `El usuario ${savedUser.name} ${savedUser.lastname} fue creado` });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;