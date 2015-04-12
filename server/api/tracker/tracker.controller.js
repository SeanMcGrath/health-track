'use strict';

var _ = require('lodash');
var Tracker = require('./tracker.model');

// Get list of trackers
exports.index = function(req, res) {
  Tracker.find(function (err, trackers) {
    if(err) { return handleError(res, err); }
    return res.json(200, trackers);
  });
};

// Get a single tracker
exports.show = function(req, res) {
  Tracker.findById(req.params.id, function (err, tracker) {
    if(err) { return handleError(res, err); }
    if(!tracker) { return res.send(404); }
    return res.json(tracker);
  });
};

// Creates a new tracker in the DB.
exports.create = function(req, res) {
  Tracker.create(req.body, function(err, tracker) {
    if(err) { return handleError(res, err); }
    return res.json(201, tracker);
  });
};

// Updates an existing tracker in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tracker.findById(req.params.id, function (err, tracker) {
    if (err) { return handleError(res, err); }
    if(!tracker) { return res.send(404); }
    var updated = _.merge(tracker, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tracker);
    });
  });
};

// Deletes a tracker from the DB.
exports.destroy = function(req, res) {
  Tracker.findById(req.params.id, function (err, tracker) {
    if(err) { return handleError(res, err); }
    if(!tracker) { return res.send(404); }
    tracker.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Allows trackers to update/register themselves in the DB
// with a GET request.
exports.getUpdate = function(req, res) {
  Tracker.findOne({macid: req.query.macid}, function(err, tracker){
    if(err) { return handleError(res, err); }
    var d = new Date();
    var location = {time: d.toISOString(), latitude: req.query.lat, longitude: req.query.long};
    var temp = {time: d.toISOString(), temperature: req.query.temp};
    if(!tracker){
      Tracker.create({
        first: 'NULL',
        last: 'NULL',
        location: [location],
        temperature: [temp],
        macid: req.query.macid,
      }, function(err, tracker) {
        if(err) { return handleError(res, err); }
        return res.json(201, tracker);
      });
    }
    else{
      tracker.temperature.push(temp);
      tracker.location.push(location);
      tracker.IP = req.connection.remoteAddress;
      console.log(tracker);
      tracker.save(function(err) {
        if (err) { return handleError(res, err); }
        return res.json(200, {
          first: tracker.first,
          last: tracker.last,
          address: tracker.address,
          info: tracker.info,
          DOB: tracker.DOB
        });
      });
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}