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