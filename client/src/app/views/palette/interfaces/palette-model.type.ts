import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNPaletteNode } from '../palette-node.type';
import { JNPaletteConnection } from '../palette-connections.type';
import { JNApplication } from '../../../core/services/application-core.service';
import { JNUtils } from '../../../share/util';
import { JNDeviceTypeNode } from '../../../externals/nodes/device-type-node/device-type-node.type';
import { ConditionNodeService } from '../../../externals/nodes/condition-node/condition-node.service';

export class JNPaletteModel {
  staticPropertyTitle: String = "nodes";
  dynamicPropertyTitle: String = "connections";
  nodes: Array<JNPaletteNode>;
  connections: Array<JNPaletteConnection>;

  static getNodes(selectedNodeType: typeof JNBaseNode): Array<JNPaletteNode> {
    let nodes: Array<JNPaletteNode> = [];
    let types = JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper).map(pair => pair.value);

    types.forEach(nodeType => {
      let node = new JNPaletteNode(selectedNodeType, nodeType, JNBaseNode.getName(nodeType, null));
      nodes.push(node);
    })
    return nodes;
  }

  constructor(){
    this.nodes = JNPaletteModel.getNodes(null);
    this.connections = [];
  }

  static createProperty(value: string, input?): Object {
    return
  }

  static createConnection(selectedNode: typeof JNBaseNode, input?): JNPaletteConnection {
    return
  }

  // static getPaletteProperties(selectedNodeType: typeof JNBaseNode): Object {
  // let nodes: Array<JNPaletteNode> = [];
  // let connections: Array<JNPaletteConnection>;
  // JNPaletteModel.allNodeTypeEntities.forEach(function (nodeType) {
  //   let node = new JNPaletteNode(selectedNodeType, nodeType);
  //   if (node.acceptable && (<typeof IJNPaletteModel>nodeType.paletteModel.constructor).containDynamicProperty) {
  //     let connection = JNPaletteModel.getConnections(selectedNodeType, nodeType);
  //     connections.push(connection);
  //   }
  //   nodes.push(node);
  // })
  // let paletteProperties = {
  //   "nodes": nodes,
  //   "connections": connections
  // }
  // return paletteProperties;
  // }

  static getConnections(selectedNodeType: typeof JNBaseNode, nodeType: typeof JNBaseNode): JNPaletteConnection {
    let connection = (<typeof JNPaletteModel>selectedNodeType.paletteModel.constructor).createConnection(selectedNodeType);
    return connection;
  }

}
