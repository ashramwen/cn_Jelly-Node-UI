import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNActionNodeModel } from './action-node-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNActionNodeEditorModel } from './action-node-editor-model.type';
import { JNUtils } from '../../../share/util';

@JNNode({
  title: 'JNActionNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDevicePropertyNode, JNDeviceTypeNode],
  editorModel: JNActionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null
})
export class JNActionNode extends JNBaseNode  {


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

  public get body (){
    return this.model.serialize();
  }

  protected model: JNActionNodeModel;

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  protected whenReject() {
    return null;
  }

  protected formatter() {
    return null;
  }

  protected parser(data: Object): Promise<JNActionNodeModel> {
    return new Promise((resolve) => {
      resolve(JNActionNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
