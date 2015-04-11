/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tracker = require('./tracker.model');

exports.register = function(socket) {
  Tracker.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tracker.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tracker:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tracker:remove', doc);
}