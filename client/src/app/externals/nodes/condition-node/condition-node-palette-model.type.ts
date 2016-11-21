import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNConditionNode } from './condition-node.type';

export class JNCondtionPaletteMode extends JNPaletteModel {

  constructor(){
    super();
  }

  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNConditionNode);
  }

}