import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface ITermsFilter extends INodeBody {
  field: string;
  terms: string;
}

@Serializable()
export class TermsFilterNodeModel extends JNNodeModel<ITermsFilter> implements ITermsFilter {
  static deserialize: (data: any) => TermsFilterNodeModel;

  public field;
  public terms;

  constructor() {
    super();
    this.field = null;
    this.terms = null;
  }
}
