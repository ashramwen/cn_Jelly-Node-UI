import { IJNPaletteService } from '../../services/palette.service';
import { JNRuleNode } from './rule-node.type';
import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';

export class JNRulePaletteModel extends IJNPaletteModel {
  
  static instance = new JNRulePaletteModel();

  protected init() {
    this.nodes = IJNPaletteService.getNodes(JNRuleNode);
  }

}
