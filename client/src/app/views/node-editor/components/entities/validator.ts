import { FormBuilder, FormControl, FormGroup, AsyncValidatorFn } from '@angular/forms';

export class JNFormValidator {

  private _validator: AsyncValidatorFn;
  private _errorString: String;

  constructor(err: String, validator: AsyncValidatorFn) {
    this._validator = validator;
    this._errorString = err;
  }

  get $errorString(): String {
    return this._errorString;
  }

  get $validator(): AsyncValidatorFn {
    return this._validator;
  }
}
