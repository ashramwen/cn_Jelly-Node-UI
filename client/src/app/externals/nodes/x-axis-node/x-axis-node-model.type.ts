import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IXAxis extends INodeBody {
  xAxisDisplayName: string;
}

@Serializable()
export class XAxisNodeModel extends JNNodeModel<IXAxis> implements IXAxis {
  static deserialize: (data: any) => XAxisNodeModel;

  public xAxisDisplayName;

  constructor() {
    super();
    this.xAxisDisplayName = null;
  }
}
