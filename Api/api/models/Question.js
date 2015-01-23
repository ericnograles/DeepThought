var ApplicationCache = require('../cache/ApplicationCache.js');
/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'Question',
  attributes: {

  },

  afterCreate: function(newRecord, next) {
    ApplicationCache.setObject(newRecord.id, Question, newRecord).done(function(cachedObject) {
      sails.io.sockets.emit('question:created', newRecord);
      next();
    },function(err) {
      next();
    });
  },

  afterUpdate: function(updatedRecord, next) {
    ApplicationCache.setObject(updatedRecord.id, Question, updatedRecord).done(function(cachedObject) {
      next();
    },function(err) {
      next();
    });
  }
};

