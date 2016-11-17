import { IJNFormControlInput } from './form-control-input.interface';
import { IJNEditorFormValidator } from './validator.interface';
import { FormControl } from '@angular/forms';
import { JNEditorFormControl } from '../components/control.component';

export interface IJNFormControl {
  input: IJNFormControlInput;
  model?: any;
  formTemplate?: String;
  controlType: typeof JNEditorFormControl;
  maxLength?: number; // max length of input
  minLength?: number; // min length of input
  $validators?: IJNEditorFormValidator[];
  formControl?: FormControl;
}
