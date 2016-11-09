import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from '../../externals/nodes/location-node/location-node.type';

export class IJNPaletteNode {
  type: String;
  name: String;
  icon: String;
  color: String;
  borderColor: String;
  disabled: Boolean;
  accepts: Boolean;
  outputsTo: Boolean;

  constructor(nodeType){
    this.icon = nodeType.icon;
    this.color = nodeType.color;
    this.borderColor = nodeType.borderColor;
  }
}