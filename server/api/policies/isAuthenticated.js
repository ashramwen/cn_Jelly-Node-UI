module.exports = function(req, res, next) {

	var authorization = req.headers.authorization;

	if (! authorization) {
		return res.forbidden('authorization header missing')
	}

	if (!(authorization.split().length == 2 && authorization.split()[0] == 'Bearer')) {
		return res.forbidden('authorization header misformat')
	}

	UserAuthenticationService.beehive(authorization, function(err) {
		if (err) {
			return res.forbidden(err)
		}

		return next()
	})
};