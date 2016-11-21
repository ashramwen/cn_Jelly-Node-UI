import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNConjunctionNode } from './conjunction-node.type';

export class JNConjunctionPaletteModel extends JNPaletteModel {

  constructor(){
    super();
  }

  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNConjunctionNode);
  }
  
}