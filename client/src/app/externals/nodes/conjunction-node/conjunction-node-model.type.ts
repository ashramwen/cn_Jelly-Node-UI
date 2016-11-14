import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IConjunction extends INodeBody{
  conjunction: 'and' | 'or' | 'nore';
}

@Serializable()
export class JNConjunctionNodeModel extends JNNodeModel<INodeBody> {
  static deserialize: (obj: any) => JNConjunctionNodeModel;

  conjunction: 'and' | 'or' | 'nore';

  constructor() {
    super();
    this.conjunction = null;
  }
}
