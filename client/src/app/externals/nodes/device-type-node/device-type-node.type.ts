import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDeviceTypeNodeEditorModel } from './device-type-node-editor-model.type';
import { JNDeviceTypeInfoPanelModel } from './device-type-node-info-panel-model.type';
import { JNDeviceTypePaletteModel } from './device-type-node-palette-model.type';
import { JNDeviceTypeNodeModel } from './device-type-node-model.type';
import { JNLocationNode } from '../location-node/location-node.type';

@JNNode({
  title: 'JNDeviceTypeNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNLocationNode],
  editorModel: JNDeviceTypeNodeEditorModel,
  infoPanelModel: JNDeviceTypeInfoPanelModel.instance,
  paletteModel: JNDeviceTypePaletteModel.instance
})
export class JNDeviceTypeNode extends JNBaseNode {

  protected model: JNDeviceTypeNodeModel = new JNDeviceTypeNodeModel;

  protected whenRejected() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(this.model.serialize());
    });
  }

  protected formatter(): Object {
    return this.model.serialize();
  }

  protected parser(data: Object): Promise<JNDeviceTypeNodeModel> {
    return new Promise<JNDeviceTypeNodeModel>((resolve, reject) => {
      let result: JNDeviceTypeNodeModel =
        <JNDeviceTypeNodeModel>JNDeviceTypeNodeModel.deserialize(data);
      resolve(result);
    });
  }

  protected shouldReject(node: JNBaseNode) {
    return false;
  }

  protected listener() {

  }
}
