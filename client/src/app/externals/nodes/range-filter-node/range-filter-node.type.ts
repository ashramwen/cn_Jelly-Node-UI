import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { RangeFilterNodeEditorModel } from './range-filter-node-editor-model.type';
import { RangeFilterNodeInfoPanelModel } from './range-filter-node-info-panel-model.type';
import { RangeFilterNodePaletteModel } from './range-filter-node-palette-model.type';
import { RangeFilterNodeModel, IRangeFilter } from './range-filter-node-model.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';

@JNNode({
  title: 'RangeFilter',
  icon: '\uf0b0',
  color: '',
  borderColor: '',
  editorModel: RangeFilterNodeEditorModel,
  infoPanelModel: RangeFilterNodeInfoPanelModel,
  paletteModel: RangeFilterNodePaletteModel,
  accepts: [],
  modelRules: []
})
export class RangeFilterNode extends JNBaseNode {

  protected model: RangeFilterNodeModel = new RangeFilterNodeModel;

  public readonly body: IRangeFilter;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}