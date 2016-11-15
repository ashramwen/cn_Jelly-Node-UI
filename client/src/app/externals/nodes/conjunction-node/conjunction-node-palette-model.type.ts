import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { IJNPaletteService } from '../../services/palette.service';
import { JNConjunctionNode } from './conjunction-node.type';

export class JNConjunctionPaletteModel extends IJNPaletteModel {

  static instance = new JNConjunctionPaletteModel();

  public init() {
    this.nodes = IJNPaletteService.getNodes(JNConjunctionNode);
  }
  
}