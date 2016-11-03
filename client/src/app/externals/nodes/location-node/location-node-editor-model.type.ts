import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import {
  IJNEditorModel,
  IJNFormButton
} from '../../../views/node-editor/interfaces';

export class JNLocationNodeEditorModel implements IJNEditorModel {
  static instance = new JNLocationNodeEditorModel();

  title: String;
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: IJNFormControl[];

  constructor() {
  }

}
