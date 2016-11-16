import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';
import { INodeBody } from '../../../core/models/interfaces/node-body.interface';

export interface IApi extends INodeBody {
  apiName: string;
  apiUrl: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  body: any;
  header: any;
}

@Serializable()
export class JNApiNodeModel extends JNNodeModel<IApi> {
  static deserialize: (obj: any) => JNApiNodeModel;

  apiName: string;
  apiUrl: string;
  method: 'POST' | 'GET' | 'DELETE' | 'PUT';
  body: any;
  header: any;

  constructor() {
    super();
    this.apiName = null;
    this.apiUrl = null;
    this.method = null;
    this.body = null;
    this.header = null;
  }
}
