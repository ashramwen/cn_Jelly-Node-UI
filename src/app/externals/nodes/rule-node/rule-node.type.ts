import { JNBaseNode } from '../../../core/models/jn-base-node.type';
import { JNNode } from '../../../core/models/node-annotation';
import { IJNNodeModel} from '../../../core/models/interfaces';
import { JNRuleNodeEditorModel } from './rule-node-editor-model.type';
import { JNRuleInfoPanelModel } from './rule-node-info-panel-model.type';
import { JNRulePaletteModel } from './rule-node-palette-model.type';

@JNNode({
  icon: '',
  color: '',
  borderColor: '',
  accepts: [],
  editorModel: JNRuleNodeEditorModel.instance,
  infoPanelModel: JNRuleInfoPanelModel.instance,
  paletteModel: JNRulePaletteModel.instance
})
export class JNRuleNode extends JNBaseNode  {
  public get body (){
    return '';
  }

  public set body(value) {
    
  }

  protected buildOutput(): Promise<Object> {
    return null;  
  }

  protected formatter(): Promise<Object> {
    return null;
  }

  protected parser(data: Object): Promise<IJNNodeModel> {
    return null;
  }

  protected listener() {
    
  }
}
