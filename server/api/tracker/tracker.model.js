'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrackerSchema = new Schema({
  name: String,
  address: String,
  IP: String,
  DOB: String,
  location: [],
  active: Boolean
});

module.exports = mongoose.model('Tracker', TrackerSchema);