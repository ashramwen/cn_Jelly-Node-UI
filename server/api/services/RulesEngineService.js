var request = require('request')
var beehiveBase = sails.config.constants.beehiveProdServerBase
var Q = require('q')

module.exports = {

  create: function (options, done) {
    var ruleBody = options.flowData
    var req = options.req
    var deferred = Q.defer()
    var options = {
      method: 'POST',
      url: beehiveBase + '/beehive-portal/api/triggers/createTrigger',
      headers: {
        'content-type': 'application/json',
        authorization: req.headers.authorization
      },
      body: JSON.stringify(ruleBody)
    }

    request(options, function(err, res, body) {
      if (err) {
        deferred.reject(new Error(err))
      } else {
        deferred.resolve({
          res: res, body: body
        })
      }      
    })

    return deferred.promise
  },

  update: function (options, done) {
    // 1.get externalID given flowID from req
    // 2.execute external API
    var ruleBody = options.flowData
    var req = options.req
    var deferred = Q.defer()
    var flowID = req.params.flowID

    Flow.findOne({flowID: flowID})
    .then(function(value) {
      var externalID = value.externalID

      var options = {
        method: 'PUT',
        url: beehiveBase + '/beehive-portal/api/triggers/' + externalID,
        headers: {
          'content-type': 'application/json',
          authorization: req.headers.authorization
        },
        body: JSON.stringify(ruleBody)
      }

      request(options, function(err, res, body){
        if(err) deferred.reject(new Error(err))
        deferred.resolve({res: res, body: body})
      })
    })
    .catch(function(err) {
      deferred.reject(new Error(err))
    })
    return deferred.promise
  },

  delete: function (options, done) {
    var externalID = options.externalID
    var req = options.req
    var deferred = Q.defer()

    var options = {
      method: 'DELETE',
      url: beehiveBase + '/beehive-portal/api/triggers/' + externalID,
      headers: {
        authorization: req.headers.authorization
      }
    }

    request(options, function(err, res, body){
      if(err) deferred.reject(new Error(err))
      deferred.resolve({res: res, body: body})
    })

    return deferred.promise
  },

  enable: function (options, done) {
    var externalID = options.externalID
    var req = options.req
    var deferred = Q.defer()

    var options = {
      method: 'PUT',
      url: beehiveBase + '/beehive-portal/api/triggers/' + externalID + '/enable',
      headers: {
        authorization: req.headers.authorization
      }
    }

    request(options, function (err, res, body) {
      if(err) deferred.reject(new Error(err))
        deferred.resolve({res: res, body: body})
    })

    return deferred.promise
  },

  disable: function (options, done) {
    var externalID = options.externalID
    var req = options.req
    var deferred = Q.defer()

    var options = {
      method: 'PUT',
      url: beehiveBase + '/beehive-portal/api/triggers/' + externalID + '/disable',
      headers: {
        authorization: req.headers.authorization
      }
    }

    request(options, function (err, res, body) {
      if(err) deferred.reject(new Error(err))
        deferred.resolve({res: res, body: body})
    })

    return deferred.promise
  }
};