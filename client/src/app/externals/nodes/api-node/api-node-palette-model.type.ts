import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNApiNode } from './api-node.type';

export class JNApiPaletteModel extends JNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = JNPaletteModel.getNodes(JNApiNode);
  }

}