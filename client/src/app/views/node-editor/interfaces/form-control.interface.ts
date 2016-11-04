import { JNFormControl } from '../components/control.component';
import { IJNFormControlInput } from './form-control-input.interface';
import { IJNEditorFormValidator } from './validator.interface';

export interface IJNFormControl {
  input: IJNFormControlInput;
  model?: any;
  formTemplate?: String;
  controlType: typeof JNFormControl;
  maxLength?: number; // max length of input
  minLength?: number; // min length of input
  $validators?: IJNEditorFormValidator[];
}
