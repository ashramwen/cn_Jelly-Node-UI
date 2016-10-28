import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNConditionNodeModel extends JNNodeModel {

  conditions: Array<{
    aggregation: 'sum' | 'max' | 'min' | 'avg' | 'count';
    percentage?: number;
    property: String;
    operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
    value: any;
  }>;
}
