import { JNBaseNode } from '../jn-base-node.type';
import { IJNInfoPanelModel } from '../../../views/info-panel/interfaces';
import { IJNPaletteModel } from '../../../views/palette/interfaces';
import { IJNEditorModel } from '../../../views/node-editor/interfaces/editor-model.interface';

export interface INodeOptions {
  icon: String;
  color: String;
  borderColor: String;
  accepts: Array<typeof JNBaseNode>;
  editorModel: IJNEditorModel;
  infoPanelModel: IJNInfoPanelModel;
  paletteModel: IJNPaletteModel;
}
