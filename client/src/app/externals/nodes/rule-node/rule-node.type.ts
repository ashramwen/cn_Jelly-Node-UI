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
  paletteModel: JNRulePaletteModel.instance,
  accepts: ['Condition', 'Conjunction', 'Time'],
  modelRules: [{
    message: '必须包含规则名称',
    validator: (model: JNRuleNodeModel) => {
      return !!model.ruleName;
    }
  }, {
    message: '必须包含规则触发条件',
    validator: (model: JNRuleNodeModel) => {
      return !!model.triggerWhen;
    }
  }]
})
export class JNRuleNode extends JNBaseNode  {

  protected model: JNRuleNodeModel = new JNRuleNodeModel;

  public get body (){
    return this.model.serialize();
  }

  protected whenReject() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  protected formatter(): any {
    return this.model.serialize();
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
