import { JNRuleNode } from './rule-node.type';
import { JNPaletteModel } from '../../../views/palette/interfaces/palette-model.type';
import { JNRuleInfoPanelModel } from './rule-node-info-panel-model.type';

export class JNRulePaletteModel extends JNPaletteModel {
  
  constructor(){
    super();
}

  public init(body) {
    this.nodes = JNPaletteModel.getNodes(JNRuleNode);
  }

}
