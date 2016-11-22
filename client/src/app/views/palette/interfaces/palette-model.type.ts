import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNApplication } from '../../../core/services/application-core.service';
import { JNUtils } from '../../../share/util';
import { JNDeviceTypeNode } from '../../../externals/nodes/device-type-node/device-type-node.type';
import { ConditionNodeService } from '../../../externals/nodes/condition-node/condition-node.service';
import { JNPaletteConnection } from './palette-connections.type';
import { JNPaletteNode } from './palette-node.type';

export abstract class JNPaletteModel {
  staticPropertyTitle: string = 'nodes';
  dynamicPropertyTitle: string = 'connections';
  protected node: JNBaseNode;

  get nodes(): Array<JNPaletteNode> {
    return this.getNodes();
  }

  get connections(): JNPaletteConnection[]{
    return this.createConnection();
  }

  static getNodes() {
    let types = JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper).map(pair => pair.value);

    return types.map(nodeType => {
      return new JNPaletteNode(null, nodeType, JNBaseNode.getName(nodeType, null));
    });
  }

  constructor(node) {
    this.node = node;
  }

  protected createConnection(): JNPaletteConnection[] {
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
