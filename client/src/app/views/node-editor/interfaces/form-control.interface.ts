import { IJNFormValidator } from './validator';
import { IJNFormParser } from './parser';
import { JNFormControl } from '../controls/control.component';
import { IJNFormControlInput } from './form-control-input.interface';

export interface IJNFormControl {
  input: IJNFormControlInput;
  model?: any;
  formTemplate?: String;
  controlType: typeof JNFormControl;
  maxLength?: number; // max length of input
  minLength?: number; // min length of input
  $validators?: IJNFormValidator[];
  $parser?: IJNFormParser;
  $formatter?: () => Object | String; // formate view data to modal data
}
