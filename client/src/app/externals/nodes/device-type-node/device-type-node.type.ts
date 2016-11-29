import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDeviceTypeNodeEditorModel } from './device-type-node-editor-model.type';
import { JNDeviceTypePaletteModel } from './device-type-node-palette-model.type';
import { JNDeviceTypeNodeModel, IDeviceType } from './device-type-node-model.type';
import { JNLocationNode } from '../location-node/location-node.type';
import { JNUtils } from '../../../share/util';
import { RuleApplication } from '../../rule-application-core';
import { IJNNodePayload } from '../../../core/models/interfaces/node-payload.interface';
import { DeviceTypeNodeService } from './device-type-node.service';
import { JNDeviceTypeInfoPanelModel } from './device-type-node-info-panel-model.type';

@JNNode({
  title: 'nodeset.JNDeviceTypeNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNDeviceTypeNodeEditorModel,
  infoPanelModel: JNDeviceTypeInfoPanelModel,
  paletteModel: JNDeviceTypePaletteModel,
  accepts: ['Location', 'Rule'],
  modelRules: [{
    message: '必须选择一个设备类型',
    validator: (model: JNDeviceTypeNodeModel) => {
      return !!model.typeName;
    }
  }, {
    message: '必须包含至少一个设备',
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

        this.model.locations = locations;

        if (!this.model.typeName) {
          resolve();
          return;
        }

        DeviceTypeNodeService.instance.getThings(locations, this.model.typeName).then((things) => {
          let thingIDs = this.model.things.filter((thingID) => {
            return things.find(thing => thing.thingID === thingID);
          });
          this.model.things = thingIDs;
          resolve();
        });
      }
    });
  }
}
