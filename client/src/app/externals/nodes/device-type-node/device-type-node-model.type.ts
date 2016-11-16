import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable, JsonProperty } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IDeviceType  extends INodeBody {
  typeName?: string;
  things?: Array<number>;
  locations?: Array<string>;
}

@Serializable()
export class JNDeviceTypeNodeModel extends JNNodeModel<IDeviceType>  {
  static deserialize: (data: any) => JNDeviceTypeNodeModel;

  typeName: string;
  things: Array<number>;
  locations: Array<string>;

  constructor() {
    super();
    this.things = null;
    this.typeName = null;
    this.locations = [];
  }
}
