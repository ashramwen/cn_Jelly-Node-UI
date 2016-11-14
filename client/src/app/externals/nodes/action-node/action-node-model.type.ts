import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IDeviceAction extends INodeBody {
  actionName: string;
  typeName: string;
  properties: Array<{
    propertyName: String;
    propertyValue: String | number | boolean;
  }>;
}

@Serializable()
export class JNActionNodeModel extends JNNodeModel<IDeviceAction> {
  static deserialize: (obj: any) => JNActionNodeModel;

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
