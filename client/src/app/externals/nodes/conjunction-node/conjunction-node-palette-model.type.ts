import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNConjunctionNode } from './conjunction-node.type';

export class JNConjunctionPaletteModel extends JNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = JNPaletteModel.getNodes(JNConjunctionNode);
  }
  
}