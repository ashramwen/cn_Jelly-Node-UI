import { JNActionNode } from './action-node.type';
import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';

export class JNActionPaletteModel extends JNPaletteModel {

  constructor(){
    super();
  }
  
  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNActionNode);
  }

}