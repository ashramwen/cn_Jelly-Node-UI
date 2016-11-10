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

  constructor(selectedNode: JNBaseNode, node: JNBaseNode) {
    
    this.icon = (<typeof JNBaseNode>node.constructor).icon;
    this.color = (<typeof JNBaseNode>node.constructor).color;
    this.borderColor = (<typeof JNBaseNode>node.constructor).borderColor;
    // this.accepts = (<typeof JNBaseNode>node.constructor)['connectable'](node);
    // this.outputsTo = (<typeof JNBaseNode>node.constructor)['connectable'](selectedNode);
    if (!this.accepts && !this.outputsTo) {
        this.disabled = false;
    }
  }

  // createNode<T extends JNBaseNode>(nodeType: { new(): T }) {
  //   let node = new nodeType();
    
  //   this.icon = (<typeof JNBaseNode>node.constructor).icon;
  //   this.color = (<typeof JNBaseNode>node.constructor).color;
  //   this.borderColor = (<typeof JNBaseNode>node.constructor).borderColor;
  //   return node;
  // }
}