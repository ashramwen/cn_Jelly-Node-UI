import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNConjunctionNodeModel } from './conjunction-node-model.type';
import { JNConditionNode } from '../condition-node/condition-node.type';
import { JNConjunctionNodeEditorModel } from './conjunction-node-editor-model.type';

@JNNode({
  title: 'nodeset.JNConjunctionNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNConjunctionNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null,
  accepts: ['Condition', 'Conjunction']
})
export class JNConjunctionNode extends JNBaseNode  {

  public get body (){
    return this.model.serialize();
  }

  protected model: JNConjunctionNodeModel = new JNConjunctionNodeModel;

  protected whenReject() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  protected formatter(): any {
    return null;
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
