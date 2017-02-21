import { INodeBody } from '../../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../../core/models/jn-node-model.type';

export interface IChart extends INodeBody {
  fieldName: string;
}

@Serializable()
export class ChartNodeModel extends JNNodeModel<IChart> implements IChart {
  static deserialize: (data: any) => ChartNodeModel;

  public fieldName: string;
  

  constructor() {
    super();
    this.fieldName = '';
  }
}
