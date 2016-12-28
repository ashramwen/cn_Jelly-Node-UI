import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IDeviceAction extends INodeBody {
  actionName: string;
  typeName: string;
  properties: Array<{
    propertyName: string;
    propertyValue: string | number | boolean;
  }>;
}

@Serializable()
export class JNActionNodeModel extends JNNodeModel<IDeviceAction> {
  static deserialize: (obj: any) => JNActionNodeModel;

  actionName: string;
  typeName: string;
  properties: Array<{
    propertyName: string;
    propertyValue: string | number | boolean;
  }>;

  constructor() {
    super();
    this.actionName = null;
    this.typeName = null;
    this.properties = null;
  }
}
