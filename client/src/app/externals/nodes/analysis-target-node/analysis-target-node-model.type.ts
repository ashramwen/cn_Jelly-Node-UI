import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IAnalysisTarget extends INodeBody {
  name: string;
}

@Serializable()
export class AnalysisTargetNodeModel extends JNNodeModel<IAnalysisTarget> implements IAnalysisTarget {
  static deserialize: (data: any) => AnalysisTargetNodeModel;

  public name;

  constructor() {
    super();
    this.name = null;
  }
}
