import { INodeBody } from '../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../bin/JsonMapper';
import { JNNodeModel } from '../../core/models/jn-node-model.type';

export interface IChart extends INodeBody {
  name: string;
  xAxisDisplayName: string;
  yAxisDisplayName: string[];
}

@Serializable()
export class ChartNodeModel extends JNNodeModel<IChart> implements IChart {
  static deserialize: (data: any) => ChartNodeModel;

  public name: string;
  public xAxisDisplayName: string;
  public yAxisDisplayName: string[];  
  

  constructor() {
    super();
    this.name = '';
    this.xAxisDisplayName = '';
    this.yAxisDisplayName = [];
  }
}
