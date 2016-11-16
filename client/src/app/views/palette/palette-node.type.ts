import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from '../../externals/nodes/location-node/location-node.type';

export class JNPaletteNode {
  type: typeof JNBaseNode;
  property: Object;
  name: string;
  icon: String;
  color: String;
  borderColor: String;
  disabled: Boolean;
  acceptable: Boolean;
  directable: Boolean;

  constructor(selectedNodeType: typeof JNBaseNode, nodeType: typeof JNBaseNode, name: string, property?: Object) {
    this.type = nodeType;
    this.name = name;
    if (property) {
      this.property = property;
    } else {
      this.property = null;
    }
    this.icon = (<typeof JNBaseNode>nodeType.constructor).icon;
    this.color = (<typeof JNBaseNode>nodeType.constructor).color;
    this.borderColor = (<typeof JNBaseNode>nodeType.constructor).borderColor;
    if (selectedNodeType) {
      this.acceptable = selectedNodeType.connectable(nodeType, selectedNodeType);
      this.directable = selectedNodeType.connectable(selectedNodeType, nodeType);
      if (!this.acceptable && !this.directable) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    } else {
      this.acceptable = true;
      this.directable = true;
      this.disabled = false;
    }
  }
}