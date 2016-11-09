import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNDevicePropertyNodeModel extends JNNodeModel {
  property: string;
  propertyName: string;
  typeName: string;

  constructor() {
    super();
  }
}
