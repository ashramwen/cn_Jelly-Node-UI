import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface ITimeFilter extends INodeBody {
  field: string;
  startAt: string;
  endAt: string;
}

@Serializable()
export class TimeFilterNodeModel extends JNNodeModel<ITimeFilter> implements ITimeFilter {
  static deserialize: (data: any) => TimeFilterNodeModel;

  public field;
  public startAt;
  public endAt;

  constructor() {
    super();
    this.field = null;
    this.startAt = null;
    this.endAt = null;
  }
}
