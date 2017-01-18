import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IFilter extends INodeBody {
  field: string;
  expression: string;
  valueHolder: string;
}

@Serializable()
export class JNFilterNodeModel extends JNNodeModel<IFilter> implements IFilter {
  static deserialize: (data: any) => JNFilterNodeModel;

  field: string;
  expression: string;
  valueHolder: string;

  constructor() {
    super();
    this.field = null;
    this.expression = null;
    this.valueHolder = null;
  }
}
