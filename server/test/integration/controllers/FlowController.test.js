var request = require('supertest'),
    should = require('should');

describe('Flow Controller', function () {

    var flowID = '';
    var userAccessToken = '';

    before(function (done) {
        done(null, sails);
    });

    it('should retrieve user token from Beehive server', function (done) {
        request(sails.config.constants.beehiveProdServerBase)
        .post('/beehive-portal/api/oauth2/login')
        .send({
            "userName": "alfred",
            "password":"1qaz2wsx"
        })
        .expect(200)
        .expect(function (res) {
            if (!res.body.accessToken) throw new Error("failed retieving user access token");
            userAccessToken = res.body.accessToken
        })
        .end(function (err, res) {
            if (err) return done(err);
            flowID = res.body.flowID
            should.exist(res.body);
            done();
        });
    });

    it('should save a flow', function (done) {
        request(sails.hooks.http.app)
        .post('/flows/save')
        .send({
            "flowType": "rule",
            "flow": {
                "key": "value"
            }
        })
        .set({"authorization": "Bearer " + userAccessToken})
        .expect(201)
        .expect(function (res) {
            if (!('flowType' in res.body)) throw new Error("missing flowType key");
            if (!('flow' in res.body)) throw new Error("missing flow key");
            if (!('createdBy' in res.body)) throw new Error("missing createdBy key");
            if (!('flowID' in res.body)) throw new Error("missing flowID key");
            if (!(res.body.synchronized == false)) throw new Error("synchronized key wrong default value");
            if (!(res.body.published == false)) throw new Error("published key wrong default value");
            if (!(res.body.enabled == false)) throw new Error("enabled key wrong default value");
            if (!('createdAt' in res.body)) throw new Error("missing createdAt key");
            if (!('updatedAt' in res.body)) throw new Error("missing updatedAt key");
        })
        .end(function (err, res) {
            if (err) return done(err);
            flowID = res.body.flowID
            should.exist(res.body);
            done();
        });
    });

    it('should get flows', function (done) {
        request(sails.hooks.http.app)
        .get('/flows')
        .set({"authorization": "Bearer " + userAccessToken})
        .expect(200)
        .expect(function (res) {
            if (!(typeof res.body == 'object')) throw new Error ("wrong body type");
            if (!(res.body.length == 1)) throw new Error ("wrong number of flows");
        })
        .end(function (err, res) {
            if (err) return done(err);
            should.exist(res.body);
            done();
        });
    });

    it('should get a flow', function (done) {
        request(sails.hooks.http.app)
        .get('/flows/' + flowID)
        .set({"authorization": "Bearer " + userAccessToken})
        .expect(200)
        .expect(function (res) {
            if (!(typeof res.body == 'object')) throw new Error ("wrong body type");
            if (!('flowType' in res.body)) throw new Error("missing flowType key");
            if (!('flow' in res.body)) throw new Error("missing flow key");
            if (!('createdBy' in res.body)) throw new Error("missing createdBy key");
            if (!('flowID' in res.body)) throw new Error("missing flowID key");
            if (!(res.body.synchronized == false)) throw new Error("synchronized key wrong default value");
            if (!(res.body.published == false)) throw new Error("published key wrong default value");
            if (!(res.body.enabled == false)) throw new Error("enabled key wrong default value");
            if (!('createdAt' in res.body)) throw new Error("missing createdAt key");
            if (!('updatedAt' in res.body)) throw new Error("missing updatedAt key");
        })
        .end(function (err, res) {
            if (err) return done(err);
            should.exist(res.body);
            done();
        });
    });

    it('should update a flow', function (done) {
        request(sails.hooks.http.app)
        .put('/flows/' + flowID)
        .set({"authorization": "Bearer " + userAccessToken})
        .send({
            "flowType": "rule",
            "flow": {
                "key2": "value2"
            }
        })
        .expect(200)
        .expect(function (res) {
            if (!(typeof res.body == 'object')) throw new Error ("wrong body type");
            if (!(res.body[0].flow.key2 == 'value2')) throw new Error ("update does not take effect");
        })
        .end(function (err, res) {
            if (err) return done(err);
            should.exist(res.body);
            done();
        });
    });

    it('should delete a flow', function (done) {
        request(sails.hooks.http.app)
        .delete('/flows/' + flowID)
        .set({"authorization": "Bearer " + userAccessToken})
        .expect(204)
        .expect(function (res) {
            Flow.findOne({flowID: flowID})
            .then (function (value) {
                if (value != undefined)
                    throw new Error ("flow delete does not take effect")
            })
        })
        .end(function (err, res) {
            if (err) return done(err);
            should.exist(res.body);
            done();
        });
    });
});
