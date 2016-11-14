import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNTimeNodeModel } from './time-node-model.type';
import { JNTimeNodeEditorModel } from './time-node-editor-model.type';

@JNNode({
  title: 'nodeset.JNTimeNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNTimeNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null,
  accepts: []
})
export class JNTimeNode extends JNBaseNode  {
  protected model: JNTimeNodeModel = new JNTimeNodeModel;

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
  
  protected listener() {
    
  }
}
