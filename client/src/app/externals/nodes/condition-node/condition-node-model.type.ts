import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface ICondition extends INodeBody {
  thingType: string;
  conditions: Array<{
    aggregation: 'sum' | 'max' | 'min' | 'avg' | 'count';
    percentage?: number;
    property: string;
    operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
    value: any;
  }>;
}

@Serializable()
export class JNConditionNodeModel extends JNNodeModel<ICondition> {
  static deserialize: (obj: any) => JNConditionNodeModel;

  typeName: string;
  conditions: Array<{
    aggregation: 'sum' | 'max' | 'min' | 'avg' | 'count';
    percentage?: number;
    property: string;
    operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
    value: any;
  }>;

  constructor() {
    super();
    this.typeName = null;
    this.conditions = null;
  }
}
