'use strict';

const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
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