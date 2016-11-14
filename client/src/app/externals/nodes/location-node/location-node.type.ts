import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNLocationNodeEditorModel } from './location-node-editor-model.type';
import { JNLocationInfoPanelModel } from './location-node-info-panel-model.type';
import { JNLocationPaletteModel } from './location-node-palette-model.type';
import { JNLocationNodeModel } from './location-node-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';

@JNNode({
  title: 'JNLocationNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDeviceTypeNode],
  editorModel: JNLocationNodeEditorModel,
  infoPanelModel: JNLocationInfoPanelModel.instance,
  paletteModel: JNLocationPaletteModel.instance
})
export class JNLocationNode extends JNBaseNode {

  public get body() {
    return this.model.serialize();
  }

  protected model: JNLocationNodeModel = new JNLocationNodeModel;

  protected whenReject() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected formatter() {
    return this.model.serialize();
  }

  protected parser(data: Object): Promise<JNLocationNodeModel> {
    return super.parser(data);
  }

  protected listener() {

  }
}
