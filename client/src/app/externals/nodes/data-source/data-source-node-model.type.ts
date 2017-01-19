import { INodeBody } from '../../../core/models/interfaces/node-body.interface';
import { Serializable } from '../../../../bin/JsonMapper';
import { JNNodeModel } from '../../../core/models/jn-node-model.type';

export interface IDataSource extends INodeBody {
  name: string;
}

@Serializable()
export class DataSourceNodeModel extends JNNodeModel<IDataSource> implements IDataSource {
  static deserialize: (data: any) => DataSourceNodeModel;

  public name;

  constructor() {
    super();
    this.name = null;
  }
}
