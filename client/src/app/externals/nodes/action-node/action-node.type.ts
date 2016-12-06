import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNActionNodeModel } from './action-node-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNActionNodeEditorModel } from './action-node-editor-model.type';
import { JNUtils } from '../../../share/util';
import { RuleApplication } from '../../rule-application-core';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { JNActionPaletteNodeModel } from './action-node-palette-model.type';
import { JNActionNodeInfoPanelModel } from './action-node-info-panel-model.type';

@JNNode({
  title: 'nodeset.JNActionNode.nodename',
  icon: '\ue908',
  color: '',
  borderColor: '',
  editorModel: JNActionNodeEditorModel,
  infoPanelModel: JNActionNodeInfoPanelModel,
  paletteModel: JNActionPaletteNodeModel,
  accepts: ['DeviceType'],
  modelRules: [{
    message: '必须选择一个行为',
    validator: (model: JNActionNodeModel) => {
      return !!model.actionName;
    }
  }, {
    message: '所选行为与设备类型不符',
    validator: (model: JNActionNodeModel) => {
      if (!model.actionName) return true;
      let schema = RuleApplication.instance.resources.$schema.schemas[model.typeName];
      if (!schema) return false;
      if (!schema.content.actions[model.actionName]) return false;
      return true;
    }
  }, {
    message: '某些属性值为空',
    validator: (model: JNActionNodeModel) => {
      if (!model.properties) return true;
      for (let property of model.properties) {
        if (JNUtils.isBlank(property.propertyValue)) {
          return false;
        }
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
        validator: (node: JNActionNode, target: JNDeviceTypeNode) => {
          let deviceTypeNodes = JNUtils.toArray<JNBaseNode>(node.nodeMap.accepted)
            .map(pair => pair.value)
            .filter(n => n instanceof JNDeviceTypeNode);
          if (deviceTypeNodes.length > 1) return false;
          if (deviceTypeNodes.length === 0) return true;
          if (node.hasAccepted(target)) return true;
          return false;
        }
      }, {
        message: `<DeviceType>节点不能同时与<Action>节点与<DeviceProperty>相连。`,
        validator: (node: JNActionNode, target: JNDeviceTypeNode) => {
          let nodes = target.outputTo
            .filter(n => n instanceof JNDevicePropertyNode);
          return !nodes.length;
        }
      }]
    }]
  }
})
export class JNActionNode extends JNBaseNode  {

  get name(): string{
    if (!this.body.typeName || !this.body.actionName) return this.getTitle();
    let schema = RuleApplication.instance
      .resources.$schema
      .schemas[this.body.typeName];
    let action = schema.content.actions[this.body.actionName];
    return action.displayNameCN;
  }

  public get body (){
    return this.model.serialize();
  }

  protected model: JNActionNodeModel = new JNActionNodeModel;

  protected whenReject(node: JNBaseNode) {
    let typeName = this.model.typeName;
    let actionName = this.model.actionName;
    let properties = this.model.properties;

    let deviceTypeNodes = <JNDeviceTypeNode[]> this.accepted.filter(n => n instanceof JNDeviceTypeNode);
    if (!!deviceTypeNodes.find(n => n.body.typeName === this.model.typeName)) {
      this.update({
        typeName: null,
        actionName: null,
        properties: []
      });
    }
    return Promise.resolve(true);
  }

  protected listener(payload: IJNNodePayload) {
    return new Promise((resolve) => {
      if (payload.type === JNDeviceTypeNode) {
        if (payload.data['typeName'] !== this.model.typeName) {
          this.update({
            actionName: null,
            properties: [],
            typeName: payload.data['typeName']
          });
        }
      }
      resolve(true);
    });
  }
}
