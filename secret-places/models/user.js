'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', schema);
