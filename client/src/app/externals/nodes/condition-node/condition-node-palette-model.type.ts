import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNConditionNode } from './condition-node.type';

export class JNCondtionPaletteMode extends JNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = JNPaletteModel.getNodes(JNConditionNode);
  }

}