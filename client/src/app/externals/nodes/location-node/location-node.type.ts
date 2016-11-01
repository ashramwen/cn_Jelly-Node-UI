import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { IJNNodeModel } from '../../../core/models/interfaces';
import { JNLocationNodeEditorModel } from './location-node-editor-model.type';
import { JNLocationInfoPanelModel } from './location-node-info-panel-model.type';
import { JNLocationPaletteModel } from './location-node-palette-model.type';
import { JNLocationNodeModel } from './location-node-model.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [],
  editorModel: JNLocationNodeEditorModel.instance,
  infoPanelModel: JNLocationInfoPanelModel.instance,
  paletteModel: JNLocationPaletteModel.instance
})
export class JNLocationNode extends JNBaseNode {

  public get body() {
    return '';
  }

  public set body(value) {

  }

  protected model: JNLocationNodeModel;

  protected whenRejected() {
    return null;
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
