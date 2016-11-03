```json
[
  {
    "locationID": "0807W-A01",
    "locationStr": ["08", "0807", "0807W", "0807W-A01"],
    "type": "Location",
    "nodeID": 1,
    "accepts": []
  },
  {
    "typeName": "EnvironmentSensor",
    "things": [1093, 1234, 5332],
    "locations": ["0807W-A01"],
    "type": "DeviceType",
    "nodeID": 2,
    "accepts": [1]
  },
  {
    "property": "brightness",
    "typeName": "EnvironmentSensor",
    "type": "DeviceProperty",
    "nodeID": 3,
    "accepts": [2]
  },
  {
    "property": "humanity",
    "typeName": "EnvironmentSensor",
    "type": "DeviceProperty",
    "nodeID": 3,
    "accepts": [2]
  },
  {
    "locationID": "0807W-A02",
    "locationStr": ["08", "0807", "0807W", "0807W-A02"],
    "type": "Location",
    "nodeID": 4,
    "accepts": []
  },
  {
    "typeName": "EnvironmentSensor",
    "things": [4423,5642,5523],
    "locations": ["0807W-A02"],
    "type": "DeviceType",
    "nodeID": 5,
    "accepts": [4]
  },
  {
    "property": "brightness",
    "typeName": "EnvironmentSensor",
    "type": "DeviceProperty",
    "nodeID": 6,
    "accepts": [5]
  },
  {
    "property": "humanity",
    "typeName": "EnvironmentSensor",
    "type": "DeviceProperty",
    "nodeID": 7,
    "accepts": [6]
  },
  {
    "conditions": [
      {
        "aggregation": "avg",
        "property": "brightness",
        "operator": "gte",
        "value": 50
      },
      {
        "aggregation": "min",
        "property": "humanity",
        "operator": "lte",
        "value": 100
      }
    ],
    "type": "Condition",
    "nodeID": 8,
    "accepts": [3]
  },
  {
    "conditions": [
      {
        "aggregation": "avg",
        "property": "brightness",
        "operator": "gte",
        "value": 50
      },
      {
        "aggregation": "min",
        "property": "humanity",
        "operator": "lte",
        "value": 100
      }
    ],
    "type": "Condition",
    "nodeID": 9,
    "accepts": [4]
  },
  {
    "type": "Conjunction",
    "nodeID": 10,
    "accepts": [8, 9],
    "conjunction": "and"
  },
  {
    "ruleName": "亮度控制",
    "description": "这是一条描述",
    "triggerWhen": "CONDITION_FALSE_TO_TRUE",
    "type": "rule",
    "nodeID": 11,
    "accepts": [10, 12]
  },
  {
    "timeType": "interval",
    "interval": 30,
    "unit": "m",
    "nodeID": 12,
    "accepts": []
  },
  {
    "locationID": "0807W-A01",
    "locationStr": ["08", "0807", "0807W", "0807W-A01"],
    "type": "Location",
    "nodeID": 13,
    "accepts": []
  },
  {
    "typeName": "Lighting",
    "things": [8634],
    "locations": ["0807W-A01"],
    "type": "DeviceType",
    "nodeID": 14,
    "accepts": [13]
  },
  {
    "actionName": "turnPower",
    "properties": [{
      "propertyName": "power",
      "propertyValue": 0
    }],
    "type": "DeviceAction",
    "nodeID": 15,
    "accepts": [14]
  },
  {
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
    "accepts": [14]
  }
]
```