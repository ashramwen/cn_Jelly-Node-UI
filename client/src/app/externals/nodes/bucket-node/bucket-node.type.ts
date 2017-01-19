import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { BucketNodeEditorModel } from './bucket-node-editor-model.type';
import { BucketNodeInfoPanelModel } from './bucket-node-info-panel-model.type';
import { BucketNodePaletteModel } from './bucket-node-palette-model.type';
import { BucketNodeModel, IBucket } from './bucket-node-model.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';

@JNNode({
  title: 'Aggregation',
  icon: '\uf171',
  color: '',
  borderColor: '',
  editorModel: BucketNodeEditorModel,
  infoPanelModel: BucketNodeInfoPanelModel,
  paletteModel: BucketNodePaletteModel,
  accepts: ['ChartContainer', 'Bucket', 'SubChart'],
  modelRules: []
})
export class BucketNode extends JNBaseNode {

  protected model: BucketNodeModel = new BucketNodeModel;

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