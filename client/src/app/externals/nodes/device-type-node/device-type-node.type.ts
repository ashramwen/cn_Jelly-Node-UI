import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDeviceTypeNodeEditorModel } from './device-type-node-editor-model.type';
import { JNDeviceTypeInfoPanelModel } from './device-type-node-info-panel-model.type';
import { JNDeviceTypePaletteModel } from './device-type-node-palette-model.type';
import { JNDeviceTypeNodeModel } from './device-type-node-model.type';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNUtils } from '../../../share/util';

@JNNode({
  title: 'nodeset.JNDeviceTypeNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNDeviceTypeNodeEditorModel,
  infoPanelModel: JNDeviceTypeInfoPanelModel.instance,
  paletteModel: JNDeviceTypePaletteModel.instance,
  accepts: ['Location']
})
export class JNDeviceTypeNode extends JNBaseNode {

  protected connectRules: IConnectRuleSetting = {
    global: [],
    nodes: [{
      nodeType: JNLocationNode,
      rules: [{
        message: `<${JNDeviceTypeNode.title}>节点只接受一个<${JNLocationNode.title}>节点作为输入。`,
        validator: (target) => {
          let acceptedNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted);
          if (acceptedNodes.filter(node => node.value instanceof JNLocationNode).length > 1) {
            return false;
          }
          if (!this.hasAccepted(target)) {
            return !acceptedNodes.find(node => node.value instanceof JNLocationNode);
          }
        }
      }]
    }]
  };

  protected model: JNDeviceTypeNodeModel = new JNDeviceTypeNodeModel;

  protected whenReject(node: JNBaseNode) {
    if (node instanceof JNLocationNode) {
      let locationID = node.body.locationID;
      if (!locationID) return;
      JNUtils.removeItem(this.model.locations, locationID);
    }
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(this.model.serialize());
    });
  }

  protected formatter() {
    return this.model.serialize();
  }

  protected listener() {

  }
}
