import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { IJNNodeModel} from '../../../core/models/interfaces';
import { JNDeviceNodeEditorModel } from './device-node-editor-model.type';
import { JNDeviceInfoPanelModel } from './device-node-info-panel-model.type';
import { JNDevicePaletteModel } from './device-node-palette-model.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [],
  editorModel: JNDeviceNodeEditorModel.instance,
  infoPanelModel: JNDeviceInfoPanelModel.instance,
  paletteModel: JNDevicePaletteModel.instance
})
export class JNDeviceNode extends JNBaseNode  {
  public get body (){
    return '';
  }

  public set body(value) {
    
  }

  protected buildOutput(): Promise<Object> {
    return null;  
  }

  protected formatter(): Promise<Object> {
    return null;
  }

  protected parser(data: Object): Promise<IJNNodeModel> {
    return null;
  }

  protected listener() {
    
  }
}
