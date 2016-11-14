import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNConditionNodeModel extends JNNodeModel {

  thingType: string;
  conditions: Array<{
    aggregation: 'sum' | 'max' | 'min' | 'avg' | 'count';
    percentage?: number;
    property: string;
    operator?: 'gte' | 'gt' | 'lt' | 'lte' | 'eq' | 'ne';
    value: any;
  }>;

  constructor() {
    super();
    this.thingType = null;
    this.conditions = null;
  }
}
