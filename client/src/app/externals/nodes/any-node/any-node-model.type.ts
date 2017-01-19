import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IAny extends INodeBody {
  name: string;
}

@Serializable()
export class AnyNodeModel extends JNNodeModel<IAny> implements IAny {
  static deserialize: (data: any) => AnyNodeModel;

  public name;

  constructor() {
    super();
    this.name = null;
  }
}
