import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNodeModel, IDeviceProperty } from './device-property-node-model.type';
import { JNUtils } from '../../../share/util';
import { JNDevicePropertyNodeEditorModel } from './device-property-node-editor-model.type';
import { RuleApplication } from '../../rule-application-core';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { JNActionNode } from '../action-node/action-node.type';
import { JNDevicePropertyNodePaletteModel } from './device-property-node-palette-model.type';
import { JNDevicePropertyNodeInfoPanelModel } from './device-property-node-info-panel.type';

@JNNode({
  title: 'nodeset.JNDevicePropertyNode.nodename',
  icon: '\ue901',
  color: '',
  borderColor: '',
  editorModel: JNDevicePropertyNodeEditorModel,
  infoPanelModel: JNDevicePropertyNodeInfoPanelModel,
  paletteModel: JNDevicePropertyNodePaletteModel,
  accepts: ['DeviceType'],
  modelRules: [{
    message: 'nodeset.JNDevicePropertyNode.errors.propertyRequired',
    validator: (model: JNDevicePropertyNodeModel) => {
      return !!model.property;
    }
  }, {
    message: 'nodeset.JNDevicePropertyNode.errors.propertyDeviceConflict',
    validator: (model: JNDevicePropertyNodeModel) => {
      if (!model.typeName) return true;
      if (!model.property) return true;

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
        message: `nodeset.JNDevicePropertyNode.errors.multiDeviceType`,
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
          message: `nodeset.JNDevicePropertyNode.errors.propertyActionConflict`,
          validator: (node: JNDevicePropertyNode, target: JNDeviceTypeNode) => {
            let nodes = target.outputTo.filter(n => n instanceof JNActionNode);
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

  public readonly body: IDeviceProperty;

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

  protected listener(payload: IJNNodePayload) {
    if (payload.type === JNDeviceTypeNode) {
      let deviceTypeNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
        .filter(pair => pair.value instanceof JNDeviceTypeNode)
        .map(pair => <JNDeviceTypeNode>pair.value);
      if (deviceTypeNodes.length > 0) {
        if (this.model.typeName !== deviceTypeNodes[0].body['typeName']) {
          this.update({
            typeName: deviceTypeNodes[0].body['typeName'],
            property: null
          }, payload.influenceMap);
        }
      } else {
        this.update({
          typeName: null,
          property: null
        }, payload.influenceMap);
      }
    }
    return Promise.resolve(true);
  }
}
