import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNDeviceTypeNode } from '../device-type-node/device-type-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNDevicePropertyNodeModel } from './device-property-node-model.type';

@JNNode({
  title: 'JNDevicePropertyNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [JNDeviceTypeNode],
  editorModel: null,
  infoPanelModel: null,
  paletteModel: null
})
export class JNDevicePropertyNode extends JNBaseNode {

  protected model: JNDevicePropertyNodeModel = new JNDevicePropertyNodeModel;

  protected whenRejected() {
    return null;
  }

  protected buildOutput(): Promise<Object> {
    return new Promise((resolve) => {
      resolve(this.model.serialize());
    });
  }

  protected formatter(): Object {
    return this.model.serialize();
  }

  protected parser(data: Object): Promise<JNDevicePropertyNodeModel> {
    return new Promise<JNDevicePropertyNodeModel>((resolve, reject) => {
      let result: JNDevicePropertyNodeModel =
        <JNDevicePropertyNodeModel>JNDevicePropertyNodeModel.deserialize(data);
      resolve(result);
    });
  }

  protected listener() {
  }
}
