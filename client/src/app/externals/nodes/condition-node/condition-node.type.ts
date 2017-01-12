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
import { JNCondtionNodePaletteMode } from './condition-node-palette-model.type';
import { JNConditionNodeInfoPanelModel } from './condition-node-info-panel-model.type';

@JNNode({
  icon: '\ue902',
  title: 'nodeset.JNConditionNode.nodename',
  color: '',
  borderColor: '',
  editorModel: JNConditionNodeEditorModel,
  infoPanelModel: JNConditionNodeInfoPanelModel,
  paletteModel: JNCondtionNodePaletteMode,
  accepts: ['DeviceProperty'],
  modelRules: [{
    message: 'nodeset.JNConditionNode.errors.conditionPropertyRequired',
    validator: (model: JNConditionNodeModel) => {
      if (!model.conditions) return true;
      for (let condition of model.conditions) {
        if (JNUtils.isBlank(condition.value)) {
          return false;
        }
      }
      return true;
    }
  }, {
      message: 'nodeset.JNConditionNode.errors.conditionRequired',
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
          message: `nodeset.JNConditionNode.errors.deviceTypeConflict`,
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
        },
        {
          message: `nodeset.JNConditionNode.errors.devicePropertyConflict`,
          validator: (node: JNConditionNode, target: JNDevicePropertyNode) => {
            let nodes = JNUtils.toArray<JNBaseNode>(node.nodeMap.accepted)
              .filter(p => p.value instanceof JNDevicePropertyNode)
              .map(p => <JNDevicePropertyNode>p.value);
            
            let properties = nodes
              .map(n => n.body.property)
              .filter(p => !!p)
              .sort();
            
            for (let i = 0; i < properties.length - 1; i++){
              if (properties[i] === properties[i + 1]) return false;
            }
            
            return true;
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
