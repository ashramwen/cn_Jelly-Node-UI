import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { IJNPaletteNode } from '../palette-node.type';
import { IJNPaletteConnection } from '../palette-connections.type';
import { IJNPaletteService } from '../../../externals/services/palette.service';

export abstract class IJNPaletteModel {
  static staticPropertyTitle: String = "nodes";
  static dynamicPropertyTitle: String = "connections";
  nodes: Array<IJNPaletteNode>;
  connections: Array<IJNPaletteConnection>;
  static containDynamicProperty;

  static getStaticNodes() {
    IJNPaletteService.getNodes(null);
  }

  static createProperty(value: string, input?): Object {
    return
  }

  static createConnection(selectedNode: typeof JNBaseNode, input?): IJNPaletteConnection {
    return
  }

}
