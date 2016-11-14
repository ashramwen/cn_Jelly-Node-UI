import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from '../nodes/location-node/location-node.type';
import { JNDeviceTypeNode } from '../nodes/device-type-node/device-type-node.type';
import { JNDevicePropertyNode } from '../nodes/device-property-node/device-property-node.type';
import { JNConditionNode } from '../nodes/condition-node/condition-node.type';
import { JNConjunctionNode } from '../nodes/conjunction-node/conjunction-node.type';
import { JNTimeNode } from '../nodes/time-node/time-node.type';
import { JNRuleNode } from '../nodes/rule-node/rule-node.type';
import { JNActionNode } from '../nodes/action-node/action-node.type';
import { IJNPaletteNode } from '../../views/palette/palette-node.type';
import { IJNPaletteConnection } from '../../views/palette/palette-connections.type';
import { IJNPaletteModel } from '../../views/palette/interfaces/palette-model.type';

export class IJNPaletteService {

  static allNodeTypeEntities: Array<typeof JNBaseNode> = [JNLocationNode, JNDeviceTypeNode, JNDevicePropertyNode,
    JNConditionNode, JNConjunctionNode, JNTimeNode, JNRuleNode, JNActionNode];

  static getPaletteProperties(selectedNodeType: typeof JNBaseNode): Object {
    let nodes: Array<IJNPaletteNode>;
    let connections: Array<IJNPaletteConnection>;
    IJNPaletteService.allNodeTypeEntities.forEach(function (nodeType) {
      let node = new IJNPaletteNode(selectedNodeType, nodeType);
      if (node.acceptable && (<typeof IJNPaletteModel>nodeType.paletteModel.constructor).containDynamicProperty) {
        let connection = IJNPaletteService.getConnections(selectedNodeType, nodeType);
        connections.push(connection);
      }
      nodes.push(node);
    })
    let paletteProperties = {
      "nodes": nodes,
      "connections": connections
    }
    return paletteProperties;
  }

  static getNodes(selectedNodeType: typeof JNBaseNode): Array<IJNPaletteNode> {
    let nodes: Array<IJNPaletteNode>;
    IJNPaletteService.allNodeTypeEntities.forEach(function (nodeType) {
      let node = new IJNPaletteNode(selectedNodeType, nodeType);
      nodes.push(node);
    })
    return nodes;
  }

  static getConnections(selectedNodeType: typeof JNBaseNode, nodeType: typeof JNBaseNode): IJNPaletteConnection {
    let connection = (<typeof IJNPaletteModel>selectedNodeType.paletteModel.constructor).createConnection(selectedNodeType);
    return connection;
  }

}