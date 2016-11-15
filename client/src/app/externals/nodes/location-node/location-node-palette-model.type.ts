import { IJNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNLocationNode } from './location-node.type';
import { IJNPaletteService } from '../../services/palette.service';

export class JNLocationPaletteModel extends IJNPaletteModel {

  constructor(){
    super();
    this.init();
  }

  public init() {
    this.nodes = IJNPaletteService.getNodes(JNLocationNode);
  }

}


