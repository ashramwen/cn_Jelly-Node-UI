import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IChartContainer extends INodeBody {
  xAxisDisplayName: string;
}

@Serializable()
export class ChartContainerNodeModel extends JNNodeModel<IChartContainer> implements IChartContainer {
  static deserialize: (data: any) => ChartContainerNodeModel;

  xAxisDisplayName: string;  
  
  constructor() {
    super();
    this.xAxisDisplayName = null;
  }
}
