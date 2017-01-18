import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';


@Serializable()
export class DrilldownNodeModel extends JNNodeModel<INodeBody> implements INodeBody {
  static deserialize: (data: any) => DrilldownNodeModel;


  constructor() {
    super();
  }
}
