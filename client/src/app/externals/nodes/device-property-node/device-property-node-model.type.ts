import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IDeviceProperty extends INodeBody {
  property: string;
  typeName: string;
}

@Serializable()
export class JNDevicePropertyNodeModel extends JNNodeModel implements IDeviceProperty {

  static deserialize: (data: any) => JNDevicePropertyNodeModel;

  property: string;
  typeName: string;

  serialize: () => IDeviceProperty;

  constructor() {
    super();
    this.property = null;
    this.typeName = null;
  }
}
