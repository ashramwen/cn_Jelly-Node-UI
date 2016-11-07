import { JNBaseNode } from '../jn-base-node.type';
import { IJNInfoPanelModel } from '../../../views/info-panel/interfaces';
import { IJNPaletteModel } from '../../../views/palette/interfaces';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';

export interface INodeOptions {
  icon: String;
  color: String;
  borderColor: String;
  accepts: Array<typeof JNBaseNode>;
  editorModel: typeof JNEditorModel;
  infoPanelModel: IJNInfoPanelModel;
  paletteModel: IJNPaletteModel;
}
