var Q = require('q')

function weakTouch (req, res, router, localAction, successReturn) {
  var flowID = req.params.flowID
  Flow.findOne({
    flowID: flowID,
    createdBy: req.userID
  })
  .then(function(value) {
    return Q.fcall(function(){
      return {
        flowType: value.flowType,
        published: value.published,
        externalID: value.externalID,
        req: req
      }
    })
  })
  .then(function(result){
    if (result.flowType == 'genericRule' && result.published == true) {
      return RulesEngineService[router](result)
    }
    else
      return Q.fcall(function (){
        return {res: {statusCode: '200'}}
      })
  })
  .then(function(result) {
    if (result.res.statusCode == '200') {        
      Q.fcall(function(){
        return result
      })}
    else
      throw new Error(result.body)
  })
  .then(function(result){
    return localAction      
  })
  .then (function (value) {
    return successReturn(value[0])
  })
  .catch(function(err) {
    return res.serverError(err)
  })
}

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
    Flow.findOne({"flowID": flowID, "createdBy": req.userID})
    .then(function (value) {
      if (value.flowType == 'genericRule') {
        DataParserService.toRulesEngine(value)
        .then(serviceInputFormat)
        .then(value.published == false ? 
          RulesEngineService.create : 
          RulesEngineService.update)
        .then(function(result) {
          if (result.res.statusCode == 200) {
            value.externalID = JSON.parse(result.body).triggerID 
            || value.externalID
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
      "flowID": flowID,
      "createdBy": req.userID
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
    req.body.synchronized = false
    var flowData = req.body

    Flow.update({
      "flowID": flowID,
      "createdBy": req.userID
    }, flowData)
    .then (function (value) {
      return res.ok(value[0])
    })
    .catch (function (err) {
      return res.serverError(err)
    })
  },

  delete: function (req, res) {
    weakTouch(req, res, 'delete', Flow.destroy({
      flowID: req.params.flowID,
      createdBy: req.userID
    }), res.noContent)
  },

  enable: function (req, res) {
    weakTouch(req, res, 'enable', Flow.update({
      flowID: req.params.flowID,
      createdBy: req.userID
    }, {
      enabled: true
    }), res.ok)
  },

  disable: function (req, res) {
    weakTouch(req, res, 'disable', Flow.update({
      flowID: req.params.flowID,
      createdBy: req.userID
    }, {
      enabled: false
    }), res.ok)
  }    
};