import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable } from '../../../../bin/JsonMapper';

@Serializable()
export class JNLocationNodeModel extends JNNodeModel {
  locationID: String;
  locations: Array<String>;
}
