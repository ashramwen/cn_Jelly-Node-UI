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
    return done()
  },

  delete: function (options, done) {
    return done()
  },

  enable: function (options, done) {
    return done()
  },

  disable: function (options, done) {
    return done()
  }
};