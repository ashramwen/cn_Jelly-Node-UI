import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNRuleNodeModel extends JNNodeModel {
  ruleName: string;
  triggerWhen: 'CONDITION_FALSE_TO_TRUE' | 'CONDITION_TRUE' | 'CONDITION_CHANGE';
  description: string;

  constructor() {
    super();
    this.ruleName = null;
    this.triggerWhen = null;
    this.description = null;
  }
}
