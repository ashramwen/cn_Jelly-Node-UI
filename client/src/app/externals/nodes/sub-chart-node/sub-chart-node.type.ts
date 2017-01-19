import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { SubChartNodeEditorModel } from './sub-chart-node-editor-modal.type';
import { SubChartNodeInfoPanelModel } from './sub-chart-node-info-panel-model.type';
import { SubChartNodePaletteModel } from './sub-chart-node-palette-model.type';
import { SubChartNodeModel, ISubChart } from './sub-chart-node-model.type';

@JNNode({
  title: 'Sub Chart',
  icon: '\ue905',
  color: '',
  borderColor: '',
  editorModel: SubChartNodeEditorModel,
  infoPanelModel: SubChartNodeInfoPanelModel,
  paletteModel: SubChartNodePaletteModel,
  accepts: ['Drilldown'],
  modelRules: []
})
export class SubChartNode extends JNBaseNode {

  protected model: SubChartNodeModel = new SubChartNodeModel;

  public readonly body: ISubChart;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}