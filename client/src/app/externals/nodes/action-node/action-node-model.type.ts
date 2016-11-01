import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNActionNodeModel extends JNNodeModel {
  actionName: String;
  properties: Array<{
    propertyName: String;
    propertyValue: String | number | boolean;
  }>;

  constructor() {
    super();
  }
}
