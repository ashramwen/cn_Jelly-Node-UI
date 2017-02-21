import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';
import { XAxisNodeModel, IXAxis } from './x-axis-node-model.type';
import { XAxisNodeEditorModel } from './x-axis-node-editor-model.type';
import { XAxisNodeInfoPanelModel } from './x-axis-node-info-panel-model.type';
import { XAxisNodePaletteModel } from './x-axis-node-palette-model.type';

@JNNode({
  title: 'X Axis',
  icon: '\uf178',
  color: '',
  borderColor: '',
  editorModel: XAxisNodeEditorModel,
  infoPanelModel: XAxisNodeInfoPanelModel,
  paletteModel: XAxisNodePaletteModel,
  accepts: ['ChartContainer'],
  modelRules: []
})
export class XAxisNode extends JNBaseNode {

  protected model: XAxisNodeModel = new XAxisNodeModel;

  public readonly body: IXAxis;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}