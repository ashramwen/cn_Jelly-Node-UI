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