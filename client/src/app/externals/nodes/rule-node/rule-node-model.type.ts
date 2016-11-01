import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNRuleNodeModel extends JNNodeModel {
  ruleName: String;
  triggerWhen: 'CONDITION_FALSE_TO_TRUE' | 'CONDITION_TRUE' | 'CONDITION_CHANGE';
}
