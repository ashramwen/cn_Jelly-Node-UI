import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNDeviceNodeModel extends JNNodeModel {
  typeName: String;
  typeDisplayName: String;
  
}
