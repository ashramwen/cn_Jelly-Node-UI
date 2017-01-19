import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNFilterNodeModel, IFilter } from './filter-node-model.type';
import { JNFilterNodeEditorModel } from './filter-node-editor-model.type';
import { JNFilterNodePaletteModel } from './filter-node-palette-mode.type';
import { JNFilterNodeInfoPanelModel } from './filter-node-info-panel-model.type';

@JNNode({
  title: 'Filter',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNFilterNodeEditorModel,
  infoPanelModel: JNFilterNodeInfoPanelModel,
  paletteModel: JNFilterNodePaletteModel,
  accepts: [],
  modelRules: [{
    message: 'nodeset.JNFilterNode.errors.scheduleTypeRequired',
    validator: (model: JNFilterNodeModel) => {
      return !!model.conditions;
    }
  }]
})
export class JNFilterNode extends JNBaseNode  {
  protected model: JNFilterNodeModel = new JNFilterNodeModel;

  public readonly body: IFilter;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
