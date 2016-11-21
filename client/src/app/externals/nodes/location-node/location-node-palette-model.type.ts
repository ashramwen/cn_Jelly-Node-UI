import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNLocationNode } from './location-node.type';
import { JNDeviceTypePaletteModel } from '../device-type-node/device-type-node-palette-model.type';
import { JNDevicePropertyNode } from '../device-property-node/device-property-node.type';

export class JNLocationPaletteModel extends JNPaletteModel {

  nodes = [];
  connections = [];

  constructor() {
    super();
  }

  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNLocationNode);
    this.connections.push(JNDeviceTypePaletteModel.createConnection(JNDevicePropertyNode));
  }

}


