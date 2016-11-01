var uuid = require('uuid');

module.exports = {

  attributes: {
  	autoPK: false,
  	flowID: {
  		type: 'string',
    	primaryKey: true,
    	defaultsTo: function() { 
    		return uuid.v4() 
    	},
    	required: true,
    	unique: true
  	},
  	createdBy: {
  		type: 'string',
  		required: true
  	},
  	flowType: {
  		type: 'string',
  		enum: ['rule', 'reporting'],
  		required: true
  	},
  	flow: {
  		type: 'json',
  		required: true
  	},
  	published: {
  		type: 'boolean',
  		required: true,
  		defaultsTo: function() {
  			return false
  		}
  	},
  	synchronized: {
  		type: 'boolean',
  		required: true,
  		defaultsTo: function() {
  			return false
  		}
  	},
  	enabled: {
  		type: 'boolean',
  		required: true,
  		defaultsTo: function() {
  			return false
  		}
  	}
  }
};