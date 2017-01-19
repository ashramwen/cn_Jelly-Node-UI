import { JNNode } from '../../../core/models/node-annotation';
import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { DrilldownEditorModel } from './drilldown-node-editor-model.type';
import { DrilldownNodeInfoPanelModel } from './drilldown-node-info-panel-model.type';
import { DrilldownNodePaletteModel } from './drilldown-node-palette-model.type';
import { DrilldownNodeModel } from './drilldown-node-model.type';

@JNNode({
  title: 'Drilldown',
  icon: '\uf063',
  color: '',
  borderColor: '',
  editorModel: DrilldownEditorModel,
  infoPanelModel: DrilldownNodeInfoPanelModel,
  paletteModel: DrilldownNodePaletteModel,
  accepts: ['ChartContainer'],
  modelRules: []
})
export class DrilldownNode extends JNBaseNode {

  protected model: DrilldownNodeModel = new DrilldownNodeModel;

  public readonly body: INodeBody;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}