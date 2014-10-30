/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Msg = require('./msg.model');

exports.register = function(socket) {
  Msg.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Msg.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('msg:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('msg:remove', doc);
}