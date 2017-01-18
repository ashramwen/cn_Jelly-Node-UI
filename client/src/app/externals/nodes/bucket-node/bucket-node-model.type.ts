import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IBucket extends INodeBody {
  aggregation: 'terms' | 'dateHistogram' | 'histogram' | 'range' | 'filter';
  field: string;
  interval?: number;
  unit?: 'd' | 'h' | 'm' | 'M';
}

@Serializable()
export class BucketNodeModel extends JNNodeModel<IBucket> implements IBucket {
  static deserialize: (data: any) => BucketNodeModel;

  public aggregation;
  public field;
  public interval;
  public unit;

  constructor() {
    super();
    this.aggregation = null;
    this.field = null;
    this.interval = null;
    this.unit = null;
  }
}
