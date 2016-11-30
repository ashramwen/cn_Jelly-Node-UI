import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNLocationNodeEditorModel } from './location-node-editor-model.type';
import { JNLocationNodeInfoPanelModel } from './location-node-info-panel-model.type';
import { JNLocationNodePaletteModel } from './location-node-palette-model.type';
import { JNLocationNodeModel, ILocationNodeModel } from './location-node-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';

@JNNode({
  title: 'nodeset.JNLocationNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNLocationNodeEditorModel,
  infoPanelModel: JNLocationNodeInfoPanelModel,
  paletteModel: JNLocationNodePaletteModel,
  accepts: [],
  modelRules: [{
    message: '必须选择一个地址',
    validator: (model: JNLocationNodeModel) => {
      return !!model.locationID;
    }
  }]
})
export class JNLocationNode extends JNBaseNode {

  get name() {
    if (!this.model.locationID) return this.getTitle();
    return this.model.locationID;
  }

  public readonly body: ILocationNodeModel;

  protected model: JNLocationNodeModel = new JNLocationNodeModel;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return null;
  }
}
