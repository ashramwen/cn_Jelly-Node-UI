import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface ISubChart extends INodeBody {
  chartType: 'line' | 'pie' | 'bubble' | 'bar';
  xAxisDisplayName: string;
  yAxisDisplayName: string[]; 
}

@Serializable()
export class SubChartNodeModel extends JNNodeModel<ISubChart> implements ISubChart {
  static deserialize: (data: any) => SubChartNodeModel;

  chartType: 'line' | 'pie' | 'bubble' | 'bar';
  xAxisDisplayName: string;
  yAxisDisplayName: string[]; 

  constructor() {
    super();
    this.chartType = null;
    this.xAxisDisplayName = null;
    this.yAxisDisplayName = [];
  }
}
