import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNodeModel } from './device-property-node-model.type';
import { JNUtils } from '../../../share/util';

@JNNode({
  title: 'JNDevicePropertyNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDeviceTypeNode],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
export class JNDevicePropertyNode extends JNBaseNode {

  protected model: JNDevicePropertyNodeModel = new JNDevicePropertyNodeModel;

  protected connectRules: IConnectRuleSetting = {
    global: [{
      message: `<${JNDevicePropertyNode.title}>节点只接受一个<${JNDeviceTypeNode.title}>节点作为输入。`,
      validator: () => {
        let acceptedNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted);
        return !acceptedNodes.find(node => node.value.constructor === JNDeviceTypeNode);
      }
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
      let result: JNDevicePropertyNodeModel =
        <JNDevicePropertyNodeModel>JNDevicePropertyNodeModel.deserialize(data);
      resolve(result);
    });
  }

  protected listener() {
  }
}
