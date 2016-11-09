import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';
import { JNConditionNodeModel } from './condition-node-model.type';

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

  protected model: JNConditionNodeModel;

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

  protected parser(data: Object): Promise<JNConditionNodeModel> {
    return new Promise((resolve) => {
      resolve(JNConditionNodeModel.deserialize(data));
    });
  }

  protected listener(data: Object) {
    console.log(data);
  }
}
