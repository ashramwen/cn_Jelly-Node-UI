import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNodeModel } from './device-property-node-model.type';
import { JNUtils } from '../../../share/util';
import { JNDevicePropertyNodeEditorModel } from './device-property-node-editor-model.type';

@JNNode({
  title: 'JNDevicePropertyNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDeviceTypeNode],
  editorModel: JNDevicePropertyNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null
})
export class JNDevicePropertyNode extends JNBaseNode {

  protected model: JNDevicePropertyNodeModel = new JNDevicePropertyNodeModel;

  protected connectRules: IConnectRuleSetting = {
    global: [],
    nodes: [{
      nodeType: JNDeviceTypeNode,
      rules: [{
        message: `<${JNDevicePropertyNode.title}>节点只接受一个<${JNDeviceTypeNode.title}>节点作为输入。`,
        validator: (target) => {
          let deviceTypeNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
            .map(pair => pair.value)
            .filter(node => node instanceof JNDeviceTypeNode);
          if (deviceTypeNodes.length > 1) return false;
          if (deviceTypeNodes.length === 0) return true;
          if (this.hasAccepted(target)) return true;
          return false;
        }
      }]
    }]
  };

  protected whenReject() {
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

  protected parser(data: Object): Promise<JNDevicePropertyNodeModel> {
    return new Promise<JNDevicePropertyNodeModel>((resolve, reject) => {
      let result: JNDevicePropertyNodeModel = JNDevicePropertyNodeModel.deserialize(data);
      resolve(result);
    });
  }

  protected listener() {
  }
}
