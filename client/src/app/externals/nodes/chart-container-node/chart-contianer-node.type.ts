import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';
import { ChartContainerNodeModel, IChartContainer } from './chart-container-node-model';
import { ChartContainerNodeInfoPanelModel } from './chart-container-node-info-panel.type';
import { ChartContainerNodePaletteModel } from './chart-container-node-palette-model.type';
import { ChartContainerNodeEditorModel } from './chart-container-node-editor-model.type';

@JNNode({
  title: 'Container',
  icon: '\uf1b2',
  color: '',
  borderColor: '',
  editorModel: ChartContainerNodeEditorModel,
  infoPanelModel: ChartContainerNodeInfoPanelModel,
  paletteModel: ChartContainerNodePaletteModel,
  accepts: ['Filter'],
  modelRules: []
})
export class ChartContainerNode extends JNBaseNode {

  protected model: ChartContainerNodeModel = new ChartContainerNodeModel;

  public readonly body: IChartContainer;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}