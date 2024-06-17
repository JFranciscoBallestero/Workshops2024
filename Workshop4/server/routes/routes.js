const express = require('express');
const router = express.Router();
const Major = require('../model/model');

// Get all majors
router.get('/', async (req, res) => {
  try {
    const majors = await Major.find();
    res.json(majors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one major by code
router.get('/code/:code', async (req, res) => {
  try {
    const major = await Major.findOne({ code: req.params.code });
    if (!major) {
      return res.status(404).json({ message: 'Cannot find major' });
    }
    res.json(major);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a major
router.post('/', async (req, res) => {
  const major = new Major({
    name: req.body.name,
    code: req.body.code,
    description: req.body.description,
  });

  try {
    const newMajor = await major.save();
    res.status(201).json(newMajor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a major by code
router.put('/code/:code', async (req, res) => {
  try {
    const major = await Major.findOne({ code: req.params.code });
    if (!major) {
      return res.status(404).json({ message: 'Cannot find major' });
    }

    if (req.body.name != null) {
      major.name = req.body.name;
    }
    if (req.body.description != null) {
      major.description = req.body.description;
    }

    const updatedMajor = await major.save();
    res.json(updatedMajor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a major by code
router.delete('/code/:code', async (req, res) => {
  try {
    const major = await Major.findOne({ code: req.params.code });
    if (!major) {
      return res.status(404).json({ message: 'Cannot find major' });
    }

    await major.remove();
    res.json({ message: 'Deleted major' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
      const { name, sort } = req.query;
      const filter = name ? { name: new RegExp(name, 'i') } : {};
      const sortOption = sort === 'asc' ? { name: 1 } : sort === 'desc' ? { name: -1 } : {};

      const majors = await Major.find(filter).sort(sortOption);
      res.json(majors);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;
