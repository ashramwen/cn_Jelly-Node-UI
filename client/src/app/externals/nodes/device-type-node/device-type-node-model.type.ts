import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable, JsonProperty } from '../../../../bin/JsonMapper';

@Serializable()
export class JNDeviceTypeNodeModel extends JNNodeModel {

  typeName: String;
  typeDisplayName: String;
  things: Array<String>;
  locations: Array<String>;

  constructor() {
    super();

    this.typeName = null;
    this.typeDisplayName = null;
    this.locations = [];
  }
}
