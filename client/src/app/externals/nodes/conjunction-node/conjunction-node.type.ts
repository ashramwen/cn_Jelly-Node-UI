import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNConjunctionNodeModel, IConjunction } from './conjunction-node-model.type';
import { JNConjunctionNodeEditorModel } from './conjunction-node-editor-model.type';
import { JNConjunctionPaletteModel } from './conjunction-node-palette-model.type';

@JNNode({
  title: 'nodeset.JNConjunctionNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNConjunctionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: JNConjunctionPaletteModel,
  accepts: ['Condition', 'Conjunction'],
  modelRules: [{
    message: '连接表达式不能为空',
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
