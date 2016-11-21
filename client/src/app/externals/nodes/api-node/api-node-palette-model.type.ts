import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNApiNode } from './api-node.type';

export class JNApiPaletteModel extends JNPaletteModel {

  constructor(){
    super();
  }

  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNApiNode);
  }

}