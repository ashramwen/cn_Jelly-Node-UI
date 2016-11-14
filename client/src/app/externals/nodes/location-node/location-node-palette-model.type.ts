import { IJNPaletteConnection } from '../../../views/palette/palette-connections.type';
import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNLocationNode } from './location-node.type';
import { IJNPaletteService } from '../../services/palette.service';

export class JNLocationPaletteModel extends IJNPaletteModel {

  connections: Array<IJNPaletteConnection>;

  static instance = new JNLocationPaletteModel();

  protected init() {
    IJNPaletteService.getPaletteProperties(JNLocationNode);
  }
}
