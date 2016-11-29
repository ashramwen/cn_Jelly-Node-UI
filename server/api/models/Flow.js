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
    externalID: {
      type: 'string',
      required: false
    },
  	createdBy: {
  		type: 'string',
  		required: true
  	},
  	flowType: {
  		type: 'string',
  		enum: ['genericRule', 'envRule', 'reporting'],
  		required: true
  	},
    flowName: {
      type: 'string',
      required: true
    },
    flowDescription: {
      type: 'string',
      required: false
    },
  	nodes: {
  		type: 'array',
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
  			return true
  		}
  	}
  }
};