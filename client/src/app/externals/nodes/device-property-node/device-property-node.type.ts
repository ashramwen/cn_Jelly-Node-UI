import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNodeModel } from './device-property-node-model.type';
import { JNUtils } from '../../../share/util';
import { JNDevicePropertyNodeEditorModel } from './device-property-node-editor-model.type';
import { RuleApplication } from '../../rule-application-core';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { JNActionNode } from '../action-node/action-node.type';

@JNNode({
  title: 'nodeset.JNDevicePropertyNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNDevicePropertyNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null,
  accepts: ['DeviceType'],
  modelRules: [{
    message: '必须选择一个属性',
    validator: (model: JNDevicePropertyNodeModel) => {
      return !!model.property;
    }
  }, {
    message: '属性值与所属设备类型不符',
    validator: (model: JNDevicePropertyNodeModel) => {
      if (!model.typeName) return true;

      let schema = RuleApplication.instance.resources.$schema
        .schemas[model.typeName];

      if (!schema) return false;
      if (!schema.content.statesSchema.properties[model.property]) {
        return false;
      }
      return true;
    }
  }],
  connectRules: {
    global: [],
    nodes: [{
      nodeType: 'DeviceType',
      rules: [{
        message: `<DeviceProperty>节点只接受一个<DeviceType>节点作为输入。`,
        validator: (node, target) => {
          let deviceTypeNodes = JNUtils.toArray<JNBaseNode>(node.nodeMap.accepted)
            .map(pair => pair.value)
            .filter(n => n instanceof JNDeviceTypeNode);
          if (deviceTypeNodes.length > 1) return false;
          if (deviceTypeNodes.length === 0) return true;
          if (node.hasAccepted(target)) return true;
          return false;
        }
      }, {
          message: `当<DeviceType>节点不能同时与<Action>节点与<DeviceProperty>相连。`,
          validator: (node: JNDevicePropertyNode, target: JNDeviceTypeNode) => {
            let nodes = JNUtils.toArray(target.nodeMap.outputTo)
              .filter(pair => pair.value instanceof JNActionNode);
            return !nodes.length;
          }
      }]
    }]
  }
})
export class JNDevicePropertyNode extends JNBaseNode {

  get name(): string{
    if (!this.model.typeName || !this.model.property) return this.getTitle();
    let schema = RuleApplication.instance
      .resources.$schema
      .schemas[this.model.typeName];
    let property = schema.content.statesSchema.properties[this.model.property];
    return property.displayNameCN;
  }

  get body() {
    return this.model.serialize();
  }

  protected model: JNDevicePropertyNodeModel = new JNDevicePropertyNodeModel;

  protected whenReject(node: JNBaseNode) {
    let accepted = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .map(pair => pair.value);
    let connectableFlag = true;

    for (let n of accepted) {
      connectableFlag = !this.connectable(n) && connectableFlag;
      if (n) {
      }
    }
    return Promise.resolve(true);
  }

  protected formatter() {
    return this.model.serialize();
  }

  protected listener(payload: IJNNodePayload) {
    if (payload.type === JNDeviceTypeNode) {
      let deviceTypeNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
        .filter(pair => pair.value instanceof JNDeviceTypeNode)
        .map(pair => <JNDeviceTypeNode>pair.value);
      if (deviceTypeNodes.length > 0) {
        if (this.model.typeName !== deviceTypeNodes[0].body['typeName']) {
          this.model.typeName = deviceTypeNodes[0].body['typeName'];
          this.model.property = null;
        }
      } else {
        this.model.typeName = null;
        this.model.property = null;
      }
    }
    return Promise.resolve(true);
  }
}
