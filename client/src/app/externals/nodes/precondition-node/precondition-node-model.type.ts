import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNPreconditionNodeModel extends JNNodeModel {
  from: String;
  to: String;
}
