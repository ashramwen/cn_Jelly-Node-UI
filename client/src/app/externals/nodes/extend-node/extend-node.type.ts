import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { ExtendNodeEditorModel } from './extend-node-editor-model.type';
import { ExtendNodeInfoPanelModel } from './extend-node-info-panel-model.type';
import { ExtendNodePaletteModel } from './extend-node-palette-model.type';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { ExtendNodeModel } from './extend-node-model.type';

@JNNode({
  title: 'Extend',
  icon: '\ue905',
  color: '',
  borderColor: '',
  editorModel: ExtendNodeEditorModel,
  infoPanelModel: ExtendNodeInfoPanelModel,
  paletteModel: ExtendNodePaletteModel,
  accepts: ['LineChart', 'BarChart', 'PieChart', 'ScatterChart', 'BubbleChart'],
  modelRules: []
})
export class ExtendNode extends JNBaseNode {

  protected model: ExtendNodeModel = new ExtendNodeModel;

  public readonly body: INodeBody;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}