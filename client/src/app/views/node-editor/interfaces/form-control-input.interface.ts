import { FormControl } from '@angular/forms';


export interface IJNFormControlInput {
  label: String;
  data: any;
  hidden: boolean; // if hidden is true, hide the form control
  disabled: boolean; // if data is editable or not, default true,
  formControl: FormControl;
}
