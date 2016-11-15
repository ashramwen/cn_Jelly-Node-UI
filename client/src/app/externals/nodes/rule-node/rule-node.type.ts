import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNRuleNodeEditorModel } from './rule-node-editor-model.type';
import { JNRuleInfoPanelModel } from './rule-node-info-panel-model.type';
import { JNRulePaletteModel } from './rule-node-palette-model.type';
import { JNRuleNodeModel } from './rule-node-model.type';
import { JNTimeNode } from '../time-node/time-node.type';

@JNNode({
  title: 'nodeset.JNRuleNode.nodename',
  icon: '',
  color: '',
  borderColor: '',
  editorModel: JNRuleNodeEditorModel,
  infoPanelModel: JNRuleInfoPanelModel.instance,
  paletteModel: null,
  accepts: ['Condition', 'Conjunction', 'Time']
})
export class JNRuleNode extends JNBaseNode  {

  protected model: JNRuleNodeModel = new JNRuleNodeModel;

  protected connectRules: IConnectRuleSetting = {
    global: [],
    nodes: [{
      nodeType: JNTimeNode,
      rules: []
    }]
  };

  public get body (){
    return this.model.serialize();
  }

  protected whenReject() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }


  protected buildOutput(): Promise<Object> {
    return null;
  }

  protected formatter(): any {
    return this.model.serialize();
  }

  protected listener() {
    
  }
}
