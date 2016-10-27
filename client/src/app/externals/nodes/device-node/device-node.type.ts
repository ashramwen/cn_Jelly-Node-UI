import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDeviceNodeEditorModel } from './device-node-editor-model.type';
import { JNDeviceInfoPanelModel } from './device-node-info-panel-model.type';
import { JNDevicePaletteModel } from './device-node-palette-model.type';
import { JNDeviceNodeModel } from './device-node-model.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDeviceTypeNode],
  editorModel: JNDeviceNodeEditorModel.instance,
  infoPanelModel: JNDeviceInfoPanelModel.instance,
  paletteModel: JNDevicePaletteModel.instance
})
export class JNDeviceNode extends JNBaseNode  {
  public get body (){
    return '';
  }

  protected model: JNDeviceNodeModel;

  protected whenRejected() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve({ thingIDs: this.model.thingIDs });
    });
  }

  protected formatter(): Promise<Object> {
    return null;
  }

  protected parser(data: Object): Promise<JNDeviceNodeModel> {
    return new Promise((resolve) => {
      resolve(JNDeviceNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
