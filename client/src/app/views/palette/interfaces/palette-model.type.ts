import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { JNPaletteConnection } from './palette-connections.type';
import { JNPaletteNode } from './palette-node.type';
import { JNApplication } from '../../../share/services/application-core.service';

export abstract class JNPaletteModel {
  staticPropertyTitle: string = 'nodes';
  dynamicPropertyTitle: string = 'connections';
  protected node: JNBaseNode;

  get nodes(): Array<JNPaletteNode> {
    return this.getNodes();
  }

  get connections(): JNPaletteConnection[] {
    return this.createConnections()
      .map(n => {
        n.properties.forEach(p => p.isConnection = true);
        return n;
      });
  }

  static getNodes(): JNPaletteNode[] {
    let types = JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper).map(pair => pair.value);

    return types.map(nodeType => {
      return new JNPaletteNode(null, nodeType, JNBaseNode.getName(nodeType, null));
    });
  }

  constructor(node) {
    this.node = node;
  }

  protected createConnections(): JNPaletteConnection[] {
    return [];
  }

  private getNodes(): Array<JNPaletteNode> {
    let nodes: Array<JNPaletteNode> = [];
    let types = JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper).map(pair => pair.value);

    return types.map(nodeType => {
      return new JNPaletteNode(<typeof JNBaseNode>this.node.constructor,
        nodeType,
        JNBaseNode.getName(nodeType, null));
    });
  }
}
