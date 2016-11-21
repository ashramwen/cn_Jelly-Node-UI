var assert = require('assert')
var Q = require('q')

var dataParserServiceTestInput1 = {
	"flowType": "genericRule",
	"flowName": "virgine rule",
	"flowDescription": "description",
	"nodes": [{
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
}

var dataParserServiceTestInput2 = {
	"flowType": "genericRule",
	"flowName": "virgine rule2",
	"flowDescription": "description",
	"nodes": [{
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
		"ruleName": "亮度控制",
		"description": "这是一条描述",
		"triggerWhen": "CONDITION_FALSE_TO_TRUE",
		"type": "rule",
		"nodeID": 12,
		"accepts": [9] //[11]
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
		"properties": [{
			"propertyName": "power",
			"propertyValue": 0
		}],
		"type": "DeviceAction",
		"nodeID": 15,
		"accepts": [14]
	}, {
		"apiName": "切换白天模式",
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
}

var dataParserServiceTestInput3 = {
	"flowType": "genericRule",
	"flowName": "virgine rule",
	"flowDescription": "description",
	"nodes": [{
		"type": "Time",
		"timeType": "interval",
		"interval": 30,
		"timeUnit": "Minute",
		"nodeID": 11,
		"accepts": []
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
}

var dataParserServiceTestExpected1 = {
	"triggerName": "virgine rule",
	"description": "description",
	"triggerType": "summary",
	"predicate": {
		"triggersWhen": "CONDITION_FALSE_TO_TRUE",
		"condition": {
			"clauses": [{
				"clauses": [{
					"field": "0.0",
					"type": "range",
					"lowerLimit": 50,
					"lowerIncluded": true,
					"upperIncluded": false
				}, {
					"field": "0.1",
					"type": "range",
					"upperLimit": 100,
					"upperIncluded": true,
					"lowerIncluded": false
				}],
				"type": "and"
			}, {
				"clauses": [{
					"field": "1.0",
					"type": "range",
					"lowerLimit": 50,
					"lowerIncluded": true,
					"upperIncluded": false
				}, {
					"field": "1.1",
					"type": "range",
					"upperLimit": 100,
					"upperIncluded": true,
					"lowerIncluded": false
				}],
				"type": "and"
			}],
			"type": "and"
		}
	},
	"summarySource": {
		"0": {
			"expressList": [{
				"stateName": "brightness",
				"function": "avg",
				"summaryAlias": "0"
			}, {
				"stateName": "humanity",
				"function": "min",
				"summaryAlias": "1"
			}],
			"source": {
				"thingList": [1093, 1234, 5332]
			}
		},
		"1": {
			"expressList": [{
				"stateName": "brightness",
				"function": "avg",
				"summaryAlias": "0"
			}, {
				"stateName": "humanity",
				"function": "min",
				"summaryAlias": "1"
			}],
			"source": {
				"thingList": [4423, 5642, 5523]
			}
		}
	},
	"targets": [{
		"type": "thingCommand",
		"thingList": [8634],
		"doubleCheck": false,
		"delay": 0,
		"command": {
			"actions": [{
				"turnPower": {
					"power": 0
				}
			}]
		}
	}, {
		"type": "HttpApiCall",
		"url": "http://vsdfd.controls.com/api/mode",
		"method": "POST",
		"headers": {
			"Authorization": "Bearer super_token"
		},
		"content": "{\"mode\":\"daytime\"}",
		"delay": 5,
		"doubleCheck": false
	}]
}

var dataParserServiceTestExpected2 = {
	"triggerName": "virgine rule2",
	"description": "description",
	"triggerType": "summary",
	"predicate": {
		"triggersWhen": "CONDITION_FALSE_TO_TRUE",
		"condition": {
			"clauses": [{
				"field": "0.0",
				"type": "range",
				"lowerLimit": 50,
				"lowerIncluded": true,
				"upperIncluded": false
			}, {
				"field": "0.1",
				"type": "range",
				"upperLimit": 100,
				"upperIncluded": true,
				"lowerIncluded": false
			}],
			"type": "and"
		}
	},
	"summarySource": {
		"0": {
			"expressList": [{
				"stateName": "brightness",
				"function": "avg",
				"summaryAlias": "0"
			}, {
				"stateName": "humanity",
				"function": "min",
				"summaryAlias": "1"
			}],
			"source": {
				"thingList": [1093, 1234, 5332]
			}
		}
	},
	"targets": [{
		"type": "thingCommand",
		"thingList": [8634],
		"doubleCheck": false,
		"command": {
			"actions": [{
				"turnPower": {
					"power": 0
				}
			}]
		}
	}, {
		"type": "HttpApiCall",
		"url": "http://vsdfd.controls.com/api/mode",
		"method": "POST",
		"headers": {
			"Authorization": "Bearer super_token"
		},
		"content": "{\"mode\":\"daytime\"}",
		"doubleCheck": false
	}]
}

var dataParserServiceTestExpected3 = {
	"triggerName": "virgine rule",
	"description": "description",
	"triggerType": "summary",
	"predicate": {
		"triggersWhen": "CONDITION_FALSE_TO_TRUE",
		"schedule": {
			"type": "interval",
			"timeunit": "Minute",
			"interval": 30
		}
	},
	"summarySource": {},
	"targets": [{
		"type": "thingCommand",
		"thingList": [8634],
		"doubleCheck": false,
		"delay": 0,
		"command": {
			"actions": [{
				"turnPower": {
					"power": 0
				}
			}]
		}
	}, {
		"type": "HttpApiCall",
		"url": "http://vsdfd.controls.com/api/mode",
		"method": "POST",
		"headers": {
			"Authorization": "Bearer super_token"
		},
		"content": "{\"mode\":\"daytime\"}",
		"delay": 5,
		"doubleCheck": false
	}]
}

describe('Data Parser Service', function() {
	before(function(done) {
		done(null, sails);
	});

	it('should convert interesting rule', function() {
		DataParserService.toRulesEngine(dataParserServiceTestInput1)
		.then(function(result) {
			assert.equal(JSON.stringify(result), JSON.stringify(dataParserServiceTestExpected1))
		})
	});

	it('should convert single condition rule', function() {
		DataParserService.toRulesEngine(dataParserServiceTestInput2)
		.then(function(result) {
			assert.equal(JSON.stringify(result), JSON.stringify(dataParserServiceTestExpected2))
		})
	})

	it('should convert time rule', function() {
		DataParserService.toRulesEngine(dataParserServiceTestInput3)
		.then(function(result) {
			assert.equal(JSON.stringify(result), JSON.stringify(dataParserServiceTestExpected3))
		})
	})
});