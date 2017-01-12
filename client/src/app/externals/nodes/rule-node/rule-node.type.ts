import { JNBaseNode, IConnectRuleSetting } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNRuleNodeEditorModel } from './rule-node-editor-model.type';
import { JNRuleNodeInfoPanelModel } from './rule-node-info-panel-model.type';
import { JNRuleNodePaletteModel } from './rule-node-palette-model.type';
import { JNRuleNodeModel, IRule } from './rule-node-model.type';
import { JNTimeNode } from '../time-node/time-node.type';

@JNNode({
  title: 'nodeset.JNRuleNode.nodename',
  icon: '\ue903',
  color: '',
  borderColor: '',
  editorModel: JNRuleNodeEditorModel,
  infoPanelModel: JNRuleNodeInfoPanelModel,
  paletteModel: JNRuleNodePaletteModel,
  accepts: ['Condition', 'Conjunction', 'Time'],
  modelRules: [{
    message: 'nodeset.JNRuleNode.errors.ruleNameRequired',
    validator: (model: JNRuleNodeModel) => {
      return !!model.ruleName;
    }
  }, {
    message: 'nodeset.JNRuleNode.errors.triggerWhenRequired',
    validator: (model: JNRuleNodeModel) => {
      return !!model.triggerWhen;
    }
  }]
})
export class JNRuleNode extends JNBaseNode  {

  protected model: JNRuleNodeModel = new JNRuleNodeModel;

  public readonly body: IRule;

  protected whenReject() {
    return Promise.resolve(true);
  }

  protected listener() {
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
