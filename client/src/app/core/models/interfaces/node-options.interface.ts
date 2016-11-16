import { JNBaseNode } from '../jn-base-node.type';
import { IJNInfoPanelModel } from '../../../views/info-panel/interfaces';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';

export interface INodeOptions {
  icon: String;
  color: String;
  borderColor: String;
  title: string;
  editorModel: typeof JNEditorModel;
  infoPanelModel: IJNInfoPanelModel;
  paletteModel: JNPaletteModel;
  accepts: string[];
}
