import { IJNPaletteService } from '../../services/palette.service';
import { JNRuleNode } from './rule-node.type';
import { IJNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNRuleInfoPanelModel } from './rule-node-info-panel-model.type';

export class JNRulePaletteModel extends IJNPaletteModel {
  
  constructor(){
    super();
    this.init();
  }

  protected init() {
    this.nodes = IJNPaletteService.getNodes(JNRuleNode);
  }

}
