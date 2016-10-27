var request = require('request')
var beehiveBase = sails.config.constants.beehiveProdServerBase

module.exports = {

	beehive: function(options, done) {
		var authorization = options.authorization;

		if (!authorization) {
			return done('authorization header missing')
		}

		if (!(authorization.split(' ').length == 2 && authorization.split(' ')[0] == 'Bearer')) {
			return done('authorization header misformat')
		}

		var options = {
			method: 'POST',
			url: beehiveBase + '/beehive-portal/api/oauth2/validateLoginAccessToken',
			headers: {
				'content-type': 'application/json'
			},
			body: authorization.split(' ')[1]
		};

		request(options, function(error, response, body) {
			if (error)
				return done(error)

			if (response.statusCode == '401')
				return done('Invalid Access Token')

			if (response.statusCode == '500')
				return done('Upstream service down')
			return done({userID: JSON.parse(body).userID})
		});
	},

	dummy: function(options, done) {
		return done()
	}
};
