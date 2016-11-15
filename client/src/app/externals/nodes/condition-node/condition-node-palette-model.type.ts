import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { IJNPaletteService } from '../../services/palette.service';
import { JNConditionNode } from './condition-node.type';

export class JNCondtionPaletteMode extends IJNPaletteModel {

  static instance = new JNCondtionPaletteMode();

  public init() {
    this.nodes = IJNPaletteService.getNodes(JNConditionNode);
  }

}