import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { IJNPaletteNode } from '../palette-node.type';
import { IJNPaletteConnection } from '../palette-connections.type';

export abstract class IJNPaletteModel {
  static staticPropertyTitle: String = "nodes";
  static dynamicPropertyTitle: String = "connections";
  nodes: Array<IJNPaletteNode>;
  connections: Array<IJNPaletteConnection>;
  static containDynamicProperty: boolean = false;

  static createProperty(value: string, input?): Object {
    return
  }

  static createConnection(selectedNode: typeof JNBaseNode, input?): IJNPaletteConnection {
    return
  }

}
