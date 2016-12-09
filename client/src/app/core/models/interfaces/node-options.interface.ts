import { JNBaseNode, IConnectRuleSetting } from '../jn-base-node.type';
import { JNInfoPanelModel } from '../../../views/info-panel/interfaces';
import { JNEditorModel } from '../../../views/node-editor/interfaces/editor-model.type';
import { JNNodeModel } from '../jn-node-model.type';
import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';

export interface INodeOptions {
  icon: string;
  color: string;
  borderColor: string;
  title: string;
  editorModel: typeof JNEditorModel;
  infoPanelModel: typeof JNInfoPanelModel;
  paletteModel: typeof JNPaletteModel;
  accepts: string[];
  modelRules?: { message: string, validator: (model: JNNodeModel<any>) => boolean }[];
  connectRules?: IConnectRuleSetting;
}
