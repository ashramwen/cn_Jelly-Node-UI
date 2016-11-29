import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNConditionNodeModel, ICondition } from './condition-node-model.type';
import { JNConditionNodeEditorModel } from './condition-node-editor-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNUtils } from '../../../share/util';
import { IDeviceProperty } from '../device-property-node/device-property-node-model.type';
import { IDeviceType } from '../device-type-node/device-type-node-model.type';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { JNCondtionPaletteMode } from './condition-node-palette-model.type';

@JNNode({
  icon: '',
  title: 'nodeset.JNConditionNode.nodename',
  color: '',
  borderColor: '',
  editorModel: JNConditionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: JNCondtionPaletteMode,
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
  }, {
      message: '至少选择包含一个条件',
      validator: (model: JNConditionNodeModel) => {
        return !!model.conditions && !!model.conditions.length;
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

  public readonly body: ICondition;

  protected model: JNConditionNodeModel = new JNConditionNodeModel;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener(payload: IJNNodePayload) {
    return new Promise((resolve) => {
      this.model.conditions = this.model.conditions || [];
      if (payload.type === JNDevicePropertyNode) {
        let propertyNodes: JNDevicePropertyNode[] = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
          .filter(pair => pair.value instanceof JNDevicePropertyNode)
          .map((pair) => <JNDevicePropertyNode>pair.value)
          .filter(n => !!n.body.typeName);

        if (!propertyNodes.length) {
          this.update({
            typeName: null,
            conditions: []
          })
          resolve(true);
          return;
        }

        let typeName = propertyNodes[0].body.typeName;   
        let conditions = [];
        let properties = propertyNodes.filter(n => n.body.typeName === typeName);

        let newPros = properties
          .filter((p) => {
            return !!p.body.property && !this.model.conditions.find(c => c.property === p.body.property);
          });

        newPros.forEach((p) => {
          this.model.conditions.push({
            aggregation: null,
            percentage: null,
            property: p.body.property,
            operator: null,
            value: null
          });
        });

        conditions = this.model.conditions.filter((c) => {
          return !!properties.find(p => p.body.property === c.property);
        });

        this.update({
          typeName: typeName,
          conditions: conditions
        });
      }
      resolve(true);
    });
  }
}
