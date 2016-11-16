import { JNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNLocationNode } from './location-node.type';

export class JNLocationPaletteModel extends JNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = JNPaletteModel.getNodes(JNLocationNode);
  }

}


