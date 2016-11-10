import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { JNRuleNodeEditorModel } from './rule-node-editor-model.type';
import { JNRuleInfoPanelModel } from './rule-node-info-panel-model.type';
import { JNRulePaletteModel } from './rule-node-palette-model.type';
import { JNRuleNodeModel } from './rule-node-model.type';

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

  protected formatter(): Promise<Object> {
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
