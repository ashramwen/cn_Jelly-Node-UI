import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNConditionNodeModel } from './condition-node-model.type';
import { JNConditionNodeEditorModel } from './condition-node-editor-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNUtils } from '../../../share/util';
import { IDeviceProperty } from '../device-property-node/device-property-node-model.type';
import { IDeviceType } from '../device-type-node/device-type-node-model.type';

@JNNode({
  icon: '',
  title: 'JNCondtionNode',
  color: '',
  borderColor: '',
  accepts: [JNDevicePropertyNode],
  editorModel: JNConditionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null
})
export class JNConditionNode extends JNBaseNode  {

  protected connectRules: IConnectRuleSetting = {
    global: [],
    nodes: [{
      nodeType: JNDevicePropertyNode,
      rules: [
        {
          message: `<${JNConditionNode.title}>节点只接受来自同一<${JNDeviceTypeNode.title}>节点的<${JNDevicePropertyNode.title}>节点。`,
          validator: (target: JNDevicePropertyNode) => {
            let inputPropertyNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
              .map(r => r.value)
              .filter(r => r instanceof JNDevicePropertyNode);

            if (inputPropertyNodes.length === 0) return true;

            let typeName = (<IDeviceProperty>target.body).typeName;

            return !!inputPropertyNodes.find((node) => {
              let inputs = JNUtils.toArray<JNBaseNode>(node.nodeMap.accepted)
                .map(r => r.value)
                .filter(r => r instanceof JNDeviceTypeNode);
              if (inputs.length > 1) return true;
              if (!inputs.length || (<IDeviceType>inputs[0].body).typeName === typeName) return false;
              return true;
            });
          }
        }
      ]
    }]
  };

  public get body (){
    return this.model.serialize();
  }

  protected model: JNConditionNodeModel;

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  protected whenReject() {
    return null;
  }

  protected formatter(): any {
    return null;
  }

  protected parser(data: Object): Promise<JNConditionNodeModel> {
    return new Promise((resolve) => {
      resolve(JNConditionNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
