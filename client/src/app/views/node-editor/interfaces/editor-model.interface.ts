import { IJNFormButton } from './button';
import { IJNFormControl } from './form-control.interface';

export interface IJNEditorModel {
  title: String;
  buttons: IJNFormButton[];
  viewTemplate?: String;
  formControls?: IJNFormControl[];
}
