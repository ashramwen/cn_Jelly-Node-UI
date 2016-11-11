import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNActionNodeModel extends JNNodeModel {
  actionName: string;
  typeName: string;
  properties: Array<{
    propertyName: String;
    propertyValue: String | number | boolean;
  }>;

  constructor() {
    super();
    this.actionName = null;
    this.typeName = null;
    this.properties = null;
  }
}
