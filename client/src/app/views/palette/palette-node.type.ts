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
    this.type = selectedNodeType;
    if(property){
      this.property = property;
    }else {
      this.property = null;
    }
    this.icon = (<typeof JNBaseNode>nodeType.constructor).icon;
    this.color = (<typeof JNBaseNode>nodeType.constructor).color;
    this.borderColor = (<typeof JNBaseNode>nodeType.constructor).borderColor;
    // this.accepts = (<typeof JNBaseNode>node.constructor)['connectable'](node);
    // this.outputsTo = (<typeof JNBaseNode>node.constructor)['connectable'](selectedNode);
    if (!this.acceptable && !this.directable) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }
}