import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { JNLocationNode } from '../../externals/nodes/location-node/location-node.type';

export class IJNPaletteNode {
  type: typeof JNBaseNode;
  property: Object;
  icon: String;
  color: String;
  borderColor: String;
  disabled: Boolean;
  acceptable: Boolean;
  directable: Boolean;

  constructor(selectedNodeType: typeof JNBaseNode, nodeType: typeof JNBaseNode, property?) {
    this.type = nodeType;
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
    }else{
      this.acceptable = false;
      this.directable = false;
      this.disabled = false;
    }
  }
}