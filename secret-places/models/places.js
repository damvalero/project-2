'use strict';

const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true
  }
//   category: {
//     type: Float32Array,
//     required: true
//   }
});

const Places = mongoose.model('Places', placesSchema);

module.exports = Places;