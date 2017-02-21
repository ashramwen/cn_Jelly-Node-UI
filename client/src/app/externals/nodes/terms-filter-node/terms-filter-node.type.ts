import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { TermsFilterNodeEditorModel } from './terms-filter-node-editor-model.type';
import { TermsFilterNodeInfoPanelModel } from './terms-filter-node-info-panel-model.type';
import { TermsFilterNodePaletteModel } from './terms-filter-node-palette-model.type';
import { TermsFilterNodeModel, ITermsFilter } from './terms-filter-node-model.type';
import { JNUtils } from '../../../share/util';
import { ChartNode } from '../charts/models/chart-node.type';
import { SubChartNode } from '../sub-chart-node/sub-chart-node.type';

@JNNode({
  title: 'Terms Filter',
  icon: '\uf0b0',
  color: '',
  borderColor: '',
  editorModel: TermsFilterNodeEditorModel,
  infoPanelModel: TermsFilterNodeInfoPanelModel,
  paletteModel: TermsFilterNodePaletteModel,
  accepts: ['AnalysisTarget'],
  modelRules: []
})
export class TermsFilterNode extends JNBaseNode {

  protected model: TermsFilterNodeModel = new TermsFilterNodeModel;

  public readonly body: ITermsFilter;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}