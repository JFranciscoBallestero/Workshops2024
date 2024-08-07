const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    }
  });
  
  module.exports = mongoose.model('Major', majorSchema);