import { JNNodeModel } from '../../../core/models/jn-node-model.type';
import { Serializable, JsonProperty } from '../../../../bin/JsonMapper';

@Serializable()
export class JNDeviceTypeNodeModel extends JNNodeModel {

  typeName: string;
  typeDisplayName: string;
  things: Array<number>;
  locations: Array<string>;

  constructor() {
    super();

    this.typeName = null;
    this.typeDisplayName = null;
    this.locations = [];
  }
}
