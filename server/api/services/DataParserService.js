var Q = require('q')

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
  	var result = {
  		triggerType: 'summary',
  		predicate: {},
  		summarySource: {},
  		targets: []
  	}
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

  	primaryNodes.forEach(function (ruleNode) {
  		// TODO set rule name and description
  		result.predicate.triggersWhen = ruleNode.triggerWhen // set trigger when
  		currentNode = nodeSet[ruleNode.accepts[0]]
  		if (currentNode.type == 'Time') {
  			//TODO
  		} else if (currentNode.type == 'Condition') {
  			var clauses = []
  			conditionParser(nodeSet, [currentNode.nodeID], clauses, result.summarySource, 0)
  			result.predicate.condition = clauses[0]
  		} else if (currentNode.type == 'Conjunction') {
  			/* assumes conjunction node only accepts condition nodes*/
  			
  			// var clauses = []
  			// result.predicate.condition = {
  			// 	clauses: [],
  			// 	type: currentNode.conjunction
  			// }
  			// conditionParser(nodeSet, currentNode.accepts, clauses, result.summarySource)
  			// result.predicate.condition.clauses = clauses

  			result.predicate.condition = {
					clauses: [],
					type: currentNode.conjunction
				}
				conjunctionParser(nodeSet, currentNode, result.predicate.condition, 
					result.summarySource, 0)
  		}
  		// TODO Target actions

  	})
    return done(result)
  }
};