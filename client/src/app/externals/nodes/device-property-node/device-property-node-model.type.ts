import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNDevicePropertyNodeModel extends JNNodeModel {
  property: String;
  propertyName: String;

  constructor() {
    super();
  }
}
