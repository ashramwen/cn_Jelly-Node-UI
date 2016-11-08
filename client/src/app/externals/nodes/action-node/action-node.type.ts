import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNActionNodeModel } from './action-node-model.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDevicePropertyNode],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
export class JNConditionNode extends JNBaseNode  {

  public get body (){
    return this.model.serialize();
  }

  protected model: JNActionNodeModel;

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(null);
    });
  }

  protected whenRejected() {
    return null;
  }

  protected formatter(): Promise<Object> {
    return null;
  }

  protected parser(data: Object): Promise<JNActionNodeModel> {
    return new Promise((resolve) => {
      resolve(JNActionNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
