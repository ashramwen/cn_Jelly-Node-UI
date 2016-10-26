module.exports = function(req, res, next) {

	var contentType = req.headers['content-type']
	if (!contentType || contentType != 'application/json')
		return res.badRequest('Invalid Content Type')
	
	var body = req.body;

	//TODO
	return next()
};