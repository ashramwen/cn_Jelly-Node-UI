import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNRuleNode } from '../rule-node/rule-node.type';
import { JNApiNodeEditorModel } from './api-node-editor-model.type';
import { JNApiNodeModel } from './api-node-model.type';

@JNNode({
  title: 'JNActionNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNRuleNode],
  editorModel: JNApiNodeEditorModel,
  infoPanelModel: null,
  paletteModel: null
})
export class JNApiNode extends JNBaseNode  {

  public get body (){
    return this.model.serialize();
  }

  protected model: JNApiNodeModel;

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  protected whenReject() {
    return null;
  }

  protected formatter() {
    return null;
  }

  protected parser(data: Object): Promise<JNApiNodeModel> {
    return new Promise((resolve) => {
      resolve(JNApiNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
