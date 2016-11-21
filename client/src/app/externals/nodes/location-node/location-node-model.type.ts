import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface ILocationNodeModel extends INodeBody {
  locationID: string;
  locationStr: Array<string>;
}

@Serializable()
export class JNLocationNodeModel extends JNNodeModel<ILocationNodeModel> {
  static deserialize: (data: any) => JNLocationNodeModel;

  locationID: string;
  locationStr: Array<string>;

  serialize: () => ILocationNodeModel;

  constructor() {
    super();
    this.locationID = null;
    this.locationStr = [];
  }
}
