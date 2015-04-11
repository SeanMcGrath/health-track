'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrackerSchema = new Schema({
  first: String,
  last: String,
  address: String,
  IP: String,
  DOB: String,
  info: String,
  serial: String,
  location: [],
  active: Boolean
});

module.exports = mongoose.model('Tracker', TrackerSchema);