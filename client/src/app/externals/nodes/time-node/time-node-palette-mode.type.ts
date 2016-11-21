import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNTimeNode } from './time-node.type';

export class JNTimePaletteModel extends JNPaletteModel{

  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNTimeNode);
  }
}