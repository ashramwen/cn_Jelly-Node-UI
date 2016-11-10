import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { IJNPaletteNode } from '../palette-node.type';
import { IJNPaletteConnection } from './palette-connections.type';

export abstract class IJNPaletteModel {
  staticPropertyTitle: String;
  dynamicPropertyTitle: String;
  nodes: Array<IJNPaletteNode>;
  connections: Array<IJNPaletteConnection>;

  getNodes(selectedNode: JNBaseNode, staticNodes: Array<JNBaseNode>) {
    this.nodes = [];
    staticNodes.forEach((node: JNBaseNode) => {
      this.nodes.push(new IJNPaletteNode(selectedNode, node));
    })
    return this.nodes;
  }

}
