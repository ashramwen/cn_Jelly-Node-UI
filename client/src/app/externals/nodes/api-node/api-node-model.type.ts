import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNApiNodeModel extends JNNodeModel {
  apiName: String;
  apiUrl: String;
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
