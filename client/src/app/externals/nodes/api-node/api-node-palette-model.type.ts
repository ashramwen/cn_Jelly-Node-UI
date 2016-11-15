import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNApiNode } from './api-node.type';
import { IJNPaletteService } from '../../services/palette.service';

export class JNApiPaletteModel extends IJNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = IJNPaletteService.getNodes(JNApiNode);
  }

}