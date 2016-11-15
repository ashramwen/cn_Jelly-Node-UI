import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { IJNPaletteService } from '../../services/palette.service';
import { JNActionNode } from './action-node.type';

export class JNActionPaletteModel extends IJNPaletteModel {

  static instance = new JNActionPaletteModel();

  public init() {
    this.nodes = IJNPaletteService.getNodes(JNActionNode);
  }

}