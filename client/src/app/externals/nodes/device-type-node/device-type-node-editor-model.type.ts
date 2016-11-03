import { IJNFormControl } from '../../../views/node-editor/interfaces/form-control.interface';
import {
  IJNEditorModel,
  IJNFormButton
} from '../../../views/node-editor/interfaces';

export class JNDeviceTypeNodeEditorModel implements IJNEditorModel {
  static instance = new JNDeviceTypeNodeEditorModel();

  title: String;
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: IJNFormControl[];

  constructor() {

  }

}
