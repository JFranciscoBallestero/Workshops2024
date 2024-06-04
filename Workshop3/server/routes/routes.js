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
  
  // Get one major
  router.get('/:id', async (req, res) => {
    try {
      const major = await Major.findById(req.params.id);
      if (major == null) {
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
      description: req.body.description
    });
  
    try {
      const newMajor = await major.save();
      res.status(201).json(newMajor);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Update a major
  router.put('/:id', async (req, res) => {
    try {
      const major = await Major.findById(req.params.id);
      if (major == null) {
        return res.status(404).json({ message: 'Cannot find major' });
      }
  
      if (req.body.name != null) {
        major.name = req.body.name;
      }
      if (req.body.code != null) {
        major.code = req.body.code;
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
  
  // Delete a major
  router.delete('/:id', async (req, res) => {
    try {
      const major = await Major.findById(req.params.id);
      if (major == null) {
        return res.status(404).json({ message: 'Cannot find major' });
      }
  
      await major.remove();
      res.json({ message: 'Deleted major' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  module.exports = router;