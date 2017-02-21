import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';
import { DataSourceNodeEditorModel } from './data-source-node-editor-model.type';
import { DataSourceNodeInfoPanelModel } from './data-source-node-info-panel-model.type';
import { DataSourceNodePaletteModel } from './data-source-node-palette-model.type';
import { DataSourceNodeModel, IDataSource } from './data-source-node-model.type';

@JNNode({
  title: 'Data Source',
  icon: '\uf171',
  color: '',
  borderColor: '',
  editorModel: DataSourceNodeEditorModel,
  infoPanelModel: DataSourceNodeInfoPanelModel,
  paletteModel: DataSourceNodePaletteModel,
  accepts: ['Metric', 'RangeFilter', 'TermsFilter', 'TimeFilter'],
  modelRules: []
})
export class DataSourceNode extends JNBaseNode {

  protected model: DataSourceNodeModel = new DataSourceNodeModel;

  public readonly body: IDataSource;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}