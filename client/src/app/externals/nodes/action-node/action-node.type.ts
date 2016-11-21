import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNActionNodeModel } from './action-node-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNActionNodeEditorModel } from './action-node-editor-model.type';
import { JNUtils } from '../../../share/util';
import { JNApplication } from '../../../core/services/application-core.service';
import { RuleApplication } from '../../rule-application-core';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { INodeError } from '../../../core/models/interfaces/node-error.interface';

@JNNode({
  title: 'nodeset.JNActionNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNActionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null,
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
        message: `当<DeviceType>节点不能同时与<Action>节点与<DeviceProperty>相连。`,
        validator: (node: JNActionNode, target: JNDeviceTypeNode) => {
          let nodes = JNUtils.toArray(target.nodeMap.outputTo)
            .filter(pair => pair.value instanceof JNDeviceTypeNode);
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

  protected whenReject() {
    return null;
  }

  protected formatter() {
    return this.model.serialize();
  }

  protected listener(payload: IJNNodePayload) {
    return new Promise((resolve) => {
      if (payload.type === JNDeviceTypeNode) {
        if (payload.data['typeName'] !== this.model.typeName) {
          this.model.actionName = null;
          this.model.properties = [];
          this.model.typeName = payload.data['typeName'];
        }
      }
      resolve(true);
    });
  }
}
