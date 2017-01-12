import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDeviceTypeNodeEditorModel } from './device-type-node-editor-model.type';
import { JNDeviceTypeNodePaletteModel } from './device-type-node-palette-model.type';
import { JNDeviceTypeNodeModel, IDeviceType } from './device-type-node-model.type';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNUtils } from '../../../share/util';
import { RuleApplication } from '../../rule-application-core';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { DeviceTypeNodeService } from './device-type-node.service';
import { JNDeviceTypeNodeInfoPanelModel } from './device-type-node-info-panel-model.type';

@JNNode({
  title: 'nodeset.JNDeviceTypeNode.nodename',
  icon: '\ue904',
  color: '',
  borderColor: '',
  editorModel: JNDeviceTypeNodeEditorModel,
  infoPanelModel: JNDeviceTypeNodeInfoPanelModel,
  paletteModel: JNDeviceTypeNodePaletteModel,
  accepts: ['Location', 'Rule'],
  modelRules: [{
    message: 'nodeset.JNDeviceTypeNode.errors.typeRequired',
    validator: (model: JNDeviceTypeNodeModel) => {
      return !!model.typeName;
    }
  }, {
    message: 'nodeset.JNDeviceTypeNode.errors.deviceRequired',
    validator: (model: JNDeviceTypeNodeModel) => {
      return !!model.things && !!model.things.length;
    }
  }],
  connectRules: {
    global: [],
    nodes: [{
      nodeType: 'Location',
      rules: []
    }]
  }
})
export class JNDeviceTypeNode extends JNBaseNode {

  public readonly body: IDeviceType;

  get name(): string {
    if (!this.model.typeName) return this.getTitle();
    let schema = RuleApplication.instance
      .resources.$schema
      .schemas[this.model.typeName];
    return schema.content.statesSchema.title;
  }

  protected model: JNDeviceTypeNodeModel = new JNDeviceTypeNodeModel;

  protected whenReject(target: JNBaseNode) {
    let locationNodes = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
      .map(pair => pair.value)
      .filter(n => n instanceof JNLocationNode)
      .filter(n => n !== target)
      .map(n => <JNLocationNode>n);

    this.model.locations = locationNodes.map((n) => {
      return n.body.locationID;
    });

    return Promise.resolve(true);
  }

  protected listener(event: IJNNodePayload) {
    return new Promise((resolve) => {
      if (event.type === JNLocationNode) {
        let locations = JNUtils.toArray<JNLocationNode>(this.nodeMap.accepted)
          .map(pair => pair.value)
          .filter(n => !!n.body.locationID)
          .map(n => n.body.locationID);

        if (!this.model.typeName) {
          this.update({
            locations: locations
          });
          resolve();
          return;
        }

        DeviceTypeNodeService.instance.getThings(locations, this.model.typeName).then((things) => {
          let thingIDs = this.model.things.filter((thingID) => {
            return things.find(thing => thing.thingID === thingID);
          });
          this.update({
            locations: locations,
            things: thingIDs
          });
          resolve();
        });
      }
    });
  }
}
