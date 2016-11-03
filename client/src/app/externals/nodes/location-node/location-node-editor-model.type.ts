import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import { IJNEditorModel } from '../../../views/node-editor/interfaces/editor-model.interface';
import { IJNFormButton } from '../../../views/node-editor/interfaces/button';

export class JNLocationNodeEditorModel implements IJNEditorModel {
  static instance = new JNLocationNodeEditorModel();

  title: String;
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: {};

  constructor() {
  }

}
