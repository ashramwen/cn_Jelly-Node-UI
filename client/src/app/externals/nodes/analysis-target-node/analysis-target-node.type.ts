import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';
import { AnalysisTargetNodeEditorModel } from './analysis-target-node-editor-model.type';
import { AnalysisTargetNodeInfoPanelModel } from './analysis-target-node-info-panel-model.type';
import { AnalysisTargetNodePaletteModel } from './analysis-target-node-palette-model.type';
import { AnalysisTargetNodeModel, IAnalysisTarget } from './analysis-target-node-model.type';

@JNNode({
  title: 'Analysis',
  icon: '\uf247',
  color: '',
  borderColor: '',
  editorModel: AnalysisTargetNodeEditorModel,
  infoPanelModel: AnalysisTargetNodeInfoPanelModel,
  paletteModel: AnalysisTargetNodePaletteModel,
  accepts: [],
  modelRules: []
})
export class AnalysisTargetNode extends JNBaseNode {

  protected model: AnalysisTargetNodeModel = new AnalysisTargetNodeModel;

  public readonly body: IAnalysisTarget;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}