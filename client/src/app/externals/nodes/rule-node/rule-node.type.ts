import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNRuleNodeEditorModel } from './rule-node-editor-model.type';
import { JNRuleInfoPanelModel } from './rule-node-info-panel-model.type';
import { JNRulePaletteModel } from './rule-node-palette-model.type';
import { JNRuleNodeModel } from './rule-node-model.type';
import { JNTimeNode } from '../time-node/time-node.type';

@JNNode({
  title: 'JNRuleNode',
  icon: '',
  color: '',
  borderColor: '',
  accepts: [],
  editorModel: JNRuleNodeEditorModel,
  infoPanelModel: JNRuleInfoPanelModel.instance,
  paletteModel: JNRulePaletteModel.instance
})
export class JNRuleNode extends JNBaseNode  {
  protected model: JNRuleNodeModel;

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

  protected parser(data: Object): Promise<JNRuleNodeModel> {
    return new Promise((resolve) => {
      resolve(JNRuleNodeModel.deserialize(data));
    });
  }

  protected listener() {
    
  }
}
