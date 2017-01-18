import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { MetricNodeEditorModel } from './metric-node-editor-model.type';
import { MetricNodeInfoPanelModel } from './metric-node-info-panel-model.type';
import { MetricNodePaletteModel } from './metric-node-palette-model.type';
import { MetricNodeModel, IMetric } from './metric-node-model.type';

@JNNode({
  title: 'Metric',
  icon: '\ue905',
  color: '',
  borderColor: '',
  editorModel: MetricNodeEditorModel,
  infoPanelModel: MetricNodeInfoPanelModel,
  paletteModel: MetricNodePaletteModel,
  accepts: ['LineChart'],
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
      resolve(true);
    });
  }
}