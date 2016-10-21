import {IJNFormControl} from './form-control';
import {IJNFormButton} from './button';

export interface IJNEditorModel {
  title: String;
  buttons: IJNFormButton[];
  viewTemplate?: String;
  formControls?: IJNFormControl[];
}