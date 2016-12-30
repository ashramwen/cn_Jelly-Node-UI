import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { JNApplication } from '../../../share/services/application-core.service';

export class JNPaletteNode {
  type: typeof JNBaseNode;
  typeName: string;
  property: Object;
  name: string;
  icon: String;
  color: String;
  borderColor: String;
  disabled: boolean;
  acceptable: boolean;
  directable: boolean;
  hasInput: boolean;
  hasOutput: boolean;
  isConnection: boolean;

  constructor(selectedNodeType: typeof JNBaseNode, nodeType: typeof JNBaseNode, name: string, property?: Object) {
    this.type = nodeType;
    this.typeName = JNUtils.toArray<typeof JNBaseNode>(JNApplication.instance.nodeTypeMapper)
      .find(p => p.value === this.type).key;
    this.name = name;
    if (property) {
      this.property = property;
    } else {
      this.property = null;
    }
    this.icon = nodeType.icon;
    this.color = nodeType.color;
    this.borderColor = nodeType.borderColor;
    if (selectedNodeType) {
      this.acceptable = selectedNodeType.connectable(selectedNodeType, nodeType);
      this.directable = selectedNodeType.connectable(nodeType, selectedNodeType);
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
    this.hasInput = nodeType.hasInput();
    this.hasOutput = nodeType.hasOutput();
  }
}