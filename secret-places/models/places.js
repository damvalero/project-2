'use strict';

const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  subCategory: {
    type: String,
    enum: [ 'Club', 'Scenic Spot', 'Park' ]
  }
});

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;