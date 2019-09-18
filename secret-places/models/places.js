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
  image: {
    type: String
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
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  },
  reviews:[
    
  { email: String,
    title: String,
    comment: String}
  ]
});

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;