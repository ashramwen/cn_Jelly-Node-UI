import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { IJNNodeModel} from '../../../core/models/interfaces';
import { JNDeviceTypeNodeEditorModel } from './device-type-node-editor-model.type';
import { JNDeviceTypeInfoPanelModel } from './device-type-node-info-panel-model.type';
import { JNDeviceTypePaletteModel } from './device-type-node-palette-model.type';
import { JNDeviceTypeNodeModel } from './device-type-node-model.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [],
  editorModel: JNDeviceTypeNodeEditorModel.instance,
  infoPanelModel: JNDeviceTypeInfoPanelModel.instance,
  paletteModel: JNDeviceTypePaletteModel.instance
})
export class JNDeviceTypeNode extends JNBaseNode  {

  public get body (){
    return '';
  }

  public set body(value) {
    
  }

  protected model: JNDeviceTypeNodeModel;

  protected buildOutput(): Promise<Object> {
    return null;  
  }

  protected formatter(): Promise<Object> {
    return null;
  }

  protected parser(data: Object): Promise<JNDeviceTypeNodeModel> {
    return new Promise<JNDeviceTypeNodeModel>((resolve, reject) => {
      let result: JNDeviceTypeNodeModel =
        <JNDeviceTypeNodeModel>JNDeviceTypeNodeModel.deserialize(data);
      
      resolve(result);
    });
  }

  protected listener() {
    
  }
}
