import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { IJNPaletteService } from '../../services/palette.service';
import { JNConjunctionNode } from './conjunction-node.type';

export class JNConjunctionPaletteModel extends IJNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = IJNPaletteService.getNodes(JNConjunctionNode);
  }
  
}