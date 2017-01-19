import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';
import { AnyNodeEditorModel } from './any-node-editor-model.type';
import { AnyNodeInfoPanelModel } from './any-node-info-panel-model.type';
import { AnyNodePaletteModel } from './any-node-palette-model.type';
import { AnyNodeModel, IAny } from './any-node-model.type';

@JNNode({
  title: 'Bucket',
  icon: '\uf171',
  color: '',
  borderColor: '',
  editorModel: AnyNodeEditorModel,
  infoPanelModel: AnyNodeInfoPanelModel,
  paletteModel: AnyNodePaletteModel,
  accepts: ['ChartContainer', 'Bucket', 'SubChart', 'Any'],
  modelRules: []
})
export class AnyNode extends JNBaseNode {

  protected model: AnyNodeModel = new AnyNodeModel;

  public readonly body: IAny;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  protected getTitle(): string {
    return this.model.name || 'AnyNode';
  }
}