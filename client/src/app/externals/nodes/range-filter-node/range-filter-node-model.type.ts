import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IRangeFilter extends INodeBody {
  operator: 'gte' | 'gt' | 'lte' | 'lt';
  field: string;
  value: string;
}

@Serializable()
export class RangeFilterNodeModel extends JNNodeModel<IRangeFilter> implements IRangeFilter {
  static deserialize: (data: any) => RangeFilterNodeModel;

  public field;
  public operator;
  public value;

  constructor() {
    super();
    this.field = null;
    this.operator = null;
    this.value = null;
  }
}
