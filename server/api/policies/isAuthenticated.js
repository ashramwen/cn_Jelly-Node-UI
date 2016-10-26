module.exports = function(req, res, next) {

	UserAuthenticationService.beehive(req.headers, function(err) {
		if (err && typeof err === 'string') {
			return res.forbidden(err)
		}

		req.userID = err.userID
		return next()
	})
};