import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { MetricNodeEditorModel } from './metric-node-editor-model.type';
import { MetricNodeInfoPanelModel } from './metric-node-info-panel-model.type';
import { MetricNodePaletteModel } from './metric-node-palette-model.type';
import { MetricNodeModel, IMetric } from './metric-node-model.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';

@JNNode({
  title: 'Metric',
  icon: '\uf176',
  color: '',
  borderColor: '',
  editorModel: MetricNodeEditorModel,
  infoPanelModel: MetricNodeInfoPanelModel,
  paletteModel: MetricNodePaletteModel,
  accepts: ['LineChart', 'BarChart', 'PieChart', 'ScatterChart', 'BubbleChart', 'SubChart'],
  modelRules: []
})
export class MetricNode extends JNBaseNode {

  protected model: MetricNodeModel = new MetricNodeModel;

  public readonly body: IMetric;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      let node = JNUtils.toArray<JNBaseNode>(this.nodeMap.accepted)
        .map(p => p.value)
        .find(n => n instanceof ChartNode || n instanceof SubChartNode);
      
      if (node) {
        this.update({
          yAxisGroupIDs: (<ChartNode>node).body.yAxisDisplayName
        });
      }
      resolve(true);
    });
  }
}