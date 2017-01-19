import { ChartNodeModel, IChart } from './chart-node-model.type';
import { JNBaseNode } from '../../../../core/models/jn-base-node.type';
import { JNNode } from '../../../../core/models/node-annotation';
import { ChartNodeEditorModel } from './chart-node-editor-model.type';
import { ChartNodeInfoPanelModel } from './chart-node-info-panel-model.type';
import { ChartNodePaletteModel } from './chart-node-palette-model.type';

@JNNode({
  title: 'Line Chart',
  icon: '\uf201',
  color: '',
  borderColor: '',
  editorModel: ChartNodeEditorModel,
  infoPanelModel: ChartNodeInfoPanelModel,
  paletteModel: ChartNodePaletteModel,
  accepts: ['ChartContainer'],
  modelRules: [{
    message: 'X axis or Y axis displayname is empty.',
    validator: (model: ChartNodeModel) => {
      return !!model.xAxisDisplayName
        || !!model.yAxisDisplayName
        || !model.yAxisDisplayName.length;
    }
  }]
})
export class ChartNode extends JNBaseNode {

  protected model: ChartNodeModel = new ChartNodeModel;

  public readonly body: IChart;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}