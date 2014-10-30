'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    body: String
  , created: { type: Date, default: Date.now }
  , _someId: Schema.Types.ObjectId
  , nested: {
    stuff: { type: String, lowercase: true, trim: true }
  }
});

var MsgSchema = new Schema({ name: String, comments: [CommentSchema] });

module.exports = mongoose.model('Msg', MsgSchema);