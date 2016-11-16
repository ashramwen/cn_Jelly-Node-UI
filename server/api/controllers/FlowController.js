var Q = require('q')

module.exports = {

	save: function (req, res) {
    var body = req.body
    body.createdBy = req.userID
    Flow.create(body)
    .then (function (value) {
      return res.created(value)
    })
    .catch (function (err) {
      return res.badRequest(err)
    });
	},

	publish: function (req, res) {
    //1. get flow object with flowID
    //2. select data parser according to flow type
    //3. parse data with data parser service
    //4. use API router to execute external API
    //5. modify house keeping values
    //6. return response
    var flowID = req.params.flowID
    var serviceInputFormat = function(flowData) {
      return Q.fcall(function(){
        return {req: req, flowData: flowData}
      })
    }
    Flow.findOne({
      "flowID": flowID
    })
    .then(function (value) {
      if (value.flowType == 'genericRule') {
        DataParserService.toRulesEngine(value)
        .then(serviceInputFormat)
        .then(RulesEngineService.create)
        .then(function(result) {
          if (result.res.statusCode == 200) {
            value.externalID = JSON.parse(result.body).triggerID
            value.published = true
            value.synchronized = true
            Flow.update({
              "flowID": flowID
            }, value)
            .then(function(value) {
              return res.ok(value[0])
            })
            .catch(function (err) {
              return res.serverError(err)
            })
          } else {
            res.badRequest(body)
          }
        })
        .catch(function(err) {
          return res.serverError(err)
        })
      } else {
        res.badRequest('wrong flow type')
      }
    })
    .catch (function (err) {
      return res.serverError(err)
    })
  },

  retrieve: function (req, res) {
    var flowID = req.params.flowID
    Flow.findOne({
      "flowID": flowID
    })
    .then (function (value) {
      return res.ok(value)
    })
    .catch (function (err) {
      return res.serverError(err)
    });
  },

  get: function (req, res) {
    var size = req.query.size || 30;
    var skip = req.query.skip || 0;
    Flow.find({
      "createdBy": req.userID
    })
    .sort('updatedAt DESC')
    .limit(size)
    .skip(skip)
    .then (function (value) {
      return res.ok(value)
    })
    .catch (function (err) {
      return res.serverError(err)
    });
  },

  update: function (req, res) {
    var flowID = req.params.flowID
    Flow.update({
      "flowID": flowID
    }, req.body)
    .then (function (value) {
      return res.ok(value)
    })
    .catch (function (err) {
      return res.serverError(err)
    })
  },

  delete: function (req, res) {
    var flowID = req.params.flowID
    Flow.destroy({
      "flowID": flowID
    })
    .then (function (value) {
      return res.noContent()
    })
    .catch (function (err) {
      return res.notFound(err)
    })
  },

  enable: function (req, res) {
    
  },

  disable: function (req, res) {
    
  }
};