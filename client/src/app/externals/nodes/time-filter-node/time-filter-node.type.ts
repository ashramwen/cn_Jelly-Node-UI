import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { TimeFilterNodeEditorModel } from './time-filter-node-editor-model.type';
import { TimeFilterNodeInfoPanelModel } from './time-filter-node-info-panel-model.type';
import { TimeFilterNodePaletteModel } from './time-filter-node-palette-model.type';
import { TimeFilterNodeModel, IBucket } from './time-filter-node-model.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';

@JNNode({
  title: 'TimeFilter',
  icon: '\uf0b0',
  color: '',
  borderColor: '',
  editorModel: TimeFilterNodeEditorModel,
  infoPanelModel: TimeFilterNodeInfoPanelModel,
  paletteModel: TimeFilterNodePaletteModel,
  accepts: [],
  modelRules: []
})
export class TimeFilterNode extends JNBaseNode {

  protected model: TimeFilterNodeModel = new TimeFilterNodeModel;

  public readonly body: IBucket;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}