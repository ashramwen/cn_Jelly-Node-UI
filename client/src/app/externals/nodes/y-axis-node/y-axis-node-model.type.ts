import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IYAxis extends INodeBody {
  name: string;
}

@Serializable()
export class YAxisNodeModel extends JNNodeModel<IYAxis> implements IYAxis {
  static deserialize: (data: any) => YAxisNodeModel;

  public name;

  constructor() {
    super();
    this.name = null;
  }
}
