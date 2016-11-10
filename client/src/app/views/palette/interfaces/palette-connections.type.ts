import { IJNPaletteNode } from '../palette-node.type';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';

export class IJNPaletteConnection {
  title: String;
  properties: Array<IJNPaletteNode>;

  getConnections(selectedNodes: JNBaseNode) {
    
    
  }
}