import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';
import { YAxisNodeModel, IYAxis } from './y-axis-node-model.type';
import { YAxisNodeEditorModel } from './y-axis-node-editor-model.type';
import { YAxisNodeInfoPanelModel } from './y-axis-node-info-panel-model.type';
import { YAxisNodePaletteModel } from './y-axis-node-palette-model.type';

@JNNode({
  title: 'Y Axis',
  icon: '\uf171',
  color: '',
  borderColor: '',
  editorModel: YAxisNodeEditorModel,
  infoPanelModel: YAxisNodeInfoPanelModel,
  paletteModel: YAxisNodePaletteModel,
  accepts: ['ChartContainer', 'Bucket', 'SubChart', 'Any'],
  modelRules: []
})
export class YAxisNode extends JNBaseNode {

  protected model: YAxisNodeModel = new YAxisNodeModel;

  public readonly body: IYAxis;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}