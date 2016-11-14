import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IRule extends INodeBody{
  ruleName: string;
  triggerWhen: 'CONDITION_FALSE_TO_TRUE' | 'CONDITION_TRUE' | 'CONDITION_CHANGE';
  description: string;
}

@Serializable()
export class JNRuleNodeModel extends JNNodeModel<IRule> {
  static deserialize: (data: any) => JNRuleNodeModel;

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
