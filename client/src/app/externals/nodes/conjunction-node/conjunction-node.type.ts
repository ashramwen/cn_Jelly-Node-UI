import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNConjunctionNodeModel } from './conjunction-node-model.type';
import { JNConditionNode } from '../condition-node/condition-node.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNConditionNode, JNConjunctionNode],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
export class JNConjunctionNode extends JNBaseNode  {
  public get body (){
    return '';
  }

  protected model: JNConjunctionNodeModel;

  protected whenRejected() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  protected formatter(): Promise<Object> {
    return null;
  }

  protected parser(data: Object): Promise<JNConjunctionNodeModel> {
    return new Promise((resolve) => {
      resolve(JNConjunctionNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
