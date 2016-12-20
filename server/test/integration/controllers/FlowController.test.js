var request = require('supertest'),
    should = require('should');

var genericRuleFlowBody = {
  "flowType": "genericRule",
  "flowName": "virgine rule",
  "flowDescription": "",
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
    "type": "Rule",
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

var genericRuleFlowBodyUpdate = {
  "flowType": "genericRule",
  "flowName": "milf rule",
  "flowDescription": "",
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
    "type": "Rule",
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

describe('Flow Controller', function() {

  var flowID = '';
  var userAccessToken = '';

  before(function(done) {
    done(null, sails);
  });

  it('should retrieve user token from Beehive server', function(done) {
    request(sails.config.constants.beehiveProdServerBase)
      .post('/beehive-portal/api/oauth2/login')
      .send({
        "userName": "alfred",
        "password": "1qaz2wsx"
      })
      .expect(200)
      .expect(function(res) {
        if (!res.body.accessToken) throw new Error("failed retieving user access token");
        userAccessToken = res.body.accessToken
      })
      .end(function(err, res) {
        if (err) return done(err);
        flowID = res.body.flowID
        should.exist(res.body);
        done();
      });
  });

  it('should save a flow', function(done) {
    request(sails.hooks.http.app)
      .post('/flows/save')
      .send(genericRuleFlowBody)
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .expect(201)
      .expect(function(res) {
        if (!('flowType' in res.body)) throw new Error("missing flowType key");
        if (!('flowName' in res.body)) throw new Error("missing flow key");
        if (!('createdBy' in res.body)) throw new Error("missing createdBy key");
        if (!('flowID' in res.body)) throw new Error("missing flowID key");
        if (!(res.body.synchronized == false)) throw new Error("synchronized key wrong default value");
        if (!(res.body.published == false)) throw new Error("published key wrong default value");
        if (!(res.body.enabled == true)) throw new Error("enabled key wrong default value");
        if (!('createdAt' in res.body)) throw new Error("missing createdAt key");
        if (!('updatedAt' in res.body)) throw new Error("missing updatedAt key");
      })
      .end(function(err, res) {
        if (err) return done(err);
        flowID = res.body.flowID
        should.exist(res.body);
        done();
      });
  });

  it('should get a flow before publish', function(done) {
    request(sails.hooks.http.app)
      .get('/flows/' + flowID)
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!('flowType' in res.body)) throw new Error("missing flowType key");
        if (!('flowName' in res.body)) throw new Error("missing flow key");
        if (!('createdBy' in res.body)) throw new Error("missing createdBy key");
        if (!('flowID' in res.body)) throw new Error("missing flowID key");
        if (!(res.body.synchronized == false)) throw new Error("synchronized key wrong default value");
        if (!(res.body.published == false)) throw new Error("published key wrong default value");
        if (!(res.body.enabled == true)) throw new Error("enabled key wrong default value");
        if (!('createdAt' in res.body)) throw new Error("missing createdAt key");
        if (!('updatedAt' in res.body)) throw new Error("missing updatedAt key");
      })
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it('should get a list of flows', function(done) {
    request(sails.hooks.http.app)
      .get('/flows')
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!(res.body.length == 1)) throw new Error("wrong number of flows");
      })
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it('should publish a virginal flow', function(done) {
    request(sails.hooks.http.app)
      .post('/flows/' + flowID + '/publish')
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .send()
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!(res.body.published == true)) throw new Error('published flag wrong')
        if (!(res.body.synchronized == true)) throw new Error('synchronized flag wrong')
        if (!('externalID' in res.body)) throw new Error('missing externalID')
      })
      .end(function(err, res) {
        if (err) return done(err)
        should.exist(res.body)
        done()
      })
  })

  it('should update a flow', function(done) {
    request(sails.hooks.http.app)
      .put('/flows/' + flowID)
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .send(genericRuleFlowBodyUpdate)
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!(res.body.synchronized == false)) throw new Error("synchronized flag wrong")
        if (!(res.body.flowName == 'milf rule')) throw new Error("wrong updated flow name")
        if (!('enabled' in res.body)) throw new Error('missing enabled')
        if (!('createdAt' in res.body)) throw new Error("missing createdAt key");
        if (!('updatedAt' in res.body)) throw new Error("missing updatedAt key");
        if (!('createdBy' in res.body)) throw new Error("missing createdBy key");
      })
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });

  it('should publish a milf flow', function(done) {
    request(sails.hooks.http.app)
      .post('/flows/' + flowID + '/publish')
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .send()
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!(res.body.published == true)) throw new Error('published flag wrong')
        if (!(res.body.synchronized == true)) throw new Error('synchronized flag wrong')
        if (!('externalID' in res.body)) throw new Error('missing externalID')
      })
      .end(function(err, res) {
        if (err) return done(err)
        should.exist(res.body)
        done()
      })
  })

  it('should disable a flow', function(done) {
    request(sails.hooks.http.app)
      .put('/flows/' + flowID + '/disable')
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .send()
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!(res.body.enabled == false)) throw new Error('enabled flag wrong')
      })
      .end(function(err, res) {
        if (err) return done(err)
        should.exist(res.body)
        done()
      })
  })

  it('should enable a flow', function(done) {
    request(sails.hooks.http.app)
      .put('/flows/' + flowID + '/enable')
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .send()
      .expect(200)
      .expect(function(res) {
        if (!(typeof res.body == 'object')) throw new Error("wrong body type");
        if (!(res.body.enabled == true)) throw new Error('enabled flag wrong')
      })
      .end(function(err, res) {
        if (err) return done(err)
        should.exist(res.body)
        done()
      })
  })

  it('should delete a flow', function(done) {
    request(sails.hooks.http.app)
      .delete('/flows/' + flowID)
      .set({
        "authorization": "Bearer " + userAccessToken
      })
      .expect(204)
      .expect(function(res) {
        Flow.findOne({
            flowID: flowID
          })
          .then(function(value) {
            if (value != undefined)
              throw new Error("flow delete does not take effect")
          })
      })
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body);
        done();
      });
  });
});
