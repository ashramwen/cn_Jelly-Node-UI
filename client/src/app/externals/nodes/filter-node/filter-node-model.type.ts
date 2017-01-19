import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IFilter extends INodeBody {
  conditions: Array<{
    field: string;
    operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
    valueHolder: any;
  }>;
}

@Serializable()
export class JNFilterNodeModel extends JNNodeModel<IFilter> implements IFilter {
  static deserialize: (data: any) => JNFilterNodeModel;

  conditions: Array<{
    field: string;
    operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
    valueHolder: any;
  }>;

  constructor() {
    super();
    this.conditions = [];
  }
}