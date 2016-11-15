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
    //TODO
    // DataParserService.toRulesEngine(value)
    // .then (function (value) {
    //   RulesEngineService.create()
    // })    
    // .catch(function (err) {

    // })
    var body = [{
      "locationID": "0807W-A01",
      "locationStr": ["08", "0807", "0807W", "0807W-A01"],
      "type": "Location",
      "nodeID": 1,
      "accepts": []
    }, {
      "typeName": "EnvironmentSensor",
      "things": [1093, 1234, 5332],
      "locations": ["0807W-A01"],
      "type": "DeviceType",
      "nodeID": 2,
      "accepts": [1]
    }, {
      "property": "brightness",
      "typeName": "EnvironmentSensor",
      "type": "DeviceProperty",
      "nodeID": 3,
      "accepts": [2]
    }, {
      "property": "humanity",
      "typeName": "EnvironmentSensor",
      "type": "DeviceProperty",
      "nodeID": 4,
      "accepts": [2]
    }, {
      "locationID": "0807W-A02",
      "locationStr": ["08", "0807", "0807W", "0807W-A02"],
      "type": "Location",
      "nodeID": 5,
      "accepts": []
    }, {
      "typeName": "EnvironmentSensor",
      "things": [4423, 5642, 5523],
      "locations": ["0807W-A02"],
      "type": "DeviceType",
      "nodeID": 6,
      "accepts": [5]
    }, {
      "property": "brightness",
      "typeName": "EnvironmentSensor",
      "type": "DeviceProperty",
      "nodeID": 7,
      "accepts": [6]
    }, {
      "property": "humanity",
      "typeName": "EnvironmentSensor",
      "type": "DeviceProperty",
      "nodeID": 8,
      "accepts": [6]
    }, {
      "conditions": [{
        "aggregation": "avg",
        "property": "brightness",
        "operator": "gte",
        "value": 50
      }, {
        "aggregation": "min",
        "property": "humanity",
        "operator": "lte",
        "value": 100
      }],
      "type": "Condition",
      "nodeID": 9,
      "accepts": [3, 4]
    }, {
      "conditions": [{
        "aggregation": "avg",
        "property": "brightness",
        "operator": "gte",
        "value": 50
      }, {
        "aggregation": "min",
        "property": "humanity",
        "operator": "lte",
        "value": 100
      }],
      "type": "Condition",
      "nodeID": 10,
      "accepts": [7, 8]
    }, {
      "type": "Conjunction",
      "nodeID": 11,
      "accepts": [9, 10],
      "conjunction": "and"
    }, {
      "ruleName": "亮度控制",
      "description": "这是一条描述",
      "triggerWhen": "CONDITION_FALSE_TO_TRUE",
      "type": "rule",
      "nodeID": 12,
      "accepts": [11]
    }, {
      "locationID": "0807W-A01",
      "locationStr": ["08", "0807", "0807W", "0807W-A01"],
      "type": "Location",
      "nodeID": 13,
      "accepts": []
    }, {
      "typeName": "Lighting",
      "things": [8634],
      "locations": ["0807W-A01"],
      "type": "DeviceType",
      "nodeID": 14,
      "accepts": [12, 13]
    }, {
      "actionName": "turnPower",
      "delay": 0,
      "properties": [{
        "propertyName": "power",
        "propertyValue": 0
      }],
      "type": "DeviceAction",
      "nodeID": 15,
      "accepts": [14]
    }, {
      "apiName": "切换白天模式",
      "delay": 5,
      "apiUrl": "http://vsdfd.controls.com/api/mode",
      "method": "POST",
      "body": {
        "mode": "daytime"
      },
      "header": {
        "Authorization": "Bearer super_token"
      },
      "type": "Api",
      "nodeID": 16,
      "accepts": [12]
    }]
    DataParserService.toRulesEngine(body, function(result) {
      res.ok(result)
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
      return res.serviceError(err)
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
      return res.serviceError(err)
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
      return res.serviceError(err)
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