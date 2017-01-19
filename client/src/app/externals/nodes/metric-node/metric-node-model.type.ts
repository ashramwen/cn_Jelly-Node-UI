import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IMetric extends INodeBody {
  aggregationMethod: 'avg' | 'min' | 'max' | 'count' | 'sum';
  field: string;
}

@Serializable()
export class MetricNodeModel extends JNNodeModel<IMetric> implements IMetric {
  static deserialize: (data: any) => MetricNodeModel;

  public aggregationMethod;
  public field;
  public yAxisGroupID: string;
  public yAxisGroupIDs: string[];

  constructor() {
    super();
    this.aggregationMethod = null;
    this.field = null;
    this.yAxisGroupID = null;
    this.yAxisGroupIDs = [];
  }
}
