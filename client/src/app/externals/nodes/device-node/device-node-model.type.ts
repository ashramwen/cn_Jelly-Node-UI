import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNDeviceNodeModel extends JNNodeModel {
  locations: Array<String>;
  thingIDs: Array<number>;
  types: Array<String>;
}
