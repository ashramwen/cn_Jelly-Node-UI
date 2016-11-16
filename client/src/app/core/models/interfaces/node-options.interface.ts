import { JNBaseNode, IConnectRuleSetting } from '../jn-base-node.type';
import { IJNInfoPanelModel } from '../../../views/info-panel/interfaces';
import { IJNPaletteModel } from '../../../views/palette/interfaces';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNNodeModel } from '../jn-node-model.type';

export interface INodeOptions {
  icon: String;
  color: String;
  borderColor: String;
  title: string;
  editorModel: typeof JNEditorModel;
  infoPanelModel: IJNInfoPanelModel;
  paletteModel: IJNPaletteModel;
  accepts: string[];
  modelRules?: { message: string, validator: (model: JNNodeModel<any>) => boolean }[];
  connectRules?: IConnectRuleSetting;
}
