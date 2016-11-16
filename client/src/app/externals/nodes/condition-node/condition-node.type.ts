import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNConditionNodeModel } from './condition-node-model.type';
import { JNConditionNodeEditorModel } from './condition-node-editor-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNUtils } from '../../../share/util';
import { IDeviceProperty } from '../device-property-node/device-property-node-model.type';
import { IDeviceType } from '../device-type-node/device-type-node-model.type';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';

@JNNode({
  icon: '',
  title: 'nodeset.JNConditionNode.nodename',
  color: '',
  borderColor: '',
  editorModel: JNConditionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null,
  accepts: ['DeviceProperty'],
  modelRules: [{
    message: '属性条件值不能为空',
    validator: (model: JNConditionNodeModel) => {
      for (let condition of model.conditions) {
        if (JNUtils.isBlank(condition.value)) {
          return false;
        }
      }
      return true;
    }
  }],
  connectRules: {
    global: [],
    nodes: [{
      nodeType: 'DeviceProperty',
      rules: [
        {
          message: `<Condition>节点只接受来自同一<DeviceType>节点的<DeviceProperty>节点。`,
          validator: (node: JNConditionNode, target: JNDevicePropertyNode) => {
            let inputPropertyNodes = JNUtils.toArray<JNBaseNode>(node.nodeMap.accepted)
              .map(r => r.value)
              .filter(r => r instanceof JNDevicePropertyNode);

            if (inputPropertyNodes.length === 0) return true;

            let typeName = (<IDeviceProperty>target.body).typeName;

            return !inputPropertyNodes.find((n) => {
              let inputs = JNUtils.toArray<JNBaseNode>(n.nodeMap.accepted)
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
  }
})
export class JNConditionNode extends JNBaseNode  {

  public get body (){
    return this.model.serialize();
  }

  protected model: JNConditionNodeModel = new JNConditionNodeModel;

  protected whenReject() {
    return null;
  }

  protected formatter(): any {
    return null;
  }

  protected listener(payload: IJNNodePayload) {
    return new Promise((resolve) => {
      this.model.conditions = this.model.conditions || [];
      if (payload.type === JNDevicePropertyNode) {
        if (payload.data['typeName'] !== this.model.typeName) {
          let propertyNodes: JNDevicePropertyNode[] = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
            .filter(pair => pair.value instanceof JNDevicePropertyNode)
            .map((pair) => <JNDevicePropertyNode>pair.value);

          let flag = false;
          propertyNodes.forEach((propertyNode) => {
            flag = payload.data['typeName'] !== propertyNode.body.typeName;
          });

          if (flag) {
            this.model.typeName = null;
            this.model.conditions = [];
            resolve(true);
            return;
          }
          this.model.typeName = payload.data['typeName'];

          let hasProperty = !!this.model.conditions
            .find((condition) => condition.property === payload.data['property']);
          if (!hasProperty) {
            this.model.conditions.push({
              aggregation: null,
              operator: null,
              property: payload.data['proprerty'],
              value: null
            });
          }

          this.model.conditions = this.model.conditions.filter((condition) => {
            return propertyNodes.find((propertyNode) => {
              return propertyNode.body.property === condition.property;
            });
          });

        }
      }
      resolve(true);
    });
  }
}
