import { JNNode } from '../../core/models/node-annotation';
import { JNBaseNode } from '../../core/models/jn-base-node.type';
import { ChartNodeModel, IChart } from './chart-node-model.type';

@JNNode({
  title: 'Line Chart',
  icon: '\ue905',
  color: '',
  borderColor: '',
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null,
  accepts: [],
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