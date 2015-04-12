'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TrackerSchema = new Schema({
  first: String,
  last: String,
  address: String,
  DOB: String,
  info: String,
  macid: String,
  temperature: [],
  location: [],
  editable: Boolean
});

module.exports = mongoose.model('Tracker', TrackerSchema);