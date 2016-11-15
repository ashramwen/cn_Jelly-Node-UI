var Q = require('q')

// parse condition branch
var conditionParser = function(nodeSet, conditionNodes, clauses, summarySource, depth) {
	for (var i = 0; i < conditionNodes.length; i++) {
		var condition = {
			clauses: [],
			type: "and"	// for multiple properties in a condition, defaults to and clause
		}
		var currentNode = nodeSet[conditionNodes[i]]
		var numOfConditions = currentNode.conditions.length
		var sourceKey = depth.toString()
		summarySource[sourceKey] = {
			expressList: [],
			source: {
				thingList: []
			}
		}
		for (var j = 0; j < numOfConditions; j++) {
			//set summarySource -> expressList
			summarySource[sourceKey].expressList[j] = {
				stateName: currentNode.conditions[j].property,
				function: currentNode.conditions[j].aggregation,
				summaryAlias: j.toString()
			}
			//set condition
			var clause = {
				field: sourceKey.toString() + '.' + j.toString(),
				type: currentNode.conditions[j].operator == 'eq' ? 'eq' : 'range'
			}
			if (currentNode.conditions[j].operator == 'eq') {
				clause.value = currentNode.conditions[j].value
			} else if (currentNode.conditions[j].operator == 'lte') {
				clause.upperLimit = currentNode.conditions[j].value
				clause.upperIncluded = true
				clause.lowerIncluded = false
			} else if (currentNode.conditions[j].operator == 'gte') {
				clause.lowerLimit = currentNode.conditions[j].value
				clause.lowerIncluded = true
				clause.upperIncluded = false
			}
			condition.clauses.push(clause)
			//set summarySource -> source]
			var conditionNodeID = currentNode.nodeID
			currentNode = nodeSet[currentNode.accepts[0]]
			currentNode = nodeSet[currentNode.accepts[0]]
			summarySource[sourceKey].source = {
				thingList: currentNode.things
			}
			currentNode = nodeSet[conditionNodeID]
		}
		clauses.push(condition)
	}
}

// parse conjunction branch
var conjunctionParser = function(nodeSet, currentNode, condition, summarySource, depth) {
	currentNode.accepts.forEach(function (coin) {
		currentNode = nodeSet[coin]
		if (currentNode.type == 'Condition') {	
			var clauses = []
			conditionParser(nodeSet, [currentNode.nodeID], clauses, summarySource, depth)
			condition.clauses.push(clauses[0])
			depth ++
		} else if (currentNode.type == 'Conjunction') {
			var subCondition = {
				clauses: [],
				type: currentNode.conjunction
			}
			condition.clauses.push(subCondition)
			console.log(depth)
			conjunctionParser(nodeSet, currentNode, subCondition, summarySource, depth)
			depth ++
		}
	})
}

module.exports = {

  toRulesEngine: function (options, done) {
  	// rule engine body skeleton
  	var result = {
  		triggerType: 'summary',
  		predicate: {},
  		summarySource: {},
  		targets: []
  	}

  	// supportive variables
  	var nodeSet = {}
  	var primaryNodes = []
  	var currentNode = {}

  	// construct nodeSet and primaryNodes
  	options.forEach(function(node) {
  		node.nodeID = parseInt(node.nodeID)
  		if (node.type == 'rule')
  			primaryNodes.push(node)
  		if (!(node.nodeID in nodeSet))
  			nodeSet[node.nodeID] = node
  		else {
  			var directs = nodeSet[node.nodeID].directs
  			nodeSet[node.nodeID] = node
  			nodeSet[node.nodeID].directs = directs
  		}
  		node.accepts.forEach(function (accept) {
  			if (nodeSet[parseInt(accept)] && nodeSet[parseInt(accept)]['directs'])
  				nodeSet[parseInt(accept)]['directs'].push(node.nodeID)
  			else if (nodeSet[parseInt(accept)])
  				nodeSet[parseInt(accept)]['directs'] = [node.nodeID]
  			else 
  				nodeSet[parseInt(accept)] = {
  					directs: [node.nodeID]
  				}
  		})
  	})

  	primaryNodes.forEach(function (ruleNode) {	// loop through primary nodes
  		// TODO set rule name and description

  		result.predicate.triggersWhen = ruleNode.triggerWhen // set trigger when
  		currentNode = nodeSet[ruleNode.accepts[0]]	// rule node only accept one node

  		// set predicate and summary source
  		if (currentNode.type == 'Time') {
  			//TODO
  			var todo = 'soon'
  		} else if (currentNode.type == 'Condition') {	
  			var clauses = []
  			conditionParser(nodeSet, [currentNode.nodeID], clauses, result.summarySource, 0)
  			result.predicate.condition = clauses[0]
  		} else if (currentNode.type == 'Conjunction') {
  			result.predicate.condition = {
					clauses: [],
					type: currentNode.conjunction
				}
				conjunctionParser(nodeSet, currentNode, result.predicate.condition, 
					result.summarySource, 0)
  		}

  		// set targets
  		ruleNode.directs.forEach(function(actionNodeID) {
  			currentNode = nodeSet[actionNodeID]
  			if (currentNode.type == 'DeviceType') {
  				var thingList = currentNode.things
  				currentNode.directs.forEach(function(commandNodeID) {
  					currentNode = nodeSet[commandNodeID]
  					var target = {
  						type: 'thingCommand',
  						thingList: thingList,
  						doubleCheck: false,
  						delay: currentNode.delay,
  						command: {
  							actions: []
  						}
  					}
  					var action = {}
  					action[currentNode.actionName] = {}
  					action[currentNode.actionName][currentNode.properties[0].propertyName] 
  						= currentNode.properties[0].propertyValue
  					target.command.actions.push(action)
  					result.targets.push(target)
  				})
  			} else if (currentNode.type == 'Api') {
  				var target = {
  					type: 'HttpApiCall',
  					url: currentNode.apiUrl,
  					method: currentNode.method,
  					headers: currentNode.header,
  					content: JSON.stringify(currentNode.body),
  					delay: currentNode.delay,
  					doubleCheck: false
  				}
  				result.targets.push(target)
  			}
  		})
  	})
    return done(result)
  }
};