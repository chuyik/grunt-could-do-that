'use strict';

var _ = require('lodash');
var Msg = require('./msg.model');
var mongoose  = require('mongoose');

/**
 * Return list of msgs
 * This is just a `demo` for dox.
 *
 * ####Examples:
 *     // named john and at least 18
 *     MyModel.find({ name: 'john', age: { $gte: 18 }});
 *
 * @example
 *   Msg.index(req, res);
 * @param {Object} request object
 * @param {Object} [optional] response object
 * @return {Object} express object
 * @api public
 */
// Get list of msgs
exports.index = function(req, res) {
  Msg.find(function (err, msgs) {
    if(err) { return handleError(res, err); }
    return res.json(200, msgs);
  });
};

// Get a single msg
exports.show = function(req, res) {
  Msg.findById(req.params.id, function (err, msg) {
    if(err) { return handleError(res, err); }
    if(!msg) { return res.send(404); }
    return res.json(msg);
  });
};

// Creates a new msg in the DB.
exports.create = function(req, res) {
  var msg = _.merge(req.body, {
    comments: [{
      _someId : '5447004666446de09aee2853',
      _someIds : '5447004666446de09aee2853'
    }]
  });
  Msg.create(req.body, function(err, msg) {
    if(err) { return handleError(res, err); }
    Msg.find(function (err, msgs) {
      // handle errors ..
      var newMsg = msgs.splice(-1, 1)[0];
      console.log('=====');
      console.log(msgs);
      console.log('-----');
      console.log(newMsg);
      console.log('=====');
      var comment = newMsg.comments[0];
      comment.body = 'updatedText';
      newMsg.save(function(){
        return res.json(201, msg);
      });
    });
  });
};

// Updates an existing msg in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Msg.findById(req.params.id, function (err, msg) {
    if (err) { return handleError(res, err); }
    if(!msg) { return res.send(404); }
    var updated = _.merge(msg, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, msg);
    });
  });
};

// Deletes a msg from the DB.
exports.destroy = function(req, res) {
  Msg.findById(req.params.id, function (err, msg) {
    if(err) { return handleError(res, err); }
    if(!msg) { return res.send(404); }
    msg.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.review = function(req, res) {
  var o = {};
  o.map = function () { emit(this.name, 1) }
  o.reduce = function (k, vals) { return vals.length }
  o.out = { replace: 'createdCollectionNameForResults' }
  o.verbose = true;

  Msg.mapReduce(o, function (err, model, stats) {
    console.log('map reduce took %d ms', stats.processtime);
    model.find().exec(function (err, docs) {
      console.log('docs: ', docs);
      return res.json(200, docs);
    });
  })
}

exports.aggregate = function(req, res) {
  Msg.aggregate(
      { $group: { _id: '$name', maxBalance: { $max: '$name' }}}
    , { $project: { _id: 0, maxBalance: 1 }}
    , function (err, docs) {
      if (err) return handleError(err);
      console.log(docs); // [ { maxBalance: 98000 } ]
      return res.json(200, docs);
  });
}

function handleError(res, err) {
  return res.send(500, err);
}