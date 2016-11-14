import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNTimeNodeModel } from './time-node-model.type';
import { JNTimeNodeEditorModel } from './time-node-editor-model.type';

@JNNode({
  title: 'JNRuleNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [],
  editorModel: JNTimeNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null
})
export class JNTimeNode extends JNBaseNode  {
  protected model: JNTimeNodeModel;

  public get body (){
    return this.model.serialize();
  }

  protected whenReject() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }


  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected formatter(): any {
    return this.model.serialize();
  }

  protected parser(data: Object): Promise<JNTimeNodeModel> {
    return new Promise((resolve) => {
      resolve(JNTimeNodeModel.deserialize(data));
    });
  }

  protected listener() {
    
  }
}
