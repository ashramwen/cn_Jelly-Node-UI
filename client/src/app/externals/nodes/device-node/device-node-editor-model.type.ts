import {
  IJNEditorModel,
  IJNFormButton,
  IJNFormControl
} from '../../../views/node-editor/interfaces';

export class JNDeviceNodeEditorModel implements IJNEditorModel {
  static instance = new JNDeviceNodeEditorModel();

  title: String;
  buttons: IJNFormButton[];
  viewTemplate: String;
  formControls: IJNFormControl[];

  constructor() {

  }

}
