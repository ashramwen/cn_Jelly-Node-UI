import { FormControl } from '@angular/forms';
// validate input
export interface IJNEditorFormValidator {
  validator: (fc: FormControl) => Promise<any>;
  errorName: string;
  msg: string;
}
