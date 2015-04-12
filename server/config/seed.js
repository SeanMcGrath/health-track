/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Tracker = require('../api/tracker/tracker.model')

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Tracker.find({}).remove(function() {
  Tracker.create({
    first: 'John',
    last: 'Doe',
    info: 'Cancer Patient',
    address: 'Drury Lane',
    DOB: '9/9/99',
    macid: '11:22:33:44:55',
    location: [],
    temperature: [],
  });
});