var request = require('request')
var beehiveBase = sails.config.constants.beehiveProdServerBase
var Q = require('q')

var weakDeliver = function(authorization, url, method, body) {
  var deferred = Q.defer()
  var options = {
    method: method, url: url, body: body,
    headers: {
      authorization: authorization,
      'content-type': body != undefined ? 'application/json' : undefined
    }    
  }
  request(options, function(err, res, body) {
    if (err) deferred.reject(new Error(err))
    deferred.resolve({res: res, body: body})
  })
  return deferred.promise
}

module.exports = {

  create: function (options, done) {
    var deferred = Q.defer()
    var ruleBody = options.flowData
    var url = beehiveBase + '/beehive-portal/api/triggers/createTrigger'
    var authorization = options.req.headers.authorization
    deferred.resolve(weakDeliver(authorization, url, 'POST', JSON.stringify(ruleBody)))    
    return deferred.promise
  },

  update: function (options, done) {
    var ruleBody = options.flowData
    var deferred = Q.defer()
    var flowID = options.req.params.flowID

    Flow.findOne({flowID: flowID})
    .then(function(value) {
      var url = beehiveBase + '/beehive-portal/api/triggers/' + value.externalID
      var authorization = options.req.headers.authorization
      deferred.resolve(weakDeliver(authorization, url, 'PUT', JSON.stringify(ruleBody)))
    })
    .catch(function(err) {
      deferred.reject(new Error(err))
    })
    return deferred.promise
  },

  delete: function (options, done) {
    var deferred = Q.defer()
    var authorization = options.req.headers.authorization    
    var url = beehiveBase + '/beehive-portal/api/triggers/' + options.externalID
    deferred.resolve(weakDeliver(authorization, url, 'DELETE', undefined))
    return deferred.promise
  },

  enable: function (options, done) {
    var deferred = Q.defer()
    var authorization = options.req.headers.authorization    
    var url = beehiveBase + '/beehive-portal/api/triggers/' + options.externalID + '/enable'
    deferred.resolve(weakDeliver(authorization, url, 'PUT', undefined))
    return deferred.promise
  },

  disable: function (options, done) {
    var deferred = Q.defer()
    var authorization = options.req.headers.authorization    
    var url = beehiveBase + '/beehive-portal/api/triggers/' + options.externalID + '/disable'
    deferred.resolve(weakDeliver(authorization, url, 'PUT', undefined))
    return deferred.promise
  }
};