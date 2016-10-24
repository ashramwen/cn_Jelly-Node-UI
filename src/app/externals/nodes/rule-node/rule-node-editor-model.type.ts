import {
  IJNEditorModel,
  IJNFormButton,
  IJNFormControl
} from '../../../views/node-editor/interfaces';

export class JNRuleNodeEditorModel implements IJNEditorModel {
  static instance = new JNRuleNodeEditorModel();
  
  title: String;
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: IJNFormControl[];

  constructor() {
    
  }

}
