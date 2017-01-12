import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNConjunctionNodeModel, IConjunction } from './conjunction-node-model.type';
import { JNConjunctionNodeEditorModel } from './conjunction-node-editor-model.type';
import { JNConjunctionNodePaletteModel } from './conjunction-node-palette-model.type';
import { JNConjunctionNodeInfoPanelModel } from './conjunction-node-info-panel.type';

@JNNode({
  title: 'nodeset.JNConjunctionNode.nodename',
  icon: '\ue907',
  color: '',
  borderColor: '',
  editorModel: JNConjunctionNodeEditorModel,
  infoPanelModel: JNConjunctionNodeInfoPanelModel,
  paletteModel: JNConjunctionNodePaletteModel,
  accepts: ['Condition', 'Conjunction'],
  modelRules: [{
    message: 'nodeset.JNConjunctionNode.errors.expressionRequired',
    validator: (model: JNConjunctionNodeModel) => {
      return !!model.conjunction;
    }
  }]
})
export class JNConjunctionNode extends JNBaseNode  {

  public readonly body: IConjunction;

  protected model: JNConjunctionNodeModel = new JNConjunctionNodeModel;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener(data: Object) {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
