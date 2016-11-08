import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from '../../externals/nodes/location-node/location-node.type';

export class IJNPaletteNode {
  node: String;
  connection: String;
  icon: String;
  color: String;
  borderColor: String;
  disabled: Boolean;
  accepts: Boolean;
  outputsTo: Boolean;
}